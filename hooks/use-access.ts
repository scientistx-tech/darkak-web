// hooks/useAccess.ts
import { useSelector } from "react-redux";

export const useAccess = (key: string): boolean => {
  const accessList = useSelector(
    (state: any) => state.auth.user?.moderator_access || [],
  );

  return accessList.some((item: any) => item.access === key);
};
