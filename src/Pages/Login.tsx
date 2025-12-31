// import React, { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { LoginValidation } from "../Services/Validation/AuthValidation";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account, tablesDB } from "../Lib/AppwriteConfig";
import { Query } from "appwrite";
import { toast } from "sonner";
import Cookies from "js-cookie";
import type { LoginFormData } from "../Typescript/Interface";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handelSignupSubmit = async (data: LoginFormData) => {
    setLoading(true);

    try {
      const userList = await tablesDB.listRows(
        import.meta.env.VITE_APPWRITE_DATABASE as string,
        "signup",
        [Query.equal("email", data.email)]
      );

      if (userList.rows.length > 0) {
        await account.createEmailPasswordSession(data.email, data.password);
        Cookies.set("token", "true");
        toast.success("Login Successfully");
        navigate("/admin/dashboard");
      } else {
        toast.error("User Not Found");
      }

      reset();
    } catch (error) {
      toast.error("Wrong Email Or Password");
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
        background: "linear-gradient(135deg, #4E54C8, #8F94FB)",
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
          variant="h5"
          align="center"
          mb={3}
          fontWeight="bold"
          color="black"
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit(handelSignupSubmit)}>
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
                placeholder="Enter Password Here"
                type="password"
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
              color: "black",
              fontWeight: 600,
              background: "linear-gradient(45deg,#3B82F6,#6366F1)",
              boxShadow: "0 4px 14px rgba(99,102,241,0.5)",
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>

          <Typography fontWeight="thin" marginTop={2}>
            Don't Have An Account !!
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
            onClick={() => navigate("/")}
          >
            SignUp
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
