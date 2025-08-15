import { currentUser, auth, clerkClient } from "@clerk/nextjs/server";

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

  const client = await clerkClient();
  const { data } = await client.users.getUserOauthAccessToken(userId, "oauth_github");

  if (!data?.length) {
    return Response.json({ error: "No OAuth token found" }, { status: 400 });
  }

  const accessToken = data[0]?.token;
  if (!accessToken) {
    return Response.json({ error: "Token missing" }, { status: 400 });
  }


  return Response.json({ userId, accessToken }, { status: 200 });
}
