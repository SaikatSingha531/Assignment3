import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
// import React from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../../Lib/AppwriteConfig";
import { toast } from "sonner";
import Cookies from "js-cookie";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/");
      toast.success("Logout Successfully");
      Cookies.remove("token");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#f7f4ed", boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#333", cursor: "pointer" }}
            
          >
            School Admin
          </Typography>

          {/* Center Menu */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              variant="text"
              sx={{ color: "#333", fontWeight: 600 }}
              onClick={() => navigate("/admin/students/add")}
            >
              Add Students
            </Button>

            <Button
              variant="text"
              sx={{ color: "#333", fontWeight: 600 }}
              onClick={() => navigate("/admin/students")}
            >
              Show Students
            </Button>

            <Button
              variant="text"
              sx={{ color: "#333", fontWeight: 600 }}
              onClick={() => navigate("/stopwatch")}
            >
              Stopwatch
            </Button>
            <Button
              variant="text"
              sx={{ color: "#333", fontWeight: 600 }}
              onClick={() => navigate("/largeform")}
            >
              Large Form
            </Button>
          </Box>

          {/* Right Logout Button */}
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>

        </Toolbar>
      </AppBar>
    </>
  );
};

export default Dashboard;
