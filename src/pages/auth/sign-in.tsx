import Image from "next/image";
import TextfieldInput from "../../components/form/TextfieldInput";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { ErrorMessage } from "@hookform/error-message";
import CheckboxInput from "../../components/form/CheckboxInput";
import Button from "../../components/buttons/Button";
import { useAuth } from "../../contexts/AuthContext";
import { signIn, useSession } from "next-auth/react";

interface ILoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Please enter your email address",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Please enter your password",
  }),
  rememberMe: Joi.boolean().not().required(),
});

export default function Login() {
  const { currentUser } = useAuth();
  const { data, status } = useSession();

  console.log("data", data);
  console.log("status", status);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: joiResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: ILoginForm) => {
    console.log("succsess", data);
    const { email, password } = data;
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

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
              Sign in to your account
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
                label="email"
                type="email"
                name="email"
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
                label="Password"
                type="password"
                name="password"
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
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button type="submit">Sign In</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
