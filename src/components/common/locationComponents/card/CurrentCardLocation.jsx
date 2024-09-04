import { Card, CardContent, } from '@mui/material'
import React, { useContext, } from 'react'
import WeatherSummarylocationDark from './weatherSummery/WeatherSummarylocationDark'
import WeatherSummarylocation from './weatherSummery/WeatherSummarylocation'
import { Context } from '../../../../pages/home/Home'

const CurrentCardLocation = () => {
    const { state, dispatch } = useContext(Context)

    return (
        <>
            <Card sx={{
                background: state.theme?.backgroundColor,
                borderRadius: '20px',
                textAlign: 'center',
                paddingTop: '10px',
                color: state.theme?.color,
                border: "1px solid state.theme?.borderColor"
            }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px', }}>

                    {state && state.theme?.colorMode === "dark" ? <WeatherSummarylocationDark /> : <WeatherSummarylocation />}
                </CardContent>
            </Card></>
    )
}

export default CurrentCardLocation;