"use client";
// /dashboard/[username]/repos
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableCell,
  TableRow,
  TableCaption,
  TableHead,
} from "@/components/ui/table";
import { BugOff, ChartPie, Cross, PencilRuler, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

function Page() {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { user, isLoaded, isSignedIn } = useUser();
  const { toast } = useToast()

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/v1/repos");
        if (!res.ok) {
          toast({
            title: "Content",
            description: "Failed to get information",
          })
        }
        if (!res.ok) throw new Error("Failed to fetch repos");
        const data = await res.json();
        setRepos(data.repositories);
        setFilteredRepos(data.repositories); // initial display
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // filter repos when search changes
  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    setFilteredRepos(
      repos.filter((repo) =>
        repo.name.toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, repos]);

  if (loading) return <p>Getting Started...<span>Loading</span></p>;

  async function fetchCommits(owner: string, repo: string) {
    try {
      const response = await fetch('/api/v1/repos/commits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner,
          repo,
          per_page: '30',
          page: '1',
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch commits');
      if (!response.ok) {
        toast({
          title: "Can't Load",
          description: "Failed to get information! try to reload page",
        })
      }

      const { commits } = await response.json();
      toast({
        title: "Selected",
        description: "Working 100%",
        
      })
      alert("new message " + JSON.stringify(commits));
    } catch (error) {
      console.error('Error fetching commits:', error);
      throw error;
    }
  }

  return (
    <div className="p-3">
      <div className="m-1 my-4">
        <h1 className="text-3xl">Your Repositories</h1>
        <div className="flex flex-row items-center justify-between w-full p-1">
          <p className="text-stone-600">
            Manage all repositories from version control hostings.
          </p>
          <div className="flex items-center self-end w-full max-w-sm gap-2">
            <Input
              type="search"
              placeholder="Search repo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Table>
        <TableCaption>A list of your repositories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Repository</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead className="text-right">Language</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRepos.length > 0 ? (
            filteredRepos.map((itm) => (
              <TableRow key={itm.id}>
                <TableCell className="font-medium">{itm.name}</TableCell>
                <TableCell>{itm.private ? "private" : "public"}</TableCell>
                <TableCell>{itm.default_branch}</TableCell>
                <TableCell className="text-right">
                  {itm.language ?? "null"}
                </TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => fetchCommits(user?.username, itm.name,)} variant="outline" size="icon">
                    <PencilRuler />
                  </Button>
                  <Button variant="outline" size="icon" className="ml-1">
                    <BugOff />
                  </Button>
                  <Button
                    variant="outline"
                    color="20.5 90.2% 48.2%"
                    size="icon"
                    className="ml-1"
                  >
                    <ChartPie />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No repositories found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Page;
