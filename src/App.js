import "./App.css";
import Header from "./components/standard/Header";
import Drawer_pfc from "./components/standard/Drawer";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Container from "./components/standard/Container";
import Dashboard from "./components/features/Dashboard";
import OnBoarding from "./components/features/OnBoarding";
import KycComponent from "./components/features/KycComponent";
import Listing from "./components/features/Listing";
import MaterialSelection from "./components/features/MaterialSelection";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1F3555",
    },
  },
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    ),
    children: [
      {
        path: "/",
        element: <div className="main-container-app"> <Drawer_pfc /><Container /></div>,
        children: [
          { path: "/", element: <Dashboard /> },
          {
            path: "/onboard",
            element: <OnBoarding />,
          },
          {
            path: "/kyc",
            element: <KycComponent />,
          },
          {
            path: "/listing",
            element: <Listing />,
          },
          {
            path: "/material",
            element: <MaterialSelection />,
          },
        ],
      },
      {},
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <Header />
     
      <Outlet />
    </div>
  );
}

export default App;
