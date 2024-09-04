import { Card, CardActions, CardContent, Divider, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../pages/home/Home'
import axios from 'axios'
import WeatherSummaryDark from './weatherSummery/WeatherSummaryDark'
import WeatherSummary from './weatherSummery/WeatherSummary'

const CurrentCard = () => {
    const { state, dispatch } = useContext(Context)
    const [cardWeatherData, setCardWeatherData] = useState()
    console.log(state.api.cardCurrentLatlang)
    const { REACT_APP_WEATHER, REACT_APP_WEATHER_API_KEY } = process.env;

    // useEffect(() => {
    //     if (state.api.cardCurrentLatlang && state.api.cardCurrentLatlang !== null) {

    //         axios
    //             .get(`${REACT_APP_WEATHER}/v4/weather/forecast?location=${state.api.cardCurrentLatlang.latitude},${state.api.cardCurrentLatlang.longitude}&apikey=${REACT_APP_WEATHER_API_KEY}`)
    //             .then((response) => response).then((response) => {

    //                 response && response.data.timelines.daily && setCardWeatherData(response.data?.timelines?.daily[0]?.values?.temperatureAvg)
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //             });
    //     }
    // }, [state,]);
    console.log(cardWeatherData)

    console.log(state.api.cardCurrentLatlang.latitude)
    return (
        <>
            <Card sx={{
                background: state.theme?.backgroundColor,
                width: '25%',
                height: 'auto',
                position: 'absolute',
                bottom: '30px',
                right: '30px',
                zIndex: 9999,
                borderRadius: '20px',
                textAlign: 'center',
                color: state.theme?.color,
                border: "1px solid state.theme?.borderColor"
            }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px', }}>
                    {/* <Typography sx={{ fontSize: 18 }} gutterBottom>
                        CURRENT LOCATION <Divider sx={{ background: state.theme?.color }} />
                    </Typography> */}
                    {/* <Typography sx={{ fontSize: "15px", display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
                        {/* <div style={{ background: 'rgba(255, 255, 255,.1)', width: "80%", padding: '10px', margin: 'auto', height: 'auto', borderRadius: '10px' }}>
                            Current Weather<div>{cardWeatherData}</div>
                        </div> */}
                    {/* <div><b>Latitude:</b>{state.api.cardCurrentLatlang.latitude}</div><div> <b>Longitude:</b>{state.api.cardCurrentLatlang.longitude}</div>*/}
                    {/* </Typography> */}
                    {state && state.theme?.colorMode === "dark" ? <WeatherSummaryDark /> : <WeatherSummary />}
                </CardContent>
                {/* <CardActions>
                </CardActions> */}
            </Card></>
    )
}

export default CurrentCard