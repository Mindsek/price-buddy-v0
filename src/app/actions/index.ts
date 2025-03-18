"use server";

import { signIn, signOut } from "@/lib/auth";

export const signInWithGithub = async () => {
  await signIn("github", { redirectTo: "/home" });
};

export const doLogout = async () => {
  await signOut({ redirectTo: "/" });
};
