import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "scenes/dashboard/Dashboard";
import Layout from "scenes/layout/Layout";
// Grabbing the themeSettings function from theme.js file
import { themeSettings } from "theme";

function App() {
  // Grabbing the state mode = dark value using useSelector hook
  // Basically the variable mode hold the value "dark" which we have in state folder in "initialState"
  const mode = useSelector((state) => {
    // we are fetching the latest state from reducers which is "dark" initially
    return state.globalCustom.mode;
  });

  // useMemo will act only when we interate with "mode" variable defined above
  const theme = useMemo(() => {
    //! We are passing the "mode: dark" through "themeSettings function" which is defined in theme.js file
    return createTheme(themeSettings(mode));
  }, [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Here we have Parent Route for the nested components */}
            <Route element={<Layout />}>
              {/* These are nested components routes in <Layout/> Component */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
