// @ts-nocheck

import { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Circle as CircleStyle, Fill, Icon, Style } from "ol/style";
import Overlay from "ol/Overlay";
import styled from "styled-components";
import "ol/ol.css";
import races from "./events.json";
import { Coordinate } from "ol/coordinate";
import markerSvg from "./marker.svg";

const EventsMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<Map>();

  useEffect(() => {
    const getData = async () => {
      const vectorSource = new VectorSource();

      const iconStyle = new Style({
        image: new Icon({
          src: markerSvg,
        }),
      });

      races.forEach((event) => {
        const { coordinates, data: eventData } = event;
        const feature = new Feature({
          geometry: new Point(fromLonLat(coordinates)),
          eventData,
        });
        vectorSource.addFeature(feature);
        feature.setStyle(iconStyle);
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
          image: new CircleStyle({
            radius: 12,
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
          const coordinates = feature.getGeometry()?.getCoordinates();
          const eventData = feature.get("eventData");
          const content = document.getElementById("popup-content")!;
          content.innerHTML = `
            <strong>${eventData[3]}</strong><br>
            ${eventData[4]}, ${eventData[5]}<br>
            <br>
            Month: ${eventData[1]}<br>
            <br>
            Swim: ${eventData[11]}<br>
            Bike: ${eventData[12]}<br>
            Run: ${eventData[13]}<br>
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

      void getData();
    }
  }, []);

  return (
    <main>
      <h1>Events Map</h1>
      <div style={{ height: 800 }}>
        <MapContainer ref={mapRef}></MapContainer>
        <Popup id="popup">
          <PopupContent id="popup-content"></PopupContent>
        </Popup>
      </div>
      <section>
        <h1>Explore All Global Triathlon Events on Our Interactive Map</h1>
        <p>
          Looking for your next Triathlon challenge? Our comprehensive Triathlon
          events map helps you find races across the globe. Whether you're a
          seasoned triathlete or a first-time competitor, easily navigate and
          discover Triathlon competitions in North America, Europe, Asia,
          Australia, and beyond. From iconic destinations like Kona and Cozumel
          to new and emerging race locations, this map covers every Triathlon
          triathlon, including full-distance and Middle Distance events.
        </p>
        <p>
          Filter by date, region, or race type to find the perfect event that
          matches your goals and training schedule. Stay updated with race
          information, registration details, and travel tips for each Triathlon
          location.
        </p>
        <p>
          So far we only cover Ironman events and need to extend our Database
        </p>
        <p>
          We want to include way more events and filtering for Oly, Half and
          Full.
        </p>
      </section>
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
