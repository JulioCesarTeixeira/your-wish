// import { forwardRef, useState, useEffect } from "react";
// import { useFormContext, useController } from "react-hook-form";
// import { parsePhoneNumber } from "react-phone-number-input";

// const PhoneInputWithCountry = forwardRef(
//   (
//     {
//       control,
//       name,
//       defaultCountry,
//       numberInputProps,
//       countrySelectProps,
//       ...props
//     },
//     ref
//   ) => {
//     const { register, watch, setValue } = useFormContext();
//     const { value } = useController({
//       control,
//       name,
//     });
//     const phoneNumber = watch(name);
//     const [country, setCountry] = useState(defaultCountry);
//     const [number, setNumber] = useState();
//     console.log("value", value);
//     useEffect(() => {
//       if (value) {
//         const { country, number } = parsePhoneNumber(value);
//         setCountry(country);
//         setNumber(number);
//       }
//     }, [value]);
//     const handleChange = (val) => {
//       setValue(name, val);
//     };
//     return (
//       <div className="flex flex-col mb-1">
//         <label
//           htmlFor={"phone"}
//           className="block text-sm font-medium text-gray-700"
//         >
//           Your preferred phone-number
//         </label>
//         <div className="flex">
//           <input
//             className="mt-1 block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             {...register(name)}
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             {...countrySelectProps}
//           />
//           <input
//             className="mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             {...register(name)}
//             value={number}
//             onChange={(e) => setNumber(e.target.value)}
//             {...numberInputProps}
//           />
//         </div>
//       </div>
//     );
//   }
// );
import React from "react";

function CustomPhoneInput() {
  return <div>CustomPhoneInput</div>;
}

export default CustomPhoneInput;
