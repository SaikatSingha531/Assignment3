import { createBrowserRouter } from "react-router-dom";
// import SignupPage from "../Pages/Signup";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Students from "../Pages/Admin/Students";
import AddPage from "../Pages/Admin/AddPage";
import Dashboard from "../Pages/Admin/Dashboard";
import Stopwatch from "../Pages/Stopwatch";
import LargeForm from "../Pages/LargeForm";
// import Signup from "../Pages/Signup";

const Route = createBrowserRouter([
    {
        path:"/",
        element:<Signup/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/stopwatch",
        element:<Stopwatch/>
    },
    {
        path:"/largeform",
        element:<LargeForm/>
    },
    {
        path:"/admin",
        children:[
            {
                path:"dashboard",
                element:<Dashboard/>
            },
            {
                path:"students",
                element:<Students/>
            },
            {
                path:"students/add",
                element:<><Dashboard/><AddPage/></>
            },
            {
                path:"students/edit/:id",
                element:<><Dashboard/><AddPage/></>
            }
        ]
    },
])

export default Route