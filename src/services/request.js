import {
  API_BASE_URL,
  API_DELETE_CELESTIAL_OBJECTS,
  API_POST_CELESTIAL_OBJECTS,
  API_PUT_CELESTIAL_OBJECTS,
} from "../utils/constants"

export const addCelestialObject = async celestialObject => {
  const response = await fetch(`${API_BASE_URL}${API_POST_CELESTIAL_OBJECTS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(celestialObject),
  })

  console.log(response)

  return response.text()
}

export const editCelestialObject = async celestialObject => {
  const response = await fetch(`${API_BASE_URL}${API_PUT_CELESTIAL_OBJECTS}/${celestialObject.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(celestialObject),
  })

  console.log(response)

  return response.text()
}

export const deleteCelestialObject = async celestialObjectId => {
  const response = await fetch(`${API_BASE_URL}${API_DELETE_CELESTIAL_OBJECTS}/${celestialObjectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })

  console.log(response)

  return response.text()
}