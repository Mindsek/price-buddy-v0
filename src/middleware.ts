import {
  LOGIN,
  PROTECTED_SUB_ROUTES,
  PUBLIC_ROUTES,
  ROOT,
} from "@/constants/routes";
import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();
  console.log("session", session);
  const isAuthenticated = !!session?.user;
  console.log("isAuthenticated", isAuthenticated);

  const isPublicRoute =
    (PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
      nextUrl.pathname === ROOT) &&
    !PROTECTED_SUB_ROUTES.find((route) => nextUrl.pathname.includes(route));

  if (isAuthenticated && nextUrl.pathname === LOGIN) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL(LOGIN, nextUrl));
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
