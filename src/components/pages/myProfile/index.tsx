import MyProfileForm from "@src/components/pages/myProfile/forms/ProfileForm";
import React from "react";
import { IAddress, IPersonalInfo } from "@src/common/validation/user";
import AddressForm from "@src/components/pages/myProfile/forms/AddressForm";
import { trpc } from "@src/utils/trpc";

function index() {
  const {
    mutateAsync: updateAddress,
    status: addressStatus,
    data: addressData,
  } = trpc.address.updateAddress.useMutation();
  const { mutateAsync: updateProfile, status: profileStatus } =
    trpc.user.updateProfile.useMutation();
  const handleProfileSubmit = async (data: IPersonalInfo) => {
    console.log("submitting...:", data);
    //TODO submit data to backend

    await updateProfile(data);
  };

  const handleAddressSubmit = async (data: IAddress) => {
    console.log("submitting...:", data);
    //TODO submit data to backend

    await updateAddress(data);
  };

  return (
    <div className="h-full shadow sm:rounded-md py-4 px-4 bg-gray-100 overflow-auto">
      {/* <div className=" h-full flex items-center justify-center"> */}
      <div className="h-full flex flex-col gap-2 mb-2">
        {profileStatus !== "loading" ? (
          <MyProfileForm onSubmit={handleProfileSubmit} />
        ) : (
          <div>Loading...</div>
        )}

        <div className="divide-gray-700 my-3 border-2"></div>
        {addressStatus !== "loading" ? (
          <AddressForm onSubmit={handleAddressSubmit} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
      {JSON.stringify(addressData)}
      {/* </div> */}
    </div>
  );
}

export default index;
