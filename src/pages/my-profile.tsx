import { useSession } from "next-auth/react";
import React from "react";

function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  return <div>{JSON.stringify(session ?? "")}</div>;
}

export default Page;
