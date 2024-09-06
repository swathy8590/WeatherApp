import { Box, Button, Divider, ListItem, ListItemIcon, ListItemText, } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Context } from '../../pages/home/Home';
import { Link } from 'react-router-dom';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const Navigation = () => {
    const { state, dispatch, mediaQuery } = useContext(Context)


    const [isVisible, setIsVisible] = useState(false);

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };


    return (
        <div>
            <div style={{ position: 'relative', height: '200px', border: '1px solid black' }}>
                <Button variant="contained" onClick={handleToggle} style={{
                    background: state.theme.backgroundColor, position: 'absolute',
                    top: 13,
                    left: 5,
                    zIndex: 10,
                    width: 5,
                    height: 30,
                }} >
                    {isVisible ? <ChevronLeftIcon sx={{ color: state.theme?.color }} /> : <MenuIcon sx={{ color: state.theme?.color }} />}
                </Button>
                {isVisible && (
                    <Box
                        sx={{
                            width: 150,
                            height: 110,
                            position: 'absolute',
                            top: 49, // Adjust this to position it relative to the button
                            left: 5,
                            backgroundColor: 'lightgrey',
                            borderRadius: 1,
                            boxShadow: 2,
                            zIndex: 5,
                            background: state.theme.backgroundColor

                        }}
                    >
                        <Link style={{ textDecoration: 'none' }} to="/" >
                            <ListItem
                            // style={lsitItemStyle}
                            >
                                <ListItemIcon  >
                                    <HomeOutlinedIcon sx={{ color: state.theme?.color }} />
                                </ListItemIcon>
                                <ListItemText primary="Home" sx={{ color: state.theme?.color }} />
                            </ListItem>
                        </Link>
                        <Divider sx={{ background: state.theme?.borderColor }} />
                        <Link style={{ textDecoration: 'none' }} to="/location" >
                            <ListItem >
                                <ListItemIcon>
                                    <LocationOnOutlinedIcon sx={{ color: state.theme?.color }} />
                                </ListItemIcon>
                                <ListItemText primary="Current weather" sx={{ color: state.theme?.color }} />
                            </ListItem>
                        </Link>
                        {/* Content inside the box */}
                    </Box>
                )}
            </div>
        </div >

    )
}


export default Navigation