import React, { useRef, useState, useContext, useEffect } from 'react';
import './Home.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import SpaceCard from '../../components/SpaceCard/SpaceCard';
import GlobalContext from '../../context/GlobalContext';
import { API_URL } from "../../apiconfig";
import { parseISODate } from '../../utils/parseDate'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';





// const spaces = [
//   { id: 1, image: "public/vite.svg", name: 'Espacio 1', location: [41.391306159158506, 2.179069519042969], space_picture: "" },
//   { id: 2, image: "public/vite1.svg", name: 'Espacio 2', location: [41.391517, 2.190130], space_picture: "" },
// ];

const UserLocation = ({ userLocation }) => {
  const map = useMap();

  React.useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, 15);
    }
  }, [userLocation]);

  return null;
};

const UserMarker = ({ userLocation }) => {
  if (!userLocation) {
    return null;
  }

  return <Marker position={userLocation} icon={new L.Icon({ iconUrl: 'https://cdn.mapmarker.io/api/v1/pin?size=50&background=rgb(120,121,241)&text=%20&color=%20&voffset=0&hoffset=0&' })} title="Mi ubicación" />
};

const Locations = {
  Barcelona: {
    coords: [41.391306159158506, 2.179069519042969]
  },
  Terrassa: {
    coords: [41.5608, 2.01]
  },
  Hospitalet: {
    coords: [41.3595, 2.1003]
  },
  ElPrat: {
    coords: [41.3275, 2.0849]
  },
  Mollet: {
    coords: [41.5407, 2.2141]
  }
}

export const Home = () => {
  const mapRef = useRef();
  const { date, setDate, queryLocation, setQueryLocation, error, setError } = useContext(GlobalContext);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [spaces, setSpaces] = useState([])
  const [center, setCenter] = useState([])
  const [zoom, setZoom] = useState(13)

  console.log(queryLocation)



  const route = 'spaces/find'

  const getSpaces = () => {

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const fullRoute = `${API_URL}${route}?${new URLSearchParams({
      location: queryLocation,
      from: parseISODate(date[0]),
      to: parseISODate(date[1])
    })}`
    fetch(fullRoute, options)
      .then(result => result.json())
      .then(response => {
        if (response.ok === true) {
          setSpaces(response.data);
        } else {
          setError(response.error)
        }
      })
      .catch(error => setError(error))
  }

  useEffect(() => {
    if (queryLocation.length > 0) {
      setCenter(Locations[queryLocation].coords)
    } else if (queryLocation.length == 0) {
      setQueryLocation("greaterMetropolitanArea")
      setCenter(Locations.Barcelona.coords)
      setZoom(10)
    }
  }, [])

  useEffect(() => {
    getSpaces()
  }, [queryLocation])

  const handleLocationPermission = () => {
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then(function (result) {
        if (result.state === "granted") {
          setHasLocationPermission(true);

          navigator.geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              setUserLocation([latitude, longitude]);
            },
            error => {
              console.error(error);
            }
          );
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              setUserLocation([latitude, longitude]);
              setHasLocationPermission(true);
            },
            error => {
              console.error(error);
            }
          );
        } else {
          alert("No se han concedido los permisos necesarios para acceder a la ubicación.");
        }
      });
    } else {
      alert("Tu dispositivo no admite la geolocalización.");
    }
  };

  return (
    <>
      <div className="home-container" >
        <div className="map-container" >
          {
            center.length > 0
              ? (
                <MapContainer center={center} zoom={zoom} ref={mapRef}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {spaces.map(space => (
                    <Marker key={space.id} position={[space.lat, space.long]}>
                      <Popup>
                        <SpaceCard name={space.name} image={space.image} space={space} />
                      </Popup>
                    </Marker>
                  ))}
                  <UserLocation userLocation={userLocation} />
                  <UserMarker userLocation={userLocation} />
                  {!hasLocationPermission && (
                    <div className="location-permission" style={{ position: 'absolute', bottom: '16px', right: '20px' }}>
                      <button style={{ backgroundColor: 'white', marginBottom: '10px', borderRadius: '4px', fontSize: '12px', padding: '5px' }} onClick={handleLocationPermission}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="rgba(183, 183, 235, 0.75)" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        Your location
                      </button>
                    </div>
                  )}
                </MapContainer>
              )
              : (
                <CircularProgress />
              )
          }
        </div>
        <div className='spacebetween'></div>
        <div className="spaces-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {
            spaces.length > 0
              ? (
                spaces.map(space => (

                  <SpaceCard key={space.id} name={space.name} image={space.image} from={"home"} space={space} />
                ))
              )
              : (<Typography sx={{ height: 300, width: 800}}>Lo sentimos, no hay espacios disponibles en esta zona.</Typography>)
          }
        </div>
      </div>
    </>
  );
};
