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
  // fetching the current user from initial state which we have in "globalSlice" with the help of reducer which is register in store in "index.js" file
  const userId = useSelector((state) => state.globalCustom.userId);
  //! destructuring only "data" from the whole object it means we get bunch of objects like in respsonse like "status, currentData, iserror, isloading" and many more we are only extracting the "data" from the whole object
  const { data } = useGetUserQuery(userId);
  console.log(data);

  return (
    <Box width="100%" height="100%">
      <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <Sidebar
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box>
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
