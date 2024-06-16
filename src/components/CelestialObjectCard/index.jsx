import PropTypes from "prop-types"
import dayjs from "dayjs"
import { Link, useNavigate } from "react-router-dom"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { CardActions, IconButton, Skeleton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import "./index.css"
import { useUserInfo } from "../UserContext"
import { deleteCelestialObject } from "../../services/request"

const CelestialObjectCard = ({ celestialObject = {}, isLoading = false }) => {
  const userInfo = useUserInfo()
  const navigate = useNavigate()

  const handleEdit = e => {
    e.preventDefault()
    navigate(`/edit/celestial-object/${celestialObject.id}`)
  }

  const handleDelete = e => {
    e.preventDefault()
    deleteCelestialObject(celestialObject.id)
  }


  return (
    <Link to={`/celestial-object/${celestialObject.id}`} style={{ textDecoration: "none" }}>
      <Card
        elevation={3}
        className={celestialObject.type === "Star" ? "star" : "planet"}
        sx={{
          position: "relative",
          transition: "all 0.3s",
          minWidth: "200px",
          maxWidth: "300px",
          width: "fit-content",
          maxHeight: "250px",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {isLoading ? <Skeleton animation="wave" /> : celestialObject.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="left"
            sx={{
              color: "gray",
            }}
          >
            {isLoading ? (
              <Skeleton width={"50%"} animation="wave" />
            ) : celestialObject.description ? (
              celestialObject.description
            ) : (
              " "
            )}
          </Typography>
        </CardContent>
        {celestialObject.userId === userInfo.id && (
          <CardActions disableSpacing>
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </Link>
  )
}

export default CelestialObjectCard

CelestialObjectCard.propTypes = {
  game: PropTypes.object,
  isLoading: PropTypes.bool,
  image: PropTypes.string,
  isImageLoading: PropTypes.bool,
  isFavorite: PropTypes.bool,
  setFavoriteGames: PropTypes.func,
  userInfo: PropTypes.object,
}
