import { useEffect, useState } from "react"
import TablePagination from "@mui/material/TablePagination"
import useMaps from "../../hooks/useMaps"
import MapCards from "../MapCards"
import LoadingCards from "../LoadingCards"
import "./index.css"
import { CircularProgress } from "@mui/material"


const Home = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { maps, isLoading } = useMaps({ rowsPerPage, page })

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }

  return (
    <>
      <h1>Public Maps</h1>
      {isLoading ? (
        <div style={{display: "flex", justifyContent: "center"}}>
        <CircularProgress />
        </div>
      ) : (
        <MapCards maps={maps} isLoading={isLoading} />
      )}
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

export default Home
