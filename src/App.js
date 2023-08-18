import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "scenes/dashboard/Dashboard";
import Layout from "scenes/layout/Layout";
import { themeSettings } from "theme";
import Products from "scenes/product/Products";

function App() {
  const mode = useSelector((state) => {
    return state.globalCustom.mode;
  });

  const theme = useMemo(() => {
    return createTheme(themeSettings(mode));
  }, [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Products route, note that the url here is only for ui part there is no connection with backend url here */}
              <Route path="/products" element={<Products />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
