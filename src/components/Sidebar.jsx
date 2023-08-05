import {
  useTheme,
  Box,
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import {
  AdminPanelSettingsOutlined,
  CalendarMonthOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  Groups2Outlined,
  HomeOutlined,
  PieChartOutlined,
  PointOfSaleOutlined,
  PublicOutlined,
  ReceiptLongOutlined,
  ShoppingCartOutlined,
  TodayOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

// We are grabbing the props which we've passed in "Layout" component
const Sidebar = ({
  isNonMobile,
  setIsSidebarOpen,
  isSidebarOpen,
  drawerWidth,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    // setting the current path name to "active" state with "/" removed from current string using "substring" method
    setActive(pathname.substring(1));
    // console.log(active); // "dashboard" - substring will remove the "/" from path
    // console.log(pathname); // "/dashboard" //* with "/" slash
  }, [pathname]); // useEffect will execute each time when the "pathname" is changed
  return (
    <Box component="nav">
      {/* if isSidebarOpen is true, the <Drawer /> component will be rendered; if isSidebarOpen is false, nothing will be rendered at that location in the JSX. */}
      {/* Drawer is a component which we have imported from Mui */}
      {isSidebarOpen && (
        <Drawer
          // open is predefined properties of "Drawer" component
          open={isSidebarOpen} // isSidebarOpen value is "true" initially
          // onClose is our custom function where we are changing the "open" value from "true" to "false" using the use state which we are getting as a prop from "Layout" component
          onClose={() => {
            setIsSidebarOpen(false); // changing the value "isSidebarOpen" false to close the drawer
          }}
          // predefined property to set type of "drawer"
          variant="persistent"
          // location of the "drawer"
          anchor="left"
          sx={{
            width: drawerWidth,
            // customizing the drawer component using the predefined mui class
            "& .MuiDrawer-paper": {
              // grabbing colors from theme.js file
              color: theme.palette.secondary[200], // color yellow
              // background "blue" for dark and "grey" for light
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            {/* Div or Box for logo and title */}
            <Box m="1.5rem 2rem 2rem 3rem">
              {/* color of Title "yellow" */}
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    ECOMVISION
                  </Typography>
                </Box>
                {/* Here we use "not operator" in which we are stating that if "isNonMobile" size is below 600px only then show "iconbutton left" */}
                {/* left Icon will appear Only for Mobile screen */}
                {!isNonMobile && (
                  //! And in that left button we are adding a functionality of if the button is clicked set the boolean value which is opposite to "isSidebarOpen" value it means it the value of isSidebarOpen store "true" it will became "false" and vice versa basically we use this functionality for toggling the component
                  <IconButton
                    onClick={() => {
                      setIsSidebarOpen(!isSidebarOpen);
                    }}
                  >
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            {/* Sidenav List using Mui List component */}
            <List>
              {/* Looping through the objects which we have in "navItems array in which we destructured the keys "text" and "icon" so that we can loop through each values */}
              {navItems.map(({ text, icon }) => {
                // If icon is "null" it will target only that object which we have in "navItems" array
                //! If the icon property is not null, the code proceeds to the next part: of convert the rest "text" to lowercase
                if (!icon) {
                  return (
                    //! It will print only Titles "client facing, sales, management" one by one in sidebar component as we know it will loop from top to bottom from the array in this case
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }

                //! If the icon property is not null, the code proceeds to the next part:

                // It converts the text property to lowercase using the toLowerCase() method and stores it in the lctext variable.
                const lcText = text.toLowerCase();
                console.log(lcText);

                // Moving on we know to create list with icons we also need to import <listItem> component from "mui" and here we are grabbing the text which was eleminated in !icon statement and injecting it into key to make each element unique
                return (
                  <ListItem key={text} disablePadding>
                    {/* Icon button component */}
                    <ListItemButton
                      //! This funciton will execute only when clicked it means it will set the "active" state only when we click the button
                      onClick={() => {
                        // If any button icon click it will navigate to the url by add /lctext "value" we are using the list texts for navigations as well
                        navigate(`/${lcText}`);
                        //! And here we are setting the current or clicked lctext value to "active" state
                        setActive(lcText);
                      }}
                      // this ternary operator will execute only when active "value" which is the same value when we clicked on the button element will matches from the "lcText" values example let assume active: products and lcTect have all the text list but while looping if the lcText matches the products from active: products it will use the different color and for rest unmatched values it will use different color
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {/* And we are also rendering the right arrow for only active class list */}
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
