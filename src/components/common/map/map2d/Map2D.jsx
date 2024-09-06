import React, { useContext, } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "./map2DStyle.css";
import "leaflet/dist/leaflet.css";
import { Context } from "../../../../pages/home/Home";

const defaultCenter = [14.910813, 76.54668];
const defaultZoom = 2;


function Map2D() {
  const { state, dispatch } = useContext(Context)

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        map.locate()
        dispatch({
          type: 'current-latlng',
          payload: e.latlng

        })
      },
      // locationfound: (location) => {
      //   setMap2DLatlog(location.latlng)
      // },
    })
  }
  // const mapRef = useRef();
  // ref={mapRef}
  console.log(state.api.currentLatlang)

  return (
    <div>
      <div>
        <MapContainer center={defaultCenter} zoom={defaultZoom}  >
          <TileLayer

            url={state && state.theme?.colorMode === "dark" ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
              : "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MyComponent />
        </MapContainer>
      </div>
    </div>
  );
}

export default Map2D;