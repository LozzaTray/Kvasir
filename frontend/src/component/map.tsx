import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import config from "../config";
import Drink from "./drink";
import { getDrinks } from "../api/drink";

// adapted from https://levelup.gitconnected.com/reactjs-google-maps-with-custom-marker-ece0c7d184c4


const SimpleMap: React.FC = () => {
  const [center, setCenter] = useState({
    lat: 52.20805855420469,
    lng: 0.11630382846607584,
  });
  const [zoom, setZoom] = useState(16);

  const drinks = getDrinks();

  return (
    <div style={{ height: '80vh', width: '100vw' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: config.googleMapsApiKey }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        {drinks.map((drink, idx) => <Drink key={`drink-${idx}`} {...drink} />)}
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;