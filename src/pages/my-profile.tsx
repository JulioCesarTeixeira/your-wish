import { useSession } from "next-auth/react";
import MyProfileForm from "@components/pages/myProfile";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IPersonalInfo,
  ISignUp,
  signUpSchema,
} from "@src/common/validation/auth";
import { useForm } from "react-hook-form";
import signUp from "./auth/sign-up";

function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  const handleSubmit = async (data: IPersonalInfo) => {
    console.log("submitting...:", data);
    //TODO submit data to backend
  };
  return (
    <div className="h-full overflow-hidden shadow sm:rounded-md bg-gray-100">
      <MyProfileForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Page;
