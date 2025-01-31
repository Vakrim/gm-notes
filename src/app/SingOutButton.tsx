"use client";

import { signOut } from "@/lib/auth/signOut";

export function SignOutButton() {
  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </button>
  );
}
