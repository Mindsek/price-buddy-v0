'use server';

import { signIn, signOut } from '@/auth';

export const signInWithGithub = async () => {
  await signIn('github', { redirectTo: '/dashboard' });
};

export const doLogout = async () => {
  await signOut({ redirectTo: '/' });
};
