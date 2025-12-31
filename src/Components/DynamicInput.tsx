


// import { TextField } from "@mui/material";
// import { Controller } from "react-hook-form";
// import type { DynamicInputProps } from "../Typescript/DynamicInput";
// // import type { DynamicInputProps } from "../../types/DynamicInputProps";

// const DynamicInput = <T,>({  errors, name, placeholder }: DynamicInputProps<T>) => {
//   return (
//     <Controller
//       name={name as any}
//       // control={control}
//       render={({ field }) => (
//         <TextField
//           {...field}
//           placeholder={placeholder}
//           fullWidth
//           error={!!errors?.[name as any]}
//           helperText={
//             errors?.[name as any]?.message as string
//           }
//           sx={{
//             color: "#fff",
//             my: "10px",
//             borderRadius: "8px",
//             background: "rgba(255,255,255,0.15)",
//           }}
//         />
//       )}
//     />
//   );
// };

// export default DynamicInput;














// // Components/DynamicInput.tsx
// // import { TextField, SxProps, Theme } from "@mui/material";
// // import { Controller } from "react-hook-form";
// // import type { DynamicInputProps } from "../Typescript/DynamicInput";

// // // Extend your interface to include label and sx if not already there
// // interface ExtendedProps<T> extends DynamicInputProps<T> {
// //   label?: string;
// //   sx?: SxProps<Theme>;
// //   multiline?: boolean;
// //   rows?: number;
// // }

// // const DynamicInput = <T,>({  errors, name, placeholder, label, sx, multiline, rows }: ExtendedProps<T>) => {
// //   return (
// //     <Controller
// //       name={name as any}
// //       // control={control}
// //       render={({ field }) => (
// //         <TextField
// //           {...field}
// //           label={label}
// //           placeholder={placeholder}
// //           fullWidth
// //           multiline={multiline}
// //           rows={rows}
// //           error={!!errors?.[name as any]}
// //           helperText={errors?.[name as any]?.message as string}
// //           sx={sx}
// //         />
// //       )}
// //     />
// //   );
// // };

// // export default DynamicInput;
