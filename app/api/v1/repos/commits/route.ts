// app/api/repo-commits/route.ts
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { owner, repo, per_page = '30', page = '1' } = await request.json();

  if (!owner || !repo) {
    return NextResponse.json({ error: 'Missing owner or repo in request body' }, { status: 400 });
  }

  const { userId } = await auth(); // ASynchronous in v7
  if (!userId) {
    return NextResponse.json({ error: 'You are Not Authenticated' }, { status: 401 });
  }

  try {
    const client = await clerkClient();
    const { data } = await client.users.getUserOauthAccessToken(userId, 'oauth_github');

    if (!data?.length) {
      return NextResponse.json({ error: 'No OAuth token found' }, { status: 400 });
    }

    const accessToken = data[0]?.token;
    if (!accessToken) {
      return NextResponse.json({ error: 'Token missing' }, { status: 400 });
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${per_page}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API: ${response.status} ${response.statusText}`);
    }

    const commits = await response.json();
    return NextResponse.json({
      commits: commits.map((commit: any) => ({
        sha: commit.sha,
        message: commit.commit.message,
        author: commit.commit.author.name,
        date: commit.commit.author.date,
      })),
    });
  } catch (err: any) {
    console.error('Fetch error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}