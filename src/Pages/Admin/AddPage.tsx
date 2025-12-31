// // import React from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import {  useParams } from "react-router-dom";
// import { ID } from "appwrite";
// import DynamicInput from "../../Components/DynamicInput";
// import { AddValidation } from "../../Services/Validation/AuthValidation";
// import { useForm } from "react-hook-form";
// import { tablesDB } from "../../Lib/AppwriteConfig";
// import { toast } from "sonner";
// import type { AddStudentFormData } from "../../Typescript/Interface";

// const AddPage = () => {
//   const [loading, setLoading] = useState(false);

//   // const navigate = useNavigate();

//   const {id} = useParams();

//   // const [email, setEmail] = useState("");

//   const handelAdd = async (data: AddStudentFormData) => {
//     setLoading(true);
//     console.log("submit data", data);

//     try {
//       await tablesDB.createRow({
//         databaseId: import.meta.env.VITE_APPWRITE_DATABASE as string,
//         tableId: "studentdata",
//         rowId: ID.unique(),
//         data: {
//           firstName: data.fName,
//           lastName: data.lName,
//           class: data.class,
//           roll: data.rNumber,
//           email: data.email,
//         },
//       });

//       toast.success("Data Upload Successfully");
//       reset();
//     } catch (error) {
//       toast.error("Somthing Was Wrong");
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const {
//     // register,
//     control,
//     reset,
//     //   setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<AddStudentFormData>({
//     resolver: yupResolver(AddValidation),
//     defaultValues: {
//       fName: "",
//       lName: "",
//       class: "",
//       rNumber: "",
//       email: "",
//     },
//   });

//   return (
//     <>
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "linear-gradient(135deg, #f1f135ff, #8F94FB)",
//           px: 2,
//         }}
//       >
//         <Box
//           sx={{
//             width: 400,
//             p: 4,
//             borderRadius: "20px",
//             background: "rgba(255,255,255,0.12)",
//             backdropFilter: "blur(15px)",
//             WebkitBackdropFilter: "blur(15px)",
//             border: "1px solid rgba(255,255,255,0.25)",
//             boxShadow: "0 0px 25px rgba(0,0,0,0.25)",
//             color: "#fff",
//             textAlign: "center",
//           }}
//         >
//           <Typography
//             color="black"
//             variant="h5"
//             align="center"
//             mb={3}
//             fontWeight="bold"
//           >
//             {id ? "Edit Student Details" : "Add Student Data"}
//           </Typography>

//           <form onSubmit={handleSubmit(handelAdd)}>
//             <DynamicInput
//               control={control}
//               name="fName"
//               placeholder="Enter First Name"
//               errors={errors}
//             />

//             <DynamicInput
//               control={control}
//               name="lName"
//               placeholder="Enter Last Name"
//               errors={errors}
//             />

//             <DynamicInput
//               control={control}
//               name="class"
//               placeholder="Enter Class Here"
//               errors={errors}
//             />

//             <DynamicInput
//               control={control}
//               name="rNumber"
//               placeholder="Enter Roll Numer Here"
//               errors={errors}
//             />

//             <DynamicInput
//               control={control}
//               name="email"
//               placeholder="Enter Your Email Here"
//               errors={errors}
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{
//                 py: 1.3,
//                 borderRadius: 2,
//                 fontSize: "1rem",
//                 fontWeight: 600,
//                 color: "black",
//                 background: "linear-gradient(45deg,#3B82F6,#6366F1)",
//                 boxShadow: "0 4px 14px rgba(99,102,241,0.5)",
//               }}
//               disabled={loading}
//             >
//               {loading ? "loading..." : id ? "Update" : "Add"}
//             </Button>
//           </form>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default AddPage;

// <Box
//   sx={{
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f3ebdd",
//     px: 2,
//     py: 4,
//   }}
// >
//   <Box
//     sx={{
//       width: "80%",
//       maxWidth: 900,
//       backgroundColor: "#fff",
//       p: 6,
//       borderRadius: 4,
//       boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//     }}
//   >
//     <Typography
//       variant="h4"
//       align="center"
//       fontWeight="bold"
//       sx={{ mb: 5, color: "#444" }}
//     >
//       Add Student
//     </Typography>

//     {/* Main Stack */}
//     <Stack spacing={3}>
//       {/* Row 1: Name + Gender */}
//       <Stack direction="row" spacing={3} flexWrap="wrap">
//         <TextField
//           label="Student Name"
//           sx={{
//             flex: 1,
//             minWidth: 280,
//           }}
//         />

//         <FormControl
//           sx={{
//             width: 200,
//           }}
//         >
//           <InputLabel>Gender</InputLabel>
//           <Select defaultValue="Other" label="Gender">
//             <MenuItem value="Male">Male</MenuItem>
//             <MenuItem value="Female">Female</MenuItem>
//             <MenuItem value="Other">Other</MenuItem>
//           </Select>
//         </FormControl>
//       </Stack>

//       {/* Row 2: Age + Class */}
//       <Stack direction="row" spacing={3} flexWrap="wrap">
//         <TextField
//           fullWidth
//           label="Age"
//           sx={{ maxWidth: "45%", minWidth: 200 }}
//         />
//         <TextField
//           fullWidth
//           label="Class"
//           sx={{ maxWidth: "45%", minWidth: 200 }}
//         />
//       </Stack>

//       {/* Row 3: Roll + Contact */}
//       <Stack direction="row" spacing={3} flexWrap="wrap">
//         <TextField
//           fullWidth
//           label="Roll Number"
//           sx={{ maxWidth: "45%", minWidth: 200 }}
//         />
//         <TextField
//           fullWidth
//           label="Contact Number"
//           sx={{ maxWidth: "45%", minWidth: 200 }}
//         />
//       </Stack>

//       {/* Address */}
//       <TextField fullWidth multiline rows={3} label="Address" />

//       {/* Submit Button */}
//       <Button
//         variant="contained"
//         fullWidth
//         sx={{
//           backgroundColor: "#e8a96d", // Creamish Orange
//           fontWeight: "bold",
//           fontSize: "16px",
//           py: 1.8,
//           mt: 2,
//           "&:hover": {
//             backgroundColor: "#db9450",
//           },
//         }}
//       >
//         ADD STUDENT
//       </Button>
//     </Stack>
//   </Box>
// </Box>;









// import React from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import {
//   Box,
//   Button,
//   // FormControl,
//   // InputLabel,
//   // MenuItem,
//   // Select,
//   // TextField,
//   Stack,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import {  useParams } from "react-router-dom";
// import { ID } from "appwrite";
// import DynamicInput from "../../Components/DynamicInput";
// import { AddValidation } from "../../Services/Validation/AuthValidation";
// import { useForm } from "react-hook-form";
// import { tablesDB } from "../../Lib/AppwriteConfig";
// import { toast } from "sonner";
// import type { AddStudentFormData } from "../../Typescript/Interface";







// const AddPage = () => {
//   const [loading, setLoading] = useState(false);
//   const { id } = useParams();

//   const { control, reset, handleSubmit, formState: { errors } } = useForm<AddStudentFormData>({
//     resolver: yupResolver(AddValidation),
//     defaultValues: {
//       fName: "",
//       lName: "",
//       class: "",
//       rNumber: "",
//       email: "",
//     },
//   });

//   const handleAdd = async (data: AddStudentFormData) => {
//     setLoading(true);
//     try {
//       await tablesDB.createRow({
//         databaseId: import.meta.env.VITE_APPWRITE_DATABASE as string,
//         tableId: "studentdata",
//         rowId: ID.unique(),
//         data: {
//           firstName: data.fName,
//           lastName: data.lName,
//           class: data.class,
//           roll: data.rNumber,
//           email: data.email,
//         },
//       });
//       toast.success("Data Uploaded Successfully");
//       reset();
//     } catch (error : any) {
//       toast.error("Something went wrong" , error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f3ebdd", px: 2, py: 4 }}>
//       <Box sx={{ width: "80%", maxWidth: 900, backgroundColor: "#fff", p: 6, borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
//         <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 5, color: "#444" }}>
//           {id ? "Edit Student Details" : "Add Student"}
//         </Typography>

//         <form onSubmit={handleSubmit(handleAdd)}>
//           <Stack spacing={3}>
//             {/* Row 1: Names */}
//             <Stack direction="row" spacing={3} flexWrap="wrap">
//               <DynamicInput 
//                 // control={control} 
//                 name="fName" 
//                 label="First Name" 
//                 errors={errors} 
//                 sx={{ flex: 1, minWidth: 280 }} 
//               />
//               <DynamicInput 
//                 // control={control} 
//                 name="lName" 
//                 label="Last Name" 
//                 errors={errors} 
//                 sx={{ flex: 1, minWidth: 280 }} 
//               />
//             </Stack>

//             {/* Row 2: Email + Class */}
//             <Stack direction="row" spacing={3} flexWrap="wrap">
//               <DynamicInput 
//                 // control={control} 
//                 name="email" 
//                 label="Email" 
//                 errors={errors} 
//                 sx={{ flex: 1, minWidth: 280 }} 
//               />
//                <DynamicInput 
//                 // control={control} 
//                 name="class" 
//                 label="Class" 
//                 errors={errors} 
//                 sx={{ width: { xs: '100%', md: '200px' } }} 
//               />
//             </Stack>

//             {/* Row 3: Roll Number */}
//             <Stack direction="row" spacing={3}>
//                <DynamicInput 
//                 // control={control} 
//                 name="rNumber" 
//                 label="Roll Number" 
//                 errors={errors} 
//                 sx={{ maxWidth: "45%", minWidth: 200 }} 
//               />
//             </Stack>

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               disabled={loading}
//               sx={{
//                 backgroundColor: "#e8a96d",
//                 fontWeight: "bold",
//                 fontSize: "16px",
//                 py: 1.8,
//                 mt: 2,
//                 "&:hover": { backgroundColor: "#db9450" },
//               }}
//             >
//               {loading ? "Processing..." : id ? "UPDATE STUDENT" : "ADD STUDENT"}
//             </Button>
//           </Stack>
//         </form>
//       </Box>
//     </Box>
//   );
// };

// export default AddPage












import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ID } from "appwrite";
import { tablesDB } from "../../Lib/AppwriteConfig";
import { toast } from "sonner";
import { AddValidation } from "../../Services/Validation/AuthValidation";
import type { AddStudentFormData } from "../../Typescript/Interface";

const AddPage = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddStudentFormData>({
    resolver: yupResolver(AddValidation),
    defaultValues: {
      fName: "",
      lName: "",
      class: "",
      rNumber: "",
      email: "",
    },
  });

  const handelAdd = async (data: AddStudentFormData) => {
    setLoading(true);

    try {
      await tablesDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE as string,
        tableId: "studentdata",
        rowId: ID.unique(),
        data: {
          firstName: data.fName,
          lastName: data.lName,
          class: data.class,
          roll: data.rNumber,
          email: data.email,
        },
      });

      toast.success("Data Uploaded Successfully");
      reset();
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f1f135ff, #8F94FB)",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: 400,
          p: 4,
          borderRadius: "20px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 0px 25px rgba(0,0,0,0.25)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography color="black" variant="h5" fontWeight="bold" mb={3}>
          {id ? "Edit Student Details" : "Add Student Data"}
        </Typography>

        <form onSubmit={handleSubmit(handelAdd)}>
          <Stack spacing={2}>
            {/* First Name */}
            <Controller
              name="fName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter First Name"
                  error={!!errors.fName}
                  helperText={errors.fName?.message}
                />
              )}
            />

            {/* Last Name */}
            <Controller
              name="lName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter Last Name"
                  error={!!errors.lName}
                  helperText={errors.lName?.message}
                />
              )}
            />

            {/* Class */}
            <Controller
              name="class"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter Class Here"
                  error={!!errors.class}
                  helperText={errors.class?.message}
                />
              )}
            />

            {/* Roll Number */}
            <Controller
              name="rNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter Roll Number Here"
                  error={!!errors.rNumber}
                  helperText={errors.rNumber?.message}
                />
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter Your Email Here"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.3,
                borderRadius: 2,
                fontSize: "1rem",
                fontWeight: 600,
                color: "black",
                background: "linear-gradient(45deg,#3B82F6,#6366F1)",
                boxShadow: "0 4px 14px rgba(99,102,241,0.5)",
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : id ? "Update" : "Add"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default AddPage;
