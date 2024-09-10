import React, { useContext, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "./map2DStyle.css";
import "leaflet/dist/leaflet.css";
import { Context } from "../../../../pages/home/Home";
import { useSpeech } from "react-text-to-speech";

function Map2D() {
  const { state, dispatch, mediaQuery } = useContext(Context);
  const [mapCenter, setMapCenter] = useState([14.910813, 76.54668]);
  const [mapZoom, setMapZoom] = useState(2);
  const [voice, setVoice] = useState("");

  const {
    Text, // Component that returns the modified text property
    speechStatus, // String that stores current speech status
    isInQueue, // Boolean that stores whether a speech utterance is either being spoken or present in queue
    start, // Function to start the speech or put it in queue
    pause, // Function to pause the speech
    stop, // Function to stop the speech or remove it from queue
  } = useSpeech({ text: voice });

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        map.locate();
        map.flyTo(e.latlng, 5);
        setVoice(
          `Your Destination Latitude is ${JSON.stringify(
            e.latlng.lat
          )} and Longitude ${JSON.stringify(e.latlng.lng)}`
        );
        dispatch({
          type: "current-latlng",
          payload: e.latlng,
        });
      },
      // locationfound: (location) => {
      //   setMap2DLatlog(location.latlng)
      // },
    });

    useEffect(() => start(), [voice]);
    useEffect(() => {
      state &&
        state.api.currentLatlang !== "" &&
        map.flyTo(
          [state.api.currentLatlang.lat, state.api.currentLatlang.lng],
          5
        );
    }, [state.api.currentLatlang]);

    useEffect(() => {
      state &&
        state.theme.drawerOpen === false &&
        state.api.currentLatlang !== "" &&
        map.flyTo(
          [state.api.currentLatlang.lat, state.api.currentLatlang.lng],
          2
        );
    }, [state.theme.drawerOpen]);

    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch({
          type: "geoLocation",
          payload: position.coords,
        });
        setVoice(
          `Your Destination Latitude is ${JSON.stringify(
            position.coords.latitude
          )} and Longitude ${JSON.stringify(position.coords.longitude)}`
        );
        position &&
          state.api.currentLatlang === "" &&
          !state.theme.drawerOpen &&
          map.flyTo([position.coords.latitude, position.coords.longitude], 5);
      });
    }, []);
  }
  // console.log(state && state.api.currentLatlang);
  return (
    <div>
      <div>
        <MapContainer center={mapCenter} zoom={mapZoom} dragging={true}>
          <TileLayer
            url={
              state && state.theme?.colorMode === "dark"
                ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
                : "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
            }
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MyComponent />
        </MapContainer>
      </div>
    </div>
  );
}

export default Map2D;
