import PropTypes from "prop-types"
import CelestialObjectCard from "../CelestialObjectCard"
import "./index.css"
import { useState } from "react"
import TablePagination from "@mui/material/TablePagination"
import useCelestialObjects from "../../hooks/useCelestialObjects"
import { CircularProgress } from "@mui/material"
import MapCards from "../MapCards"

const CelestialObjectCards = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { celestialObjects, isLoading } = useCelestialObjects({ rowsPerPage, page })

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }
  return (
    <>
      <h1>Public Celestial Objects</h1>
      <div className="cards-list">
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          celestialObjects.map(celestialObject => (
            <CelestialObjectCard
              key={celestialObject.id}
              celestialObject={celestialObject}
              isLoading={isLoading}
            />
          ))
        )}
      </div>
      <TablePagination
        component="div"
        style={{ display: "flex", justifyContent: "center" }}
        page={page - 1}
        count={-1}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to }) => `${from}-${to}`}
        labelRowsPerPage=""
      />
    </>
  )
}

export default CelestialObjectCards

CelestialObjectCards.propTypes = {
  gamesList: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
}
