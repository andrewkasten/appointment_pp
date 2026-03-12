import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Appointments from "./pages/Appointments";
import Logout from "./pages/Logout";
import ErrorPage from "./error-page";
import Home from "./pages/Home";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const themeGreen = {
  palette: {
    mode: "light",
    primary: {
      main: "#2e7d32",
    },
    secondary: {
      main: "#2e797d",
    },
    error: {
      main: "#7d2e79",
    },
    info: {
      main: "#322e7d",
    },
  },
};

const myTheme = createTheme(themeGreen);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="appointments" element={<Appointments />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
   <StrictMode>
  <ThemeProvider theme={myTheme}>
    <CssBaseline />
      <RouterProvider router={router} />
  </ThemeProvider>
   </StrictMode>
);

{
  /*         <Routes>
                <Route path="/" element={<Hero/>} /> 
                <Route path="/appointments" element={<Appointments/>} /> 
                <Route path="/signup" element={<Signup handleInputChange={handleInputChange} formData={formData} /> } /> 
                <Route path="/login" element={<Login handleInputChange={handleInputChange} formData={formData} />} /> 
                <Route path="/logout" element={<Logout userToken={userToken} setUserToken={setUserToken}/>} /> 
            </Routes> */
}
