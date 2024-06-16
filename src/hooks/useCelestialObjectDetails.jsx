import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
  API_BASE_URL,
  API_DETAILS_CELESTIAL_OBJECT,
  API_PUT_CELESTIAL_OBJECTS,
} from "../utils/constants"

const useCelestialObjects = celestialObjectId => {
  const [celestialObject, setCelestialObject] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      // API call
      const response = await fetch(
        `${API_BASE_URL}${API_DETAILS_CELESTIAL_OBJECT}/${celestialObjectId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      console.log(response)

      if (!response.ok) {
        throw "There was a problem while collecting data, please retry."
      }

      const data = await response.json()

      console.log(data)

      setCelestialObject(data)
    }

    setIsLoading(true)
    if (celestialObjectId) getData().then(() => setIsLoading(false))
  }, [celestialObjectId])

  return { celestialObject, isLoading }
}

export default useCelestialObjects

useCelestialObjects.propTypes = {
  celestialObjectId: PropTypes.number,
}
