import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { IPersonalInfo, personalInfoSchema } from "@src/common/validation/auth";
import SelectInput from "@src/components/form/SelectInput";
import TextfieldInput from "@src/components/form/TextfieldInput";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import en from "react-phone-number-input/locale/en.json";

type Props = {
  onSubmit: (data: IPersonalInfo) => Promise<void>;
};

function ProfileForm({ onSubmit }: Props) {
  const { register, control, handleSubmit } = useForm<IPersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
  });

  const countries = useMemo(() => {
    const countryEntries = Object.entries(en).slice(
      4,
      Object.values(en).length - 1
    );
    const options = countryEntries.map(([key, value]) => {
      return { key, value };
    });
    return options;
  }, [en]);

  const onSubmitHandler = async (data: IPersonalInfo) => {
    console.log("data", data);
    await onSubmit(data);
  };

  return (
    <div className="p-4 h-full flex items-center justify-center max-h-screen">
      <DevTool control={control} />
      <div className="mt-10 sm:mt-0">
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
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <TextfieldInput
                        type="text"
                        name="first-name"
                        label={"First name"}
                        autoComplete="given-name"
                        inputProps={{
                          id: "first-name",
                          ...register("firstName"),
                        }}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <TextfieldInput
                        type="text"
                        name="last-name"
                        label={"Last name"}
                        autoComplete="given-name"
                        inputProps={{
                          ...register("lastName"),
                        }}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <TextfieldInput
                        type="email"
                        name="email-address"
                        label={"Your preferred email address"}
                        autoComplete="email"
                        inputProps={{
                          ...register("email"),
                        }}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <SelectInput
                        name="country"
                        label="Country"
                        options={countries}
                        selectProps={{
                          defaultValue: "BR",
                          ...register("country"),
                        }}
                      />
                    </div>

                    <div className="col-span-6">
                      <TextfieldInput
                        type="text"
                        name="street-address"
                        label={"Your street + number"}
                        autoComplete="street-address"
                        inputProps={{
                          ...register("address"),
                        }}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <TextfieldInput
                        type="text"
                        name="city"
                        label={"City"}
                        autoComplete="address-level2"
                        inputProps={{
                          ...register("city"),
                        }}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <TextfieldInput
                        type="text"
                        name="region"
                        label={"State / Province"}
                        autoComplete="address-level1"
                        inputProps={{
                          ...register("state"),
                        }}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <TextfieldInput
                        type="text"
                        name="postal-cod"
                        label={"ZIP / Postal code"}
                        autoComplete="postal-code"
                        inputProps={{
                          ...register("zip"),
                        }}
                      />
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
      </div>
    </div>
  );
}

export default ProfileForm;
