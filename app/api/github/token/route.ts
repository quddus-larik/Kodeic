import { currentUser, auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  const user = await currentUser();

  // Get external accounts
  const externalAccounts = user?.externalAccounts || [];

  const githubAccount = externalAccounts.find(
    (acc) => acc.provider === "oauth_github"
  );


  if (!githubAccount) {
    return Response.json({ error: "No GitHub account linked" }, { status: 404 });
  }


  return Response.json({ userId },{ status: 200 });
}
