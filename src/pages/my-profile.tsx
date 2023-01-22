import { useSession } from "next-auth/react";
import React from "react";
import MyProfileForms from "@src/components/pages/myProfile";

function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  return <MyProfileForms />;
}

export default Page;
