// app/auth/sign-in/[...sso-callback]/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SSOCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Redirect after short delay
    const timeout = setTimeout(() => {
      router.push("/dashboard");
    }, 1500);

    return () => clearTimeout(timeout);
  }, [router]);

  return <p>Completing sign-in...</p>;
}
