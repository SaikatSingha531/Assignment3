// import { TextField } from "@mui/material";
// import { Controller } from "react-hook-form";
// import type { DynamicInputProps } from "../Typescript/DynamicInput";
// // example path

// const DynamicInput = <T,>({
//   control,
//   errors,
//   name,
//   placeholder,
// }: DynamicInputProps<T>) => {
//   return (
//     <div>
//       <Controller
//         name={name as string}
//         control={control}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             placeholder={placeholder}
//             error={!!errors?.[name as keyof FieldErrors<T>]}
//             helperText={
//               errors?.[name as keyof FieldErrors<T>]?.message as string
//             }
//             // error={!!errors?.[name]}
//             // helperText={errors?.[name]?.message as string}
//             fullWidth
//             sx={{
//               color: "#fff",
//               my: "10px",
//               borderRadius: "8px",
//               background: "rgba(255,255,255,0.15)",
//             }}
//           />
//         )}
//       />
//     </div>
//   );
// };

// export default DynamicInput;


import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import type { DynamicInputProps } from "../Typescript/DynamicInput";
// import type { DynamicInputProps } from "../../types/DynamicInputProps";

const DynamicInput = <T,>({ control, errors, name, placeholder }: DynamicInputProps<T>) => {
  return (
    <Controller
      name={name as any}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          placeholder={placeholder}
          fullWidth
          error={!!errors?.[name as any]}
          helperText={
            errors?.[name as any]?.message as string
          }
          sx={{
            color: "#fff",
            my: "10px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.15)",
          }}
        />
      )}
    />
  );
};

export default DynamicInput;
