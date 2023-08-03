import {
  AppBar,
  Toolbar,
  useTheme,
  IconButton,
  InputBase,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import FlexBetween from "./FlexBetween";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import { setMode } from "state/globalSlice";

const Navbar = () => {
  // useDispatch will help to trigger the action "setMode" which we have in "globalSlice file in state folder"
  const dispatch = useDispatch();

  // useTheme hook is a utility hook that allows you to access the current theme object within your React components.
  //! To use the useTheme hook, you first need to ensure that your component is wrapped within a ThemeProvider, which provides the theme to all the child components. and Here all the components are wrapped from ThemeProvider in "App.js" file
  const theme = useTheme();
  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "Space-between" }}>
        {/* //* Left Side in Navbar */}
        {/* Flexbetween is basically a 'box' component imported from mui which have some styling like flex align and justify */}

        {/* Parent Div */}
        <FlexBetween>
          <IconButton
            aria-label=""
            onClick={() => {
              console.log("open/close Sidebar");
            }}
          >
            {/* MenuIcon is a icon we've changed the icon name form Menu to "MenuIcon" */}
            <MenuIcon />
          </IconButton>
          {/* 1st Child Div in parent div (Search Box) */}
          <FlexBetween
            // the bgcolor is using the color which is defined in "theme.js" file and it will also toggle the color from dark to light with the help of "alt" because we have two different types of color in "alt"
            // And here "theme" is the variable which have "useTheme" function in it
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
          {/* Here with the help of dispatch we are triggering the function "setMode" which is in reducers and the 'setMode' will check if the 'state.mode consist the value 'light' it will convert to 'dark' and it is dark convert it to light */}
          <IconButton onClick={() => dispatch(setMode())}>
            {/* In this we are using theme.palette.mode "value" which is in 'theme.js' file to convert the icons from darkmode to lightmode */}
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
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
