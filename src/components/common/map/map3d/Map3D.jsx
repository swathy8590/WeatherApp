import React, { useContext, useEffect, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import { Context } from '../../../../pages/home/Home'
import DarkImages from "../../../../asset/Images/darckMode_globe.jpg"
import whiteGlobe from "../../../../asset/Images/whiteGlobe.jpg"
import darkBgImages from "../../../../asset/Images/darkMode _bg.png"
import whitebg from "../../../../asset/Images/whitebgg.png"


const Map3D = ({ width, handler }) => {
  const { state, dispatch, mediaQuery } = useContext(Context);
  const globeRef = useRef()
  const [autoRotateCtrl, setautoRotateCtrl] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      dispatch({
        type: 'geoLocation',
        payload: position.coords
      });
      globeRef.current.pointOfView({ lat: position.coords.latitude, lng: position.coords.longitude, altitude: mediaQuery && mediaQuery.mobileone ? 4 : 2 })

    }
    )





  }, [])


  useEffect(() => {
    globeRef.current.controls().autoRotate = autoRotateCtrl;
    globeRef.current.controls().autoRotateSpeed = .3;
  }, [autoRotateCtrl])

  const data3dHandler = (e) => {
    console.log(e)
    dispatch({
      type: 'current-latlng',
      payload: e
    })
    setautoRotateCtrl(true)
  }


  return (
    <>
      <Globe
        globeImageUrl={state && state.theme?.colorMode === "dark" ? DarkImages
          : whiteGlobe}
        backgroundImageUrl={state && state.theme?.colorMode === "dark" ? darkBgImages
          : whitebg}
        heatmapPointLat="lat"
        heatmapPointLng="lng"
        heatmapPointWeight="weight"
        heatmapTopAltitude={0.7}
        heatmapsTransitionDuration={3000}
        enablePointerInteraction={true}
        width={width}
        ref={globeRef}
        onGlobeClick={(e) => data3dHandler(e)}
        onGlobeReady={() => state && globeRef.current.pointOfView({ lat: state?.api?.cardCurrentLatlang?.latitude, lng: state?.api?.cardCurrentLatlang?.longitude, altitude: 1.5 })}

      />
    </>
  )
}

export default React.memo(Map3D)