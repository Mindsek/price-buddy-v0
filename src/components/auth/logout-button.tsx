import { doLogout } from "@/app/actions";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <button className="flex items-center gap-2" onClick={doLogout}>
      <LogOut />
      <span>Se déconnecter</span>
    </button>
  );
};

export default LogoutButton;
