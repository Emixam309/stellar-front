import { useEffect, useState } from "react"
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
} from "@mui/material"
import { celestialType, planetTypes, starTypes } from "./utils"
import "./style.css"
import useMaps from "../../hooks/useMaps"
import { addCelestialObject, editCelestialObject } from "../../services/request"
import { useParams } from "react-router-dom"
import useCelestialObjectDetails from "../../hooks/useCelestialObjectDetails"

const CelestialObjectForm = ({ isEdit = false }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [mass, setMass] = useState("")
  const [radius, setRadius] = useState("")
  const [type, setType] = useState("Star")
  const [planetType, setPlanetType] = useState()
  const [starType, setStarType] = useState()
  const [brightness, setBrightness] = useState()
  const [isWater, setIsWater] = useState(false)
  const [isLife, setIsLife] = useState(false)
  const [mapId, setMapId] = useState()
  const [isPublic, setIsPublic] = useState(true)

  const { celestialObjectId } = useParams()
  console.log("celestialObjectId", celestialObjectId)

  const { celestialObject } = useCelestialObjectDetails(celestialObjectId)

  useEffect(() => {
    setPlanetType(null)
    setStarType(null)
  }, [type])

  useEffect(() => {
    if (isEdit && celestialObject) {
      setName(celestialObject.name)
      setDescription(celestialObject.description)
      setMass(celestialObject.mass)
      setRadius(celestialObject.radius)
      setType(celestialObject.type)
      setPlanetType(celestialObject.planetType)
      setStarType(celestialObject.starType)
      setBrightness(celestialObject.brightness)
      setIsWater(celestialObject.isWater)
      setIsLife(celestialObject.isLife)
      setMapId(celestialObject.mapId)
      setIsPublic(celestialObject.isPublic)
    }
  }, [celestialObject])

  const handleSubmit = e => {
    e.preventDefault()
    if (!isEdit) {
      addCelestialObject({
        name,
        description,
        mass,
        radius,
        type,
        planetType,
        starType,
        brightness: type === "Star" ? brightness : null,
        isWater: type === "Planet" ? isWater : null,
        isLife: type === "Planet" ? isLife : null,
        mapId,
        isPublic,
      })
    } else {
      editCelestialObject({
        id: celestialObjectId,
        name,
        description,
        mass,
        radius,
        type,
        planetType,
        starType,
        brightness: type === "Star" ? brightness : null,
        isWater: type === "Planet" ? isWater : null,
        isLife: type === "Planet" ? isLife : null,
        mapId,
        isPublic,
      })
    }
  }

  console.log(isWater)
  const { maps } = useMaps({ rowsPerPage: 50, page: 1 })

  return (
    <Paper sx={{ padding: "20px" }}>
      <h1>{!isEdit ? "Add Celestial Object" : "Edit Celestial Object"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <TextField
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Mass"
            value={mass}
            onChange={e => setMass(e.target.value)}
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            label="Radius"
            value={radius}
            onChange={e => setRadius(e.target.value)}
            variant="outlined"
            required
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="type">Type</InputLabel>
            <Select
              labelId="type"
              label="Type"
              value={type}
              onChange={e => setType(e.target.value)}
              variant="outlined"
              required
              fullWidth
            >
              {celestialType.map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {type === "Star" && (
            <TextField
              label="Brightness"
              value={brightness}
              onChange={e => setBrightness(e.target.value)}
              variant="outlined"
              required={type === "Star"}
              fullWidth
            />
          )}
          <FormControl fullWidth>
            {type === "Star" ? (
              <>
                <InputLabel id="star-type">Star Type</InputLabel>
                <Select
                  labelId="star-type"
                  label="Star Type"
                  value={starType}
                  onChange={e => setStarType(e.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                >
                  {starTypes.map(type => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </>
            ) : (
              <>
                <InputLabel id="planet-type">Planet Type</InputLabel>
                <Select
                  labelId="planet-type"
                  label="Planet Type"
                  value={planetType}
                  onChange={e => setPlanetType(e.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                >
                  {planetTypes.map(type => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="maps-list">Maps</InputLabel>
            <Select
              labelId="maps-list"
              label="Maps"
              value={mapId}
              onChange={e => setMapId(e.target.value)}
              variant="outlined"
              fullWidth
            >
              {maps.map(map => (
                <MenuItem key={map.id} value={map.id}>
                  {map.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <FormGroup>
          {type === "Planet" && (
            <>
              <FormControlLabel
                value={isWater}
                onChange={e => setIsWater(e.target.checked)}
                control={<Switch defaultChecked />}
                label="Is Water"
              />
              <FormControlLabel
                value={isLife}
                onChange={e => setIsLife(e.target.checked)}
                control={<Switch />}
                label="Is Life"
              />
            </>
          )}
          <FormControlLabel
            defaultChecked
            value={isPublic}
            onChange={e => setIsPublic(e.target.checked)}
            control={<Switch />}
            label="Is Public"
          />
        </FormGroup>
        <Button type="submit" variant="contained">
          {!isEdit ? "Add Celestial Object" : "Edit Celestial Object"}
        </Button>
      </form>
    </Paper>
  )
}

export default CelestialObjectForm
