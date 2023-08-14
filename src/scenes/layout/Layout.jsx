import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
// The hook which we've created in api.js file
import { useGetUserQuery } from "state/api";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.globalCustom.userId);
  const { data } = useGetUserQuery(userId);
  // console.log(data);

  return (
    <Box width="100%" height="100%">
      <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <Sidebar
          // Sending "data" as prop to "sidebar" component
          // If data is in "undefined" state sending an empty object it will prevent us from breaking the app
          user={data || {}}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box flexGrow={1}>
          <Navbar
            // Sending "data" props to "Navbar" component
            user={data || {}}
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
