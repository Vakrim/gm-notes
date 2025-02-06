"use client";

import { signOut } from "@/lib/auth/actions/signOut";

export function SignOutButton() {
  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-sm"
      onClick={() => {
        signOut();
      }}
    >
      Log out
    </button>
  );
}
