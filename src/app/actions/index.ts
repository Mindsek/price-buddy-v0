"use server";

import { signIn, signOut } from "@/lib/auth";

export const signInWithGithub = async () => {
  await signIn("github", { redirectTo: "/dashboard" });
};

export const doLogout = async () => {
  await signOut({ redirectTo: "/" });
};
