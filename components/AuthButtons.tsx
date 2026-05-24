'use client';

import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';

export default function AuthButtons() {
  const { userId } = useAuth();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {!userId ? (
        <>
        <SignUpButton mode="modal" forceRedirectUrl="/generate">
          <button className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 shadow-md transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:text-base">
            Get Started
          </button>
        </SignUpButton>
        </>
      ) : (
        <>
        <Link
          href="/generate"
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 shadow-md transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:text-base"
        >
          Open Canvas
        </Link>
        <UserButton afterSignOutUrl="/" />
        </>
      )}
    </div>
  );
}
