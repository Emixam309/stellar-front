import useCelestialObjectDetails from "../../hooks/useCelestialObjectDetails"
import { useParams } from "react-router-dom"
import { Paper } from "@mui/material"

const CelestialObjectDetails = () => {
  let { celestialObjectId } = useParams()

  const { celestialObject, isLoading } = useCelestialObjectDetails(celestialObjectId)

  console.log("celestialObject", celestialObject)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Paper style={{ padding: "20px" }}>
      <h1>{celestialObject.name}</h1>
      <h2>Type: {celestialObject.type}</h2>
      <p>{celestialObject.description}</p>
      <p>Mass: {celestialObject.mass}</p>
      <p>Radius: {celestialObject.radius}</p>
      {celestialObject.type === "Star" && <p>Brightness: {celestialObject.brightness}</p>}
      {celestialObject.type === "Planet" && (
        <p>Is Water: {celestialObject.isWater ? "Yes" : "No"}</p>
      )}
      {celestialObject.type === "Planet" && <p>Is Life: {celestialObject.isLife ? "Yes" : "No"}</p>}
      <p>First Release Date: {celestialObject.firstReleaseDate}</p>
      <p>Is Public: {celestialObject.isPublic ? "Yes" : "No"}</p>
    </Paper>
  )
}

export default CelestialObjectDetails
