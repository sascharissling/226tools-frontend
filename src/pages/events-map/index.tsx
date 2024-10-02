import { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Circle as CircleStyle, Fill, Style } from "ol/style";
import Overlay from "ol/Overlay";
import styled from "styled-components";
import "ol/ol.css";
import races from "./events.json";
import { Coordinate } from "ol/coordinate";

const EventsMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<Map>();

  useEffect(() => {
    const getData = async () => {
      const vectorSource = new VectorSource();

      races.forEach((event) => {
        const { coordinates, data: eventData } = event;
        const feature = new Feature({
          geometry: new Point(fromLonLat(coordinates)),
          eventData,
        });
        vectorSource.addFeature(feature);
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
          image: new CircleStyle({
            radius: 10,
            fill: new Fill({
              color: "#FF0000", // Bright red for visibility
            }),
          }),
        }),
      });

      // Add the vector layer to the map
      map.current?.addLayer(vectorLayer);

      // Zoom to fit all the features
      const extent = vectorSource.getExtent();
      map.current?.getView().fit(extent, {
        size: map.current.getSize(),
        padding: [50, 50, 50, 50], // Optional padding
        maxZoom: 12, // Set max zoom level to avoid zooming too close
      });

      // Create an overlay to show event information
      const overlay = new Overlay({
        element: document.getElementById("popup")!,
        autoPan: true,
      });
      map.current?.addOverlay(overlay);

      // Display event information on hover
      map.current?.on("pointermove", (event) => {
        const feature = map.current?.forEachFeatureAtPixel(
          event.pixel,
          (feature) => feature,
        );
        if (feature) {
          const coordinates = feature.getGeometry();
          const eventData = feature.get("eventData");
          const content = document.getElementById("popup-content")!;
          content.innerHTML = `
            <strong>${eventData[0]}</strong><br>
            Date: ${eventData[1]}<br>
            <a href="${eventData[2]}" target="_blank">Link</a><br>
            <img src="${eventData[3]}" alt="Event Image" style="width:100px;height:auto;"><br>
            ${eventData.slice(4).join("<br>")}
          `;
          overlay.setPosition(coordinates as unknown as Coordinate);
        } else {
          overlay.setPosition(undefined);
        }
      });
    };

    if (!map.current && mapRef.current) {
      // Initialize the map
      map.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([0, 0]), // Initial center of the map
          zoom: 2,
        }),
      });

      getData();
    }
  }, []);

  return (
    <main>
      <h1>Events Map</h1>
      <div style={{ height: 800 }}>
        <MapContainer ref={mapRef}></MapContainer>
      </div>
      <Popup id="popup">
        <PopupContent id="popup-content"></PopupContent>
      </Popup>
    </main>
  );
};

export default EventsMap;

const MapContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background: white;
`;

const Popup = styled.div`
  position: absolute;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  bottom: 12px;
  left: -50px;
  min-width: 200px;

  &:after,
  &:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-top-color: #fff;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }

  &:before {
    border-color: rgba(204, 204, 204, 0);
    border-top-color: #ccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
`;

const PopupContent = styled.div``;
