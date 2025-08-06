import { auth } from "@clerk/nextjs/server";

export async function getAccessToken() {
  const { getToken } = auth();
  const githubToken = await getToken({ template: "github" });
  const gitlabToken = await getToken({ template: "gitlab" });
  const bitbucketToken = await getToken({ template: "bitbucket" });
  return { githubToken, gitlabToken, bitbucketToken };
}
