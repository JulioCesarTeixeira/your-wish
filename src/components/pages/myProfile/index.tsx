import MyProfileForm from "@src/components/pages/myProfile/forms/ProfileForm";
import React from "react";
import { IAddress, IPersonalInfo } from "@src/common/validation/user";
import AddressForm from "@src/components/pages/myProfile/forms/AddressForm";

function index() {
  const handleProfileSubmit = async (data: IPersonalInfo) => {
    console.log("submitting...:", data);
    //TODO submit data to backend
  };

  const handleAddressSubmit = async (data: IAddress) => {
    console.log("submitting...:", data);
    //TODO submit data to backend
  };
  return (
    <div className="h-full shadow sm:rounded-md py-4 px-4 bg-gray-100 overflow-auto">
      {/* <div className=" h-full flex items-center justify-center"> */}
      <div className="h-full flex flex-col gap-2 mb-2">
        <MyProfileForm onSubmit={handleProfileSubmit} />
        <div className="divide-gray-700 my-3 border-2"></div>
        <AddressForm onSubmit={handleAddressSubmit} />
      </div>
      {/* </div> */}
    </div>
  );
}

export default index;
