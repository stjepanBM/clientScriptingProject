import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "scenes/loginPage";
import HomePage from "scenes/homePage";
import AddPage from "scenes/addPage";
import Bills from "scenes/billsPage";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import UpdateCustomer from "scenes/editCustomerPage";
import ProfilePage from "scenes/profilePage";
import BillItems from "scenes/billItems";

function App()
{
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/:customerId/bills" element={ isAuth ? <Bills /> : <HomePage />} />
            <Route path="/:customerId/bills/:billId/items" element={ isAuth ? <BillItems /> : <HomePage />} />
            <Route path="/edit/:customerId" element={ isAuth ? <UpdateCustomer /> : <HomePage />} />
            <Route path="/profile" element={ isAuth ? <ProfilePage /> : <HomePage />} />
            
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div >
  );
}

export default App;
