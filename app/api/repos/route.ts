import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get user ID from Clerk session
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch GitHub OAuth token
    const tokens = await clerkClient.users.getUserOauthAccessToken(
      userId,
      'oauth_github' // This must match the provider ID in Clerk (case-sensitive)
    );

    const accessToken = tokens?.[0]?.token;

    if (!accessToken) {
      return NextResponse.json({ error: 'No GitHub token found' }, { status: 400 });
    }

    // Success
    return NextResponse.json({ accessToken }, { status: 200 });

  } catch (error) {
    console.error('Error fetching GitHub token:', error);
    return NextResponse.json({ error: 'Failed to fetch GitHub token' }, { status: 500 });
  }
}
