import React, {
  createContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useTheme } from "@emotion/react";
import { Box, Fab } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MapIcon from "@mui/icons-material/Map";

import BottomDrawer from "../../components/common/bottomdrawer/BottomDrawer";
import Map3D from "../../components/common/map/map3d/Map3D";
import useSize from "@react-hook/size";
import Map2D from "../../components/common/map/map2d/Map2D";
import SideDrawer from "../../components/common/sideDrawer/SideDrawer";
import ThreeDIcon from "@mui/icons-material/ThreeDRotation";
import { reducefn, initializer } from "../../components/common/reducer/reduce";
import Search from "../../components/searchbox/Search";
import WeatherWidget from "../../components/common/weatherwidget/WeatherWidget";
import WeatherWidgetDark from "../../components/common/weatherwidget/WeatherWidgetDark";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import CurrentCard from "../../components/common/card/CurrentCard";
import Navigation from "../../components/navigation/Navigation";
import TouchAppIcon from "@mui/icons-material/TouchApp";

import "./home.css";

const drawerWidth = 240;
export const Context = createContext();

function Home() {
  const target = React.useRef();
  const [width, height] = useSize(target);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [mode, setmode] = useState(true);
  const [state, dispatch] = useReducer(reducefn, initializer);
  const [mouse, setMouse] = useState({
    mouseX: 50,
    mouseY: 50,
    mouseShow: false,
  });

  const handleMouseMove = (e) => {
    setMouse({ mouseX: e.clientX, mouseY: e.clientY, mouseShow: true });
  };

  const handleMouseLeave = (e) => {
    setMouse({ mouseShow: false });
  };

  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  });
  const isMobileone = useMediaQuery({ query: "(max-width: 750px)" });

  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  const isTablet = useMediaQuery({ query: "(max-width: 1300px)" });

  const showfn = () => {
    setShow(!show);
  };

  const modefn = () => {
    dispatch({
      type: "whiteMOde",
      payload: "",
    });
    setmode(!mode);
  };
  let { pathname } = useLocation();

  return (
    <>
      {/* <FontAwesomeIcon icon="fa-solid fa-hand-point-up" beatFade /> */}
      <Context.Provider
        value={{
          state: state,
          dispatch: dispatch,
          mediaQuery: {
            desktop: isDesktop,
            mobile: isMobile,
            mobileone: isMobileone,
          },
        }}
      >
        <Box sx={{ display: "flex" }}>
          {!isMobile ? <SideDrawer /> : <Navigation />}

          <Box
            ref={target}
            sx={{
              bgcolor: state.theme.mainBackgroundColor,
              height: "100vh",
              width: !isMobile
                ? open
                  ? `calc(100% - ${drawerWidth + 72}px)`
                  : `calc(100% - 72px)`
                : "100%",
            }}
          >
            {pathname && pathname === "/" && <Search />}
            {mouse.mouseShow && !isMobileone && (
              <Box
                className="pulse"
                sx={{
                  position: "absolute",
                  top: mouse.mouseY + "px",
                  left: mouse.mouseX + "px",
                  zIndex: 9999,
                }}
              >
                <TouchAppIcon
                  sx={{
                    color: "rgba(225,225,225,.8)",
                    fontSize: "30px",
                  }}
                />
              </Box>
            )}
            <Box sx={{ textAlign: "end" }}>
              <Fab
                size="small"
                color="#ffffff"
                aria-label="add"
                sx={{
                  m: 3,
                  position: "absolute",
                  right: "0px",
                  background: state.theme?.backgroundColor,
                  color: state.theme?.color,
                  zIndex: 99991,
                  top: isMobile ? "60px" : "10px",
                }}
                onClick={showfn}
              >
                {show ? (
                  <MapIcon sx={{ color: state.theme?.color }} />
                ) : (
                  <ThreeDIcon sx={{ color: state.theme?.color }} />
                )}
              </Fab>

              <Fab
                size="small"
                aria-label="add"
                sx={{
                  m: 3,
                  position: "absolute",
                  right: "0px",
                  background: state.theme?.backgroundColor,
                  zIndex: 99991,
                  top: isMobile ? "120px" : "70px",
                }}
                onClick={modefn}
              >
                {mode ? (
                  <DarkModeIcon sx={{ color: state.theme?.color }} />
                ) : (
                  <LightModeIcon sx={{ color: state.theme?.color }} />
                )}
              </Fab>
            </Box>
            {pathname && pathname === "/location" ? (
              <Outlet />
            ) : (
              <>
                {" "}
                {state && state.theme?.drawerOpen === true ? (
                  ""
                ) : (
                  <>
                    {state &&
                    state &&
                    state.theme?.colorMode === "dark" &&
                    !isTablet ? (
                      <WeatherWidgetDark />
                    ) : (
                      !isTablet && <WeatherWidget />
                    )}
                    {!isMobile && <CurrentCard />}
                  </>
                )}
                {show ? (
                  <Box
                    onMouseMove={(e) => handleMouseMove(e)}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                      cursor: mouse.mouseShow && !isMobileone && "none",
                    }}
                  >
                    <Map3D width={width && width} />
                  </Box>
                ) : (
                  <Map2D />
                )}
              </>
            )}
          </Box>

          <BottomDrawer />
        </Box>
      </Context.Provider>
    </>
  );
}

export default Home;
