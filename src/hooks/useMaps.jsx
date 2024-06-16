import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { API_PUBLIC_CELESTIAL_OBJECTS, API_BASE_URL, API_PUBLIC_MAPS } from "../utils/constants"

const useMaps = ({ rowsPerPage = 10, page = 1 }) => {
  const [maps, setMaps] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      // API call
      const result = await fetch(
        `${API_BASE_URL}${API_PUBLIC_MAPS}?pageSize=${rowsPerPage}&page=${page}`
      )

      if (!result.ok) {
        throw "There was a problem while collecting data, please retry."
      }

      const data = await result.json()
      console.log(data)

      setMaps(data)
    }

    setIsLoading(true)

    getData().then(() => setIsLoading(false))
  }, [rowsPerPage, page])

  return { maps, isLoading }
}

export default useMaps

useMaps.propTypes = {
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
}
