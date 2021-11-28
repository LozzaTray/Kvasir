import React from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import config from "../config";
import { useDeepCompareEffectForMaps } from "../hooks/map";


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

	const [zoom, setZoom] = React.useState(0);
	const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
		lat: -34,
		lng: 151,
	});

	const onIdle = (m: google.maps.Map) => {
		console.log("onIdle");
		setZoom(m.getZoom()!);
		setCenter(m.getCenter()!.toJSON());
	};

	return <Wrapper apiKey={config.googleMapsApiKey} render={render}>
		<Map style={{ width: "300px", height: "300px" }} zoom={zoom} center={center} onIdle={onIdle} />
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

	// because React does not do deep comparisons, a custom hook is used
	// see discussion in https://github.com/googlemaps/js-samples/issues/946
	useDeepCompareEffectForMaps(() => {
		if (map) {
			map.setOptions(options);
		}
	}, [map, options]);

	return <div ref={ref} style={style} />
};

export default MapWrapper;