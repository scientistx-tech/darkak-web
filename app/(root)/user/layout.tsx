import UserPrivateLayout from "@/components/Layouts/UserPrivateLayout";
import  { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <UserPrivateLayout>
      <div>{children}</div>
    </UserPrivateLayout>
  );
}

export default layout;
