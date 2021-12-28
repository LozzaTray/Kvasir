import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import config from "../config";
import Drink from "./drink";

// adapted from https://levelup.gitconnected.com/reactjs-google-maps-with-custom-marker-ece0c7d184c4


const SimpleMap: React.FC = () => {
  const [center, setCenter] = useState({
    lat: 51.515,
    lng: -0.111,
  });
  const [zoom, setZoom] = useState(12);

  const options_array = [
    {
      lat: 51.515,
      lng: -0.111,
      pence: 101
    },
    {
      lat: 51.515,
      lng: -0.121,
      pence: 420
    }
  ]



  return (
    <div style={{ height: '80vh', width: '100vw' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: config.googleMapsApiKey }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        {options_array.map((options, idx) => <Drink key={`drink-${idx}`} {...options} />)}
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;