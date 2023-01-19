import Image from "next/image";
import TextfieldInput from "../../components/form/TextfieldInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ErrorMessage } from "@hookform/error-message";
import CheckboxInput from "../../components/form/CheckboxInput";
import Button from "../../components/buttons/Button";
import { useAuth } from "../../contexts/AuthContext";
import { paths } from "../../constants/navigation";
import { ISignUp, signUpSchema } from "@src/common/validation/auth";
import { trpc } from "@src/utils/trpc";
import { DevTool } from "@hookform/devtools";

export default function SignUp() {
  const { signIn } = paths;
  const { currentUser, signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: ISignUp) => {
    // console.log("submitting...:", data);

    await signUp(data).catch((err) => {
      // console.log("sign up form...", err.message);
      setError("email", { message: err.message });
    });
  };

  // console.log({ currentUser });
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
              width={72}
              height={72}
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create an account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <TextfieldInput
                label="Email address"
                type="email"
                name="email"
                // placeholder="Email"
                inputProps={{
                  ...register("email"),
                  formNoValidate: true,
                  autoComplete: "email",
                }}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => <p>{message}</p>}
              />
              <TextfieldInput
                label="Choose a password"
                type="password"
                name="password"
                // placeholder="Password"
                inputProps={{ ...register("password") }}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => <p>{message}</p>}
              />
            </div>

            <div className="flex items-center justify-between">
              <CheckboxInput
                name="rememberMe"
                label="Remember me?"
                inputProps={{ ...register("rememberMe") }}
              />
              <div className="text-sm">
                <a
                  href={signIn}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Already have an account?
                </a>
              </div>
            </div>

            <div>
              <Button type="submit">Sign Up</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
