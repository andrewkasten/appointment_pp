import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container} from "@mui/material";


function Root() {
  return (
    <>
           <Container maxWidth="xl">
          <Navbar />
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
          </Container>
    </>
  );
}

export default Root;
