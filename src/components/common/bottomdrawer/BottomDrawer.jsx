import { Global } from '@emotion/react';
import { Box, CssBaseline, SwipeableDrawer, Typography } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import TabB from './tabs/TabB';
import { Context } from '../../../pages/home/Home';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const BottomDrawer = () => {

  const { state, dispatch } = useContext(Context)
  //const [open, setOpen] = useState(false);
  const { REACT_APP_WEATHER, REACT_APP_WEATHER_API_KEY } = process.env;





  const toggleDrawer = (newOpen) => {
    dispatch({ type: 'drawerOpen', payload: newOpen });
    console.log("hi")


  };


  useEffect(() => {
    if (state.api.currentLatlang && state.api.currentLatlang !== null) {

      axios
        .get(`${REACT_APP_WEATHER}/v4/weather/forecast?location=${state.api.currentLatlang.lat},${state.api.currentLatlang.lng}&apikey=${REACT_APP_WEATHER_API_KEY.split(",")[Math.floor(Math.random() * 6)]}`)
        .then((response) => response).then((response) => {
          dispatch({ type: "weatherapi", payload: response.data.timelines });
          dispatch({ type: 'drawerOpen', payload: true })


        })
        .catch((error) => {
          console.log(error)
        });
    }

  }, [state.api.currentLatlang]);


  return (
    <Root >
      <CssBaseline />
      <Global
        styles={{
          '.bottomdrawer.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(75% - ${drawerBleeding}px)`,
            overflow: 'visible',
            backdropFilter: ` blur(2px) saturate(180%)`,
            backgroundColor: `rgba(255, 255, 255, 0%)`
          },
        }}
      />
      <Box sx={{ textAlign: 'center', pt: 1, zIndex: 999999, }}>
      </Box>
      <SwipeableDrawer
        className='bottomdrawer'
        anchor="bottom"
        open={state && state.theme.drawerOpen}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: false,

        }}
      > <StyledBox
        sx={{
          position: 'absolute',
          top: -drawerBleeding,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          visibility: 'visible',
          right: 0,
          left: 0,
          color: state.theme?.color,
          backgroundColor: state.theme.colorMode === "dark" ? `rgba(255, 255, 255, 0)` : `rgba(255, 255, 255, 75%)`
        }}
      >
          <Puller />
          <Typography sx={{ p: 2, backgroundColor: `rgba(255, 255, 255, 15%)` }}></Typography>
          <TabB />
        </StyledBox>
      </SwipeableDrawer>
    </Root >
  );
};

export default BottomDrawer;