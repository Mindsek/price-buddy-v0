'use server';

import { signIn, signOut } from '@/auth';

export const signInWithGithub = async () => {
  await signIn('github', { redirectTo: '/' });
};

export const doLogout = async () => {
  await signOut({ redirectTo: '/' });
};
