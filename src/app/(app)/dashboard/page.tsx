import Logout from "@/components/auth/logout-button";
import { auth } from "@/lib/auth";
import Image from "next/image";

import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <div className="flex flex-col items-center min-h-screen justify-center gap-8">
      <h1 className="text-3xl my-2">Welcome, {session?.user?.name}</h1>
      <p>{session?.user?.email}</p>
      <Image
        src={session?.user?.image || ""}
        alt={session?.user?.name || ""}
        width={72}
        height={72}
        className="rounded-full"
      />
      <Logout />
    </div>
  );
};

export default DashboardPage;
