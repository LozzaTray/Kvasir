import React, { useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import config from "config";
import { Drink } from "component/drink";
import { Cluster } from "component/cluster";
import { getDrinks } from "api/drink";
import useSupercluster from "use-supercluster";

const Map: React.FC = () => {
    const mapRef = useRef() as any;
    const [bounds, setBounds] = useState<number[]>([]);

    const defaultCenter = {
        lat: 52.20805855420469,
        lng: 0.11630382846607584,
    };

    const defaultZoom = 16;
    const [zoom, setZoom] = useState(defaultZoom);

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
                defaultZoom={defaultZoom}
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
                            <Cluster
                                key={`cluster-${idx}`}
                                lat={latitude}
                                lng={longitude}
                                count={pointCount}
                                onClick={(): void => {
                                    const expansionZoom = Math.min(
                                        supercluster.getClusterExpansionZoom(
                                            cluster.id
                                        ),
                                        20
                                    );
                                    mapRef.current.setZoom(expansionZoom);
                                    mapRef.current.panTo({
                                        lat: latitude,
                                        lng: longitude,
                                    });
                                }}
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
