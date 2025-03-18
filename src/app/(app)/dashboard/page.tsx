import { auth } from "@/lib/auth";

const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex flex-col items-center min-h-screen justify-center gap-8"></div>
  );
};

export default DashboardPage;
