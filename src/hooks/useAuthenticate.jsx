import { useEffect, useState } from "react"
import { enqueueSnackbar } from "notistack"
import {
  API_BASE_URL,
  API_USER_LOGIN,
  API_USER_REGISTER,
  API_USER_RENEW_TOKEN,
} from "../utils/constants.js"
import { useRefreshUserData } from "../components/UserContext"

export const useAuthenticate = (body, isRegister) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  useEffect(() => {
    if (isAuthenticating) {
      authentication()
    }
  }, [isAuthenticating])

  const authentication = async () => {
    setIsAuthenticating(true)
    const response = await fetch(
      `${API_BASE_URL}${isRegister ? API_USER_REGISTER : API_USER_LOGIN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
    if (!response.ok) {
      const error = await response.text()
      switch (response.status) {
        case 400:
          enqueueSnackbar(error, { variant: "error" })
          break
        case 401:
          console.info("Invalid credentials")
          break
        case 500:
          enqueueSnackbar("Server error", { variant: "error" })
          break
        default:
          enqueueSnackbar("Unknown error", { variant: "error" })
      }
    } else {
      if (!isRegister) {
        const responseJson = await response.json()
        const jwt = responseJson.accessToken
        localStorage.setItem("jwt", jwt)
      }
      setIsAuthenticated(true)
      setIsAuthenticating(false)
      return true
    }
    setIsAuthenticated(false)
    setIsAuthenticating(false)
    return false
  }

  return { isAuthenticated, isAuthenticating, setIsAuthenticating }
}

export const handleDisconnect = navigate => {
  localStorage.removeItem("jwt")
  return navigate("/login")
}
