import { Map } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import { defaults } from "ol/control/defaults";
import { defaults as interactionDefaults } from "ol/interaction/defaults";
import { useEffect, useRef } from "react";
const osmBaseLayer = new TileLayer({
  visible: true,
  source: new OSM(),
});

export const map = new Map({
  target: "map",
  layers: [osmBaseLayer],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
  controls: defaults(),
  interactions: interactionDefaults({}),
});

export function useMap() {
  const mapRef = useRef<Map>();
  if (!mapRef.current) {
    mapRef.current = map;
  }
  return mapRef.current;
}

const EventsMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap();

  useEffect(() => {
    if (mapRef.current) {
      map.setTarget(mapRef.current);
      map.updateSize();
    }
  }, [map]);

  return (
    <div>
      <h1>Events Map</h1>
      <div>TODO: Filter 70.3, 140.6...</div>
      <div
        style={{
          height: 400,
        }}
      >
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
            background: "white",
          }}
          ref={mapRef}
        ></div>
      </div>
    </div>
  );
};

export default EventsMap;
