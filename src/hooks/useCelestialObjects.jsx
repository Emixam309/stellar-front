import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { API_PUBLIC_CELESTIAL_OBJECTS, API_BASE_URL } from "../utils/constants"

const useCelestialObjects = ({ rowsPerPage = 10, page = 1 }) => {
  const [celestialObjects, setCelestialObjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      // API call
      const result = await fetch(
        `${API_BASE_URL}${API_PUBLIC_CELESTIAL_OBJECTS}?pageSize=${rowsPerPage}&page=${page}`,
      )

      if (!result.ok) {
        throw "There was a problem while collecting data, please retry."
      }

      const data = await result.json()

      console.log(data)
      // Formattage
      const celestialObjects = []
      for (let i = 0; i < data.length; i++) {
        celestialObjects.push({
          id: data[i].id,
          firstReleaseDate: data[i].firstReleaseDate,
          name: data[i].name,
          description: data[i].description,
          type: data[i].type,
          userId: data[i].userAuthorId,
        })
      }

      setCelestialObjects(celestialObjects)
    }

    setIsLoading(true)

    getData().then(() => setIsLoading(false))
  }, [rowsPerPage, page])

  return { celestialObjects, isLoading }
}

export default useCelestialObjects

useCelestialObjects.propTypes = {
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
}
