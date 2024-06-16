import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CssBaseline, createTheme, ThemeProvider, useMediaQuery } from "@mui/material"
import { useMemo } from "react"
import Layout from "../Layout/index.jsx"
import NotificationsProvider from "../Notifications/index.jsx"
import Login from "../Login/index.jsx"
import PrivateRoute from "./PrivateRoute.jsx"
import { UserContextProvider } from "../UserContext"
import { LoadingContextProvider } from "../LoadingContext/index"
import CelestialObjects from "../CelestialObjects"
import CelestialObjectForm from "../CelestialObjectForm"
import CelestialObjectDetails from "../CelestialObjectDetails"
import Maps from "../Maps/index.jsx"
import MapsForm from "../MapsForm"

const router = createBrowserRouter([
  {
    element: (
      <LoadingContextProvider>
        <Layout />
      </LoadingContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <CelestialObjects />,
      },
      {
        path: "/maps",
        element: <Maps />,
      },
      {
        path: "/celestial-objects",
        element: <CelestialObjects />,
      },
      {
        path: "/celestial-object/:celestialObjectId",
        element: (
          <PrivateRoute>
            <CelestialObjectDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add/celestial-object",
        element: (
          <PrivateRoute>
            <CelestialObjectForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit/celestial-object/:celestialObjectId",
        element: (
          <PrivateRoute>
            <CelestialObjectForm isEdit />
          </PrivateRoute>
        ),
      },
      {
        path: "/add/map",
        element: (
          <PrivateRoute>
            <MapsForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Login isRegister />,
      },
    ],
  },
])

export default function Router() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
        shape: {
          borderRadius: 15,
        },
      }),
    [prefersDarkMode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationsProvider prefersDarkMode={prefersDarkMode} />
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </ThemeProvider>
  )
}
