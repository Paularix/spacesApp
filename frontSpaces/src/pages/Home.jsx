import React from 'react';
import './Home.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import SpaceCard from '../components/SpaceCard';

export const Home = () => {
  const spaces = [
    { id: 1, name: 'Espacio 1', location: [41.391306159158506, 2.179069519042969] },
    { id: 2, name: 'Espacio 2', location: [41.391517, 2.190130] },
    { id: 3, name: 'Espacio 3', location: [41.383210, 2.176955] },
    { id: 4, name: 'Espacio 4', location: [41.390808, 2.174852] },
    { id: 5, name: 'Espacio 5', location: [41.398406, 2.183006] },



  ];

  return (
    <div>
      
      <div>
        <MapContainer center={[41.390306159158506, 2.179069519042969]} zoom={15} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
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
      <div>
      </div>
    </div>
  );
}

export default Home;
