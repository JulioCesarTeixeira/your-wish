import { useSession } from "next-auth/react";
import React from "react";
import MyProfileForms from "@src/components/pages/myProfile";
import { LoadingComponent } from "@src/components/common/LoadingComponent";
import { useRouter } from "next/router";

function Page() {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  if (status === "loading") {
    return <LoadingComponent />;
  }

  if (status === "unauthenticated") {
    push("/auth/sign-in");
    return <p>Access Denied. Redirecting...</p>;
  }

  return <MyProfileForms />;
}

export default Page;
