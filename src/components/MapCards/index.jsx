import PropTypes from "prop-types"
import MapCard from "../MapCard"
import "./index.css"

const MapCards = ({ maps = [], isLoading = false }) => {
  return (
    <div className="accordion">
      {maps.map(map => (
        <MapCard key={map.id} map={map} isLoading={isLoading} />
      ))}
    </div>
  )
}

export default MapCards

MapCards.propTypes = {
  maps: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
}
