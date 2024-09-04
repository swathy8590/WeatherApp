import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../pages/home/Home';
import { Autocomplete, Stack, TextField } from '@mui/material';
import axios from 'axios';

function Search() {
    const { state, dispatch } = useContext(Context)
    const { REACT_APP_SEARCH, REACT_APP_SEARCH_API_KEY } = process.env

    const handleSearch = async (e) => {
        console.log(state)
        await axios
            .get(`${REACT_APP_SEARCH}/search?q=${e.target.value}&api_key=${REACT_APP_SEARCH_API_KEY}`)
            .then((response) => response).then((response) => {

                console.log(response)
                const locationName = response.data.map((val, inx) => val.display_name)
                dispatch({ type: "location-name", payload: locationName })
                const searchData = response.data.map((val, inx) => val)
                dispatch({ type: "search-data", payload: searchData })

            })
            .catch((error) => {
                console.log(error)
            });
    }


    const handleChange = (e, value) => {
        // console.log(value, state.api.searchData)
        const searchLatLng = state && state.api.searchData.filter(val => val.display_name === value);
        // console.log({ lat: searchLatLng[0].lat, lng: searchLatLng[0].lon })
        dispatch({ type: "current-latlng", payload: { lat: searchLatLng[0].lat, lng: searchLatLng[0].lon } })
        console.log(state.api.currentLatlang)


    }


    return (
        <>
            <Stack spacing={2} sx={{
                width: 300,
                background: state.theme?.backgroundColor,
                position: 'absolute',
                top: '20px',
                marginLeft: '20px',
                border: "1px solid state.theme?.borderColor",
                zIndex: 999,
                backdropFilter: ` blur(5px) saturate(180%)`,
                webkitBackdropFilter: `blur(20px) saturate(180%)`,
                // backgroundColor: `rgba(225, 0, 0, .2)`
            }} >
                <Autocomplete
                    autoComplete={true}
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={state.api.searchName}
                    onChange={(e, value) => handleChange(e, value)}
                    renderInput={(params) => (
                        <TextField
                            fontColor="red"
                            {...params}
                            style={{ color: 'red' }}
                            placeholder="Search Location"
                            der='search location'
                            value={state.api.searchName}

                            InputProps={{
                                style: { color: state.theme?.color },
                                ...params.InputProps,
                                type: 'search',
                                onChange: handleSearch


                            }}
                        />
                    )}
                />
            </Stack>
        </>

    )
}

export default Search