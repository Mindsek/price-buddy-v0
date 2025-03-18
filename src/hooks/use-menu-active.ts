import { usePathname } from 'next/navigation';

export const useMenuActive = (url: string) => {
  const pathname = usePathname();
  return pathname.includes(url);
};
