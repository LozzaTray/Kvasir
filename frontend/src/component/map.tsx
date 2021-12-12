import React from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import config from "../config";
import { useDeepCompareEffectForMaps } from "../hooks/map";
import { Marker } from "./marker";


interface MapProps extends google.maps.MapOptions {
	style: { [key: string]: string };
	onClick?: (e: google.maps.MapMouseEvent) => void;
	onIdle?: (map: google.maps.Map) => void;
}


const MapWrapper: React.VFC = () => {
	const render = (status: Status) => {
		switch (status) {
			case Status.LOADING:
				return <h1>Loading...</h1>;
			case Status.FAILURE:
				return <h1>Failed...</h1>;
			default:
				return <h1>Unknown...</h1>
		}
	};

	const [zoom, setZoom] = React.useState(12);
	const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
		lat: 51.515,
		lng: -0.111,
	});

	const onIdle = (m: google.maps.Map) => {
		console.log("onIdle");
		setZoom(m.getZoom()!);
		setCenter(m.getCenter()!.toJSON());
	};

	const locations = [
		{
			lat: 51.515,
			lng: -0.111
		},
		{
			lat: 51.515,
			lng: -0.121
		}
	]

	return <Wrapper apiKey={config.googleMapsApiKey} render={render}>
		<Map style={{ width: "100hh", height: "80vh" }} zoom={zoom} center={center} onIdle={onIdle}>
			{locations.map((location) => <Marker position={location} />)}
		</ Map>
	</Wrapper>
}

const Map: React.FC<MapProps> = ({
	onClick,
	onIdle,
	children,
	style,
	...options
}) => {
	const ref = React.useRef<HTMLDivElement>(null);
	const [map, setMap] = React.useState<google.maps.Map>();

	React.useEffect(() => {
		if (ref.current && !map) {
			setMap(new window.google.maps.Map(ref.current, {}));
		}
	}, [ref, map]);

	useDeepCompareEffectForMaps(() => {
		if (map) {
			map.setOptions(options);
		}
	}, [map, options]);

	return (
		<>
			<div ref={ref} style={style} />
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					// set the map prop on the child component
					return React.cloneElement(child, { map });
				}
			})}
		</>
	);
};

export default MapWrapper;