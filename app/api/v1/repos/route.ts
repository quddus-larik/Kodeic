import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth(); // aSynchronous call
  if (!userId) {
    return NextResponse.json({ error: "You are Not Authenticated" }, { status: 401 });
  }

  try {
    const client = await clerkClient();
    const { data } = await client.users.getUserOauthAccessToken(
      userId,
      "github"
    );

    if (!data?.length) {
      return NextResponse.json(
        { error: "No OAuth token found" },
        { status: 400 }
      );
    }

    const accessToken = data[0]?.token;
    if (!accessToken) {
      return NextResponse.json({ error: "Token missing" }, { status: 400 });
    }

    const response = await fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API: ${response.status} ${response.statusText}`);
    }

    const repos = await response.json();
    return NextResponse.json({ repositories: repos });
  } catch (err: any) {
    console.error("Fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
