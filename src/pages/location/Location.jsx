import React, { useContext } from 'react'
import AirWidget from '../../components/common/locationComponents/airWidget/AirWidget'
import AirWidgetDark from '../../components/common/locationComponents/airWidget/AirWidgetDark'
import { Context } from '../home/Home'
import PollenWidget from '../../components/common/locationComponents/PollenWidget/PollenWidget'
import PollenWidgetDark from '../../components/common/locationComponents/PollenWidget/PollenWidgetDark'
import { Grid, } from '@mui/material'
import CurrentCard from '../../components/common/card/CurrentCard'




const Location = () => {
    const { state, dispatch, mediaQuery } = useContext(Context)

    return (
        < >


            <Grid container spacing={2} sx={{ p: 5, gap: '50px' }}  >

                <Grid size={{ xs: 12, md: 6, lg: 6 }} px={2} >

                    {state && state.theme.colorMode === 'dark' ? <AirWidgetDark /> : <AirWidget />}
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 6 }} px={2}>

                    <>{!mediaQuery.mobileone ? state && state.theme.colorMode === 'dark' ? <PollenWidgetDark /> : <PollenWidget /> : ''}</>

                </Grid>


                <Grid size={{ xs: 12, md: 6, lg: 6 }} px={2}>
                    {!mediaQuery.mobile ? <CurrentCard /> : ""}
                </Grid>
            </Grid >








        </ >
    )
}

export default Location