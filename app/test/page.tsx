// app/page.tsx or any client component
"use client";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/github/token", {
        method: "GET",
        credentials: "include", // required for session
      });

      const data = await res.json();
      console.log(data);
    }

    getData();
  }, []);

  return <div>Check console for auth info.</div>;
}
