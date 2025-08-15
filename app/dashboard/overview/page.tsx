"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppWindow, Bug } from "lucide-react";
export default function Page() {

  


  return (
    
      <div className="flex flex-col w-full h-full gap-3 pt-3">
        <div className="flex flex-row w-full gap-2">
          <Card className="w-full">
            <CardHeader className="flex flex-row">
              <Bug className="size-10" />
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <AppWindow className="size-10" />
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>

            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>


        </div>
      </div>
  );
}
