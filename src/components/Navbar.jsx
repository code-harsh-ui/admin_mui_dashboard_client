import {
  AppBar,
  Toolbar,
  useTheme,
  IconButton,
  InputBase,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FlexBetween from "components/FlexBetween";
import {
  ArrowDropDownOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import profileImage from "assets/shelly.jpg";

// Here we've used curly braces so that we can import any function or varible from a module not the whole module
import { setMode } from "state/globalSlice";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Firstly we have "null" stored in "anchorEl" variable
  const [anchorEl, setAnchorEl] = useState(null);

  // Third Boolen function will convert the value into boolean value based on if "anchorEl" stores "null" it will return "false" and if "anchorEl" stores any element "button" it will return "true" so when we click on button it will set the value of "anchorEl" "true" using "handleClick" function and when we
  const isOpen = Boolean(anchorEl);
  // Second This handleClick function will asign the element "<Button>" to anchorEl variable with the help of event.currentTarget
  const handleClick = (event) => {
    // event.currentTaget is used to grab the current element
    setAnchorEl(event.currentTarget);
  };
  // making it null again so that if "anchorEl" consist null "boolean funciton" will return "false" and store it into "isOpen" variable this will help to close the box when click on the target element
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "Space-between" }}>
        <FlexBetween>
          <IconButton
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* 1st Child Div in parent div (Search Box) */}
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            {/* Input tag */}
            <InputBase placeholder="Search..." />
            {/* Search Icon Button */}
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/* //* Right Side in Navbar */}
        {/* Parent Div */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          {/* setting Icons */}
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          {/* After Setting Icon we are placing the User Box */}
          {/* FlexBetween for spcace between all three elements Button, Box, arrowdropdown, settingOutlined */}
          <FlexBetween>
            {/* //! Note that the whole box is button here because we've wrapped it in Button element so when we click on "box" the "handleClick" function got trigger and it will open the "Menu" component */}
            <Button
              //  Calling the handleClick function defined above
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              {/* //*First Div for Image */}
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="30px"
                width="30px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              {/* //* Second Div for Name and Occupation */}
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {/* Fetching the data from props object*/}
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.7rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {/* Fetching the data from props object*/}
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
              {/* //*Third Div for Setting Icon  */}
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "buttom", horizontal: "center" }}
            >
              {/* "handleClose" function used When we click on "Log Out" It will close the "Menu" component */}
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
