import {
  API_BASE_URL,
  API_DELETE_CELESTIAL_OBJECTS,
  API_POST_CELESTIAL_OBJECTS,
  API_PUT_CELESTIAL_OBJECTS,
} from "../utils/constants"
import { enqueueSnackbar } from "notistack"

export const addCelestialObject = async celestialObject => {
  const response = await fetch(`${API_BASE_URL}${API_POST_CELESTIAL_OBJECTS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(celestialObject),
  })

  switch (response.status) {
    case 200:
      enqueueSnackbar("Celestial object added", { variant: "success" })
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

  return response.text()
}

export const editCelestialObject = async celestialObject => {
  const response = await fetch(
    `${API_BASE_URL}${API_PUT_CELESTIAL_OBJECTS}/${celestialObject.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(celestialObject),
    }
  )

  switch (response.status) {
    case 200:
      enqueueSnackbar("Celestial object edited", { variant: "success" })
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

  return response.text()
}

export const deleteCelestialObject = async celestialObjectId => {
  const response = await fetch(
    `${API_BASE_URL}${API_DELETE_CELESTIAL_OBJECTS}/${celestialObjectId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  )

  console.log(response)

  switch (response.status) {
    case 200:
      enqueueSnackbar("Celestial object deleted", { variant: "success" })
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

  return response.text()
}
