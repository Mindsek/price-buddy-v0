import { doLogout } from "@/app/actions";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  return <Button onClick={doLogout}>Logout</Button>;
};

export default LogoutButton;
