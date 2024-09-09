import React, { useContext, useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { Context } from "../../../../pages/home/Home";
import DarkImages from "../../../../asset/Images/darckMode_globe.jpg";
import whiteGlobe from "../../../../asset/Images/whiteGlobe.jpg";
import darkBgImages from "../../../../asset/Images/darkMode _bg.png";
import whitebg from "../../../../asset/Images/whitebgg.png";
import { useSpeech } from "react-text-to-speech";

const Map3D = ({ width, handler }) => {
  const { state, dispatch, mediaQuery } = useContext(Context);
  const globeRef = useRef();
  const [autoRotateCtrl, setautoRotateCtrl] = useState(false);
  const [voice, setVoice] = useState("");
  const {
    Text, // Component that returns the modified text property
    speechStatus, // String that stores current speech status
    isInQueue, // Boolean that stores whether a speech utterance is either being spoken or present in queue
    start, // Function to start the speech or put it in queue
    pause, // Function to pause the speech
    stop, // Function to stop the speech or remove it from queue
  } = useSpeech({ text: voice });

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
      globeRef.current.pointOfView(
        {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          altitude: mediaQuery && mediaQuery.mobileone ? 4 : 2,
        },
        1000
      );
    });
  }, []);

  useEffect(() => {
    globeRef.current.controls().autoRotate = autoRotateCtrl;
    globeRef.current.controls().autoRotateSpeed = 0.3;
  }, [autoRotateCtrl]);

  const data3dHandler = (e) => {
    setVoice(
      `Your Destination Latitude is ${JSON.stringify(
        e.lat
      )} and Longitude ${JSON.stringify(e.lng)}`
    );
    dispatch({
      type: "current-latlng",
      payload: e,
    });
    globeRef.current.pointOfView(
      {
        ...e,
        altitude: mediaQuery && mediaQuery.mobileone ? 4 : 0.9,
      },
      1000
    );
    setautoRotateCtrl(true);
  };

  useEffect(() => start(), [voice]);

  useEffect(() => {
    state.theme.drawerOpen === false &&
      globeRef.current.pointOfView(
        {
          ...state.api.currentLatlang,
          altitude: mediaQuery && mediaQuery.mobileone ? 4 : 2,
        },
        1000
      );
  }, [state.theme.drawerOpen]);

  useEffect(() => {
    globeRef.current.pointOfView(
      {
        ...state.api.currentLatlang,
        altitude: mediaQuery && mediaQuery.mobileone ? 4 : 0.9,
      },
      1000
    );
  }, [state.api.currentLatlang]);

  return (
    <>
      <Globe
        globeImageUrl={
          state && state.theme?.colorMode === "dark" ? DarkImages : whiteGlobe
        }
        backgroundImageUrl={
          state && state.theme?.colorMode === "dark" ? darkBgImages : whitebg
        }
        heatmapPointLat="lat"
        heatmapPointLng="lng"
        heatmapPointWeight="weight"
        heatmapTopAltitude={0.7}
        heatmapsTransitionDuration={3000}
        enablePointerInteraction={true}
        animateIn={true}
        width={width}
        ref={globeRef}
        onGlobeClick={(e) => data3dHandler(e)}
        //onGlobeReady={() => state && globeRef.current.pointOfView({ lat: state?.api?.cardCurrentLatlang?.latitude, lng: state?.api?.cardCurrentLatlang?.longitude, altitude: mediaQuery && mediaQuery.mobileone ? 4 : 2 })}
      />
    </>
  );
};

export default React.memo(Map3D);
