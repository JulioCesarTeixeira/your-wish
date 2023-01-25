import { zodResolver } from "@hookform/resolvers/zod";
import { IPersonalInfo, personalInfoSchema } from "@src/common/validation/user";
import TextfieldInput from "@src/components/form/TextfieldInput";
import React, { useEffect } from "react";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import { ErrorMessage } from "@hookform/error-message";
import { useSession } from "next-auth/react";
import { trpc } from "@src/utils/trpc";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  onSubmit: (data: IPersonalInfo) => Promise<void>;
};

function ProfileForm({ onSubmit }: Props) {
  const { data } = useSession();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      contactEmail: data?.user?.email,
    },
  });
  const { isLoading, isError, refetch } = trpc.user.getProfile.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      onSuccess: ({ userProfile }) => {
        setValue("firstName", userProfile?.firstName ?? "");
        setValue("lastName", userProfile?.lastName ?? "");
        setValue("contactEmail", userProfile?.contactEmail ?? "");
        setValue("phone", userProfile?.phone ?? "");
      },
    }
  );

  const onSubmitHandler = async (data: IPersonalInfo) => {
    // console.log("data", data);
    await onSubmit(data);

    await refetch();
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Personal Information
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive your packages.
          </p>
        </div>
      </div>
      {/* <ReactQueryDevtools /> */}
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
          {/* <DevTool control={control} placement="bottom-left" /> */}
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <TextfieldInput
                    type="text"
                    name="firstName"
                    label={"First name"}
                    autoComplete="given-name"
                    inputProps={{
                      id: "first-name",
                      ...register("firstName"),
                    }}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="firstName"
                    render={({ message }) => <p>{message}</p>}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <TextfieldInput
                    type="text"
                    name="lastName"
                    label={"Last name"}
                    autoComplete="given-name"
                    inputProps={{
                      ...register("lastName"),
                    }}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="lastName"
                    render={({ message }) => <p>{message}</p>}
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <TextfieldInput
                    type="email"
                    name="email"
                    label={"Your preferred email address"}
                    autoComplete="email"
                    inputProps={{
                      ...register("contactEmail"),
                    }}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="contactEmail"
                    render={({ message }) => <p>{message}</p>}
                  />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <div className="flex flex-col mb-1">
                    <label
                      htmlFor={"phone"}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your preferred phone-number
                    </label>
                    <PhoneInputWithCountry
                      control={control}
                      name="phone"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      defaultCountry="BR"
                      numberInputProps={{
                        className:
                          "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                      }}
                      countrySelectProps={{
                        className:
                          "mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                      }}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="phone"
                      render={({ message }) => <p>{message}</p>}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
