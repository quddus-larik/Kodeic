"use client";
// /dashboard/[username]/repos
import { useEffect, useState } from "react";
import { CoreUI } from "@/layouts/core-ui";
import {
  Table,
  TableBody,
  TableHeader,
  TableCell,
  TableRow,
  TableCaption,
  TableHead,
} from "@/components/ui/table";
import { BugOff, ChartPie, PencilRuler, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Page() {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/v1/repos");
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

  if (loading) return <p>Getting Started...</p>;

  return (
    <CoreUI>
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
                    <Button variant="outline" size="icon">
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
    </CoreUI>
  );
}

export default Page;
