import React, { useRef, useState } from 'react';
import './Home.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import SpaceCard from '../components/SpaceCard';

const spaces = [
  { id: 1, image: "public/vite.svg", name: 'Espacio 1', location: [41.391306159158506, 2.179069519042969], image: "public/vite.svg" },
  { id: 2, image: "public/vite1.svg", name: 'Espacio 2', location: [41.391517, 2.190130], image: "public/vite2.svg" },
  { id: 3, image: "public/vite2.svg", name: 'Espacio 3', location: [41.383210, 2.176955], image: "public/vite1.svg" },
  { id: 4, image: "public/vite.svg", name: 'Espacio 4', location: [41.390808, 2.174852], image: "public/vite1.svg" },
  { id: 5, image: "public/vite1.svg", name: 'Espacio 5', location: [41.398406, 2.183006], image: "public/vite.svg" },
  { id: 16, image: "public/vite.svg", name: 'Espacio 1', location: [41.391306159158506, 2.179069519042969], image: "public/vite.svg" },
  { id: 17, image: "public/vite1.svg", name: 'Espacio 2', location: [41.391517, 2.190130], image: "public/vite2.svg" },
  { id: 18, image: "public/vite2.svg", name: 'Espacio 3', location: [41.383210, 2.176955], image: "public/vite1.svg" },
  // { id: 19, image: "public/vite.svg", name: 'Espacio 4', location: [41.390808, 2.174852], image: "public/vite1.svg" },
  // { id: 20, image: "public/vite1.svg", name: 'Espacio 5', location: [41.398406, 2.183006], image: "public/vite.svg" },
  // { id: 6, image: "public/vite.svg", name: 'Espacio 6', location: [41.388888, 2.168754], image: "public/vite2.svg" },
  // { id: 7, image: "public/vite1.svg", name: 'Espacio 7', location: [41.386984, 2.174730], image: "public/vite.svg" },
  // { id: 8, image: "public/vite2.svg", name: 'Espacio 8', location: [41.384569, 2.173360], image: "public/vite1.svg" },
  // { id: 9, image: "public/vite.svg", name: 'Espacio 9', location: [41.393447, 2.179957], image: "public/vite2.svg" },
  // { id: 10, image: "public/vite1.svg", name: 'Espacio 10', location: [41.395256, 2.179831], image: "public/vite.svg" },
  // { id: 11, image: "public/vite2.svg", name: 'Espacio 11', location: [41.389882, 2.183899], image: "public/vite1.svg" },
  // { id: 12, image: "public/vite.svg", name: 'Espacio 12', location: [41.387514, 2.180366], image: "public/vite2.svg" },
  // { id: 13, image: "public/vite1.svg", name: 'Espacio 13', location: [41.385556, 2.177500], image: "public/vite.svg" },
  // { id: 14, image: "public/vite2.svg", name: 'Espacio 14', location: [41.393780, 2.180125], image: "public/vite1.svg" },
  // { id: 15, image: "public/vite.svg", name: 'Espacio 15', location: [41.388012, 2.186820], image: "public/vite2.svg" },


];

  //Pruebas..

const UserLocation = ({ userLocation }) => {
  const map = useMap();

  React.useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, 15);
    }
  }, [userLocation]);

  return null;
};

export const Home = () => {
  const mapRef = useRef();

  const handleCenterMap = (map) => {
    // Encontrar la ubicación con más puntos
    const locations = spaces.map(space => space.location);
    const counts = {};
    locations.forEach(location => {
      counts[location.toString()] = (counts[location.toString()] || 0) + 1;
    });
    const maxCount = Math.max(...Object.values(counts));
    const maxLocation = Object.keys(counts).find(key => counts[key] === maxCount);
    const [lat, lng] = maxLocation.split(',').map(coord => parseFloat(coord));

    // Centrar el mapa en la ubicación con más puntos
    map.setView([lat, lng], 15);
  };

  const [userLocation, setUserLocation] = useState(null);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };



  return (
    <>
      <div>
        <button onClick={() => handleCenterMap(mapRef.current)}>Centrar Mapa</button>
        <button onClick={getUserLocation}>Mi ubicación</button>
        <MapContainer center={[41.391306159158506, 2.179069519042969]} zoom={13} ref={mapRef}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {spaces.map(space => (
            <Marker key={space.id} position={space.location}>
              <Popup>
                <SpaceCard name={space.name} image={space.image} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className='spacesSection'>
        {spaces.map(space => (
          <SpaceCard key={space.id} name={space.name} image={space.image} />

        ))}
      </div>
    </>

  );
};


