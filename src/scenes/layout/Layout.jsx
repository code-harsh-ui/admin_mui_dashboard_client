import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  // useMediaQurery will return a boolean if it matches the following condition of if the screen size is 600px and more
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <Box width="100%" height="100%">
      {/* We are passing the "useMediaQuery", "States" as a props to Sidebar component (isNonMobile, drawerWidth, isSidebarOpen, setSidebarOpen) - all these are props which we are passing to sidebar component*/}

      {/* Make display: flex (for Desktop screen) if "isNonMobile" returns true and if it returns "false" make the display "block" (for Mobile screen) */}
      <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <Sidebar
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box>
          {/* Passing the same props which we passed in sidebar component */}
          <Navbar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
