import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { SignupValidation } from "../Services/Validation/AuthValidation";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account, tablesDB } from "../Lib/AppwriteConfig";
import { ID } from "appwrite";
import { toast } from "sonner";

type SignupFormData = {
  fName: string;
  lName: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(SignupValidation),
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
    },
  });

  const handelSignupSubmit = async (data: SignupFormData) => {
    setLoading(true);

    try {
      const signAccouant = await account.create(
        ID.unique(),
        data.email,
        data.password
      );
      console.log("main form data", signAccouant);

      const response = await tablesDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE as string,
        tableId: "signup",
        rowId: ID.unique(),
        data: {
          name: data.fName,
          LastName: data.lName,
          email: data.email,
          password: data.password,
          role: "user",
        },
      });

      console.log("this is after response", response);
      toast.success("Account Created Successfully");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Account Not Created");
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
        background: "linear-gradient(135deg, #4E54C8, #8F94FB)",
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
          textAlign: "center",
        }}
      >
        <Typography
          color="black"
          variant="h5"
          align="center"
          mb={3}
          fontWeight="bold"
        >
          SignUp
        </Typography>

        <form onSubmit={handleSubmit(handelSignupSubmit)}>
          {/* First Name */}
          <Controller
            name="fName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Enter First Name"
                fullWidth
                error={!!errors.fName}
                helperText={errors.fName?.message}
                sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
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
                fullWidth
                error={!!errors.lName}
                helperText={errors.lName?.message}
                sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
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
                placeholder="Enter Email Here"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                placeholder="Enter Password Here"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
              />
            )}
          />

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
            {loading ? "loading..." : "Sign Up"}
          </Button>

          <Typography fontWeight="thin" marginTop={2} color="black">
            Already In Our Family !!
          </Typography>
          <Button
            sx={{
              py: 1,
              fontWeight: 600,
              fontSize: "0.95rem",
              textTransform: "none",
              background: "transparent",
              color: "black",
              boxShadow: "none",
              "&:hover": {
                background: "transparent",
                textDecoration: "underline",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
