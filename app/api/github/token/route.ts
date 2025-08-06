// app/api/repos/route.ts
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
    const { data } = await clerkClient().users.getUserOauthAccessToken(userId, 'oauth_github');
    const accessToken = data[0]?.token;
    if (!accessToken) {
      return NextResponse.json({ error: 'No GitHub token found' }, { status: 400 });
    }
    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error('Error fetching GitHub token:', error);
    return NextResponse.json({ error: 'Failed to fetch GitHub token' }, { status: 500 });
  }
}