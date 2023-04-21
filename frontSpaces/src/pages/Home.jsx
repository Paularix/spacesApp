
import React, { useRef } from 'react';
import './Home.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Button } from 'react-bootstrap';
import SpaceCard from '../components/SpaceCard';


export const Home = () => {
  const spaces = [
    { id: 1, name: 'Espacio 1', location: [41.391306159158506, 2.179069519042969] },
    { id: 2, name: 'Espacio 2', location: [41.391517, 2.190130] },
    { id: 3, name: 'Espacio 3', location: [41.383210, 2.176955] },
    { id: 4, name: 'Espacio 4', location: [41.390808, 2.174852] },
    { id: 5, name: 'Espacio 5', location: [41.398406, 2.183006] },
  ];

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

  return (
    <>
    <div>
      <Button onClick={() => handleCenterMap(mapRef.current)}>Centrar Mapa</Button>
      <MapContainer center={[41.391306159158506, 2.179069519042969]} zoom={13} ref={mapRef}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {spaces.map(space => (
          <Marker key={space.id} position={space.location}>
            <Popup>
              <SpaceCard name={space.name} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
     <div className='spacesSection'>
     {spaces.map(space => (
       <SpaceCard key={space.id} name={space.name} />
     ))}
   </div>
   </>
    
  );
};


