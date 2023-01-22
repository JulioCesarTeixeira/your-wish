import { DevTool } from "@hookform/devtools";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { IAddress, addressSchema } from "@src/common/validation/user";
import SelectInput from "@src/components/form/SelectInput";
import TextfieldInput from "@src/components/form/TextfieldInput";
import React, { useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import en from "react-phone-number-input/locale/en.json";

type Props = {
  onSubmit: (data: IAddress) => Promise<void>;
};

function AddressForm({ onSubmit }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddress>({
    resolver: zodResolver(addressSchema),
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

  const onSubmitHandler: SubmitHandler<IAddress> = async (data) => {
    console.log("data", data);
    await onSubmit(data);
  };

  return (
    <div className="md:grid md:grid-cols-3 md:gap-6 mb-2">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Your default address
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive your packages.
          </p>
        </div>
      </div>
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
          <DevTool control={control} />
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
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
                  <ErrorMessage
                    errors={errors}
                    name="country"
                    render={({ message }) => <p>{message}</p>}
                  />
                </div>

                <div className="col-span-6">
                  <TextfieldInput
                    type="text"
                    name="street"
                    label={"Your street + number"}
                    autoComplete="street-address"
                    inputProps={{
                      ...register("street"),
                    }}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="street"
                    render={({ message }) => <p>{message}</p>}
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
                  <ErrorMessage
                    errors={errors}
                    name="city"
                    render={({ message }) => <p>{message}</p>}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <TextfieldInput
                    type="text"
                    name="state"
                    label={"State / Province"}
                    autoComplete="address-level1"
                    inputProps={{
                      ...register("state"),
                    }}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="state"
                    render={({ message }) => <p>{message}</p>}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <TextfieldInput
                    type="text"
                    name="zip"
                    label={"ZIP / Postal code"}
                    autoComplete="postal-code"
                    inputProps={{
                      ...register("zip"),
                    }}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="zip"
                    render={({ message }) => <p>{message}</p>}
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
  );
}

export default AddressForm;
