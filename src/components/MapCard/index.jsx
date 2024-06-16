import { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { Accordion, AccordionDetails, AccordionSummary, Collapse, Divider, Skeleton } from "@mui/material"
import { ExpandMore } from "@mui/icons-material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CelestialObjectCard from "../CelestialObjectCard"
import "./index.css"

const MapCard = ({ map = {}, isLoading = false, userInfo = {} }) => {
  const [expanded, setExpanded] = useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <Accordion
      sx={{
        position: "relative",
        width: "100%",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        variant="h6"
        component="div"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {isLoading ? <Skeleton animation="wave" /> : map.name}
      </AccordionSummary>
      <AccordionDetails className="cards-list">
        {map.celestialObjects.map(celestialObject => (
          <CelestialObjectCard
            key={celestialObject.id}
            celestialObject={celestialObject}
            isLoading={isLoading}
            userInfo={userInfo}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

export default MapCard

MapCard.propTypes = {
  map: PropTypes.object,
  isLoading: PropTypes.bool,
}
