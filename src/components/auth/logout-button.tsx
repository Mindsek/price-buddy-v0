import { LogOut } from 'lucide-react';

import { doLogout } from '@/app/actions';

const LogoutButton = () => {
  return (
    <button className='flex items-center gap-2' onClick={doLogout}>
      <LogOut />
      <span>Se déconnecter</span>
    </button>
  );
};

export default LogoutButton;
