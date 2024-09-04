import React, { createContext, useEffect, useReducer, useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Fab } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MapIcon from '@mui/icons-material/Map';

import BottomDrawer from "../../components/common/bottomdrawer/BottomDrawer";
import Map3D from "../../components/common/map/map3d/Map3D";
import useSize from '@react-hook/size'
import Map2D from "../../components/common/map/map2d/Map2D";
import SideDrawer from "../../components/common/sideDrawer/SideDrawer";
import ThreeDIcon from '@mui/icons-material/ThreeDRotation'
import { reducefn, initializer } from "../../components/common/reducer/reduce"
import Search from "../../components/searchbox/Search";
import WeatherWidget from "../../components/common/weatherwidget/WeatherWidget";
import WeatherWidgetDark from "../../components/common/weatherwidget/WeatherWidgetDark";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import CurrentCard from "../../components/common/card/CurrentCard";



const drawerWidth = 240;
export const Context = createContext()

function Home() {

  // const [latlog, setLatlog] = useState(null);
  const target = React.useRef()
  const [width, height] = useSize(target)
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true)
  const [mode, setmode] = useState(true)
  const [state, dispatch] = useReducer(reducefn, initializer)


  const isDesktop = useMediaQuery({
    query: '(min-width: 600px)'
  })

  const isMobile = useMediaQuery({ query: '(max-width: 800px)' })

  const isTablet = useMediaQuery({ query: '(max-width: 1300px)' })


  const showfn = () => {
    setShow(!show)
  }

  const modefn = () => {
    dispatch({
      type: "whiteMOde",
      payload: ""
    }

    )
    setmode(!mode)
  }
  // console.log(state)
  let { pathname } = useLocation()


  return (
    <>

      <Context.Provider value={{ state: state, dispatch: dispatch, mediaQuery: { desktop: isDesktop, mobile: isMobile } }}>
        <Box sx={{ display: 'flex' }}>
          <SideDrawer />



          <Box ref={target} sx={{ bgcolor: state.theme.mainBackgroundColor, height: '100vh', width: open ? `calc(100% - ${drawerWidth + 72}px)` : `calc(100% - 72px)` }}  >
            {pathname && pathname === "/" && <Search />}
            <Box sx={{ textAlign: 'end' }}>
              <Fab size="small" color="#ffffff" aria-label="add"
                sx={{ m: 3, position: 'absolute', top: "0px", right: "0px", background: state.theme?.backgroundColor, color: state.theme?.color, zIndex: 99991 }}
                onClick={showfn}>

                {show ? <MapIcon sx={{ color: state.theme?.color }} />
                  : <ThreeDIcon sx={{ color: state.theme?.color }} />}
              </Fab>

              <Fab size="small" aria-label="add"
                sx={{ m: 3, position: 'absolute', top: "70px", right: "0px", background: state.theme?.backgroundColor, zIndex: 99991 }}
                onClick={modefn} >
                {mode ? <DarkModeIcon sx={{ color: state.theme?.color }} /> :
                  <LightModeIcon sx={{ color: state.theme?.color }} />}
              </Fab>
            </Box>
            {pathname && pathname === "/location" ? <Outlet />
              : <> {state && state.theme?.drawerOpen === true ? '' : <>{state && state && state.theme?.colorMode === "dark" && !isTablet ? <WeatherWidgetDark /> : !isTablet && <WeatherWidget />}
                {

                  !isMobile && <CurrentCard />

                }


              </>}


                {show ?
                  <Map3D width={width && width} /> :
                  <Map2D />
                }</>}


          </Box>


          <BottomDrawer />

        </Box>
      </Context.Provider >

    </>
  );
}

export default Home;