import React from "react";
import { createCustomEqual } from "fast-equals";


const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a: any, b: any) => {
        if (a instanceof google.maps.LatLng || b instanceof google.maps.LatLng) {
            return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
        }

        // TODO extend to other types

        // use fast-equals for other objects
        return deepEqual(a, b);
    }
);

const useDeepCompareMemoize = (value: any) => {
    const ref = React.useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}

// because React does not do deep comparisons, a custom hook is used
// see discussion in https://github.com/googlemaps/js-samples/issues/946
const useDeepCompareEffectForMaps = (
    callback: React.EffectCallback,
    dependencies: any[]
) => {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export { useDeepCompareEffectForMaps };