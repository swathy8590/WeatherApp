import { Card, CardActions, CardContent, Divider, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../pages/home/Home'
import axios from 'axios'
import WeatherSummaryDark from './weatherSummery/WeatherSummaryDark'
import WeatherSummary from './weatherSummery/WeatherSummary'

const CurrentCard = () => {
    const { state, dispatch } = useContext(Context)
    const [cardWeatherData, setCardWeatherData] = useState()

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
                    {state && state.theme?.colorMode === "dark" ? <WeatherSummaryDark /> : <WeatherSummary />}
                </CardContent>

            </Card></>
    )
}

export default CurrentCard