import React, { useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import config from "../config";
import { Drink } from "./drink";
import { DrinkCluster } from "./drinkCluster";
import { getDrinks } from "../api/drink";
import useSupercluster from "use-supercluster";

// adapted from https://levelup.gitconnected.com/reactjs-google-maps-with-custom-marker-ece0c7d184c4

const Map: React.FC = () => {
  const mapRef = useRef();
  const [bounds, setBounds] = useState<number[]>([]);

  const defaultCenter = {
    lat: 52.20805855420469,
    lng: 0.11630382846607584,
  };

  const [zoom, setZoom] = useState(16);

  const drinks = getDrinks();

  const points = drinks.map((drink) => ({
    type: "Feature",
    properties: {
      cluster: false,
      venue: drink.venue,
      beverage: drink.beverage,
      pence: drink.pence,
    },
    geometry: {
      type: "Point",
      coordinates: [drink.lng, drink.lat],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 100, maxZoom: 20 },
  });

  return (
    <div style={{ height: "80vh", width: "100vw" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: config.googleMapsApiKey }}
        defaultCenter={defaultCenter}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }): void => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }): void => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
      >
        {clusters.map((cluster, idx) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          if (isCluster) {
            return (
              <DrinkCluster
                key={`cluster-${idx}`}
                lat={latitude}
                lng={longitude}
                count={pointCount}
              />
            );
          }

          return (
            <Drink
              key={`drink-${idx}`}
              lat={latitude}
              lng={longitude}
              {...cluster.properties}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
