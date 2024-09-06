import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Context } from '../../pages/home/Home';
import { Link } from 'react-router-dom';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const Navigation = () => {
    const { state, dispatch, mediaQuery } = useContext(Context)
    const [isVisible, setIsVisible] = useState(false);
    const lsitItemStyle = { paddingLeft: "22px" }

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };


    return (
        <div>
            <div style={{ position: 'relative', height: '200px', border: '1px solid black' }}>
                <Button variant="text" onClick={handleToggle} style={{
                    //background: state.theme.backgroundColor,
                    position: 'absolute',
                    top: 25,
                    left: 5,
                    zIndex: 10,
                }} >
                    <MenuIcon sx={{ color: state.theme?.color, fontSize: '30px' }} />
                </Button>

                <Drawer sx={{
                    position: 'absolute',
                    zIndex: 999999
                }} open={isVisible} onClose={() => handleToggle(false)} PaperProps={{
                    sx: {
                        backgroundColor: state.theme?.backgroundColor,


                    }
                }}>
                    <Box sx={{ minWidth: 350, }} role="presentation" onClick={() => handleToggle(false)}>
                        <List sx={{ background: state.theme?.backgroundColor, }}>

                            <ListItem>

                                <Typography sx={{ color: state.theme?.color, fontSize: '20px', fontWeight: "700" }} >Weather App 1.0 </Typography>
                            </ListItem>
                            <Divider sx={{ bgcolor: state.theme.colorMode === "dark" ? "#36324f" : "" }} />
                            <Link style={{ textDecoration: 'none' }} to="/" >
                                <ListItem
                                    style={lsitItemStyle}>
                                    <ListItemIcon  >
                                        <HomeOutlinedIcon sx={{ color: state.theme?.color }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" sx={{ color: state.theme?.color }} />
                                </ListItem>
                            </Link>

                            <Divider sx={{ bgcolor: state.theme.colorMode === "dark" ? "#36324f" : "" }} />
                            <Link style={{ textDecoration: 'none' }} to="/location" >
                                <ListItem style={lsitItemStyle}>
                                    <ListItemIcon>
                                        <LocationOnOutlinedIcon sx={{ color: state.theme?.color }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Current weather" sx={{ color: state.theme?.color }} />
                                </ListItem>
                            </Link>
                            <Divider sx={{ bgcolor: state.theme.colorMode === "dark" ? "#36324f" : "" }} />

                        </List>
                    </Box>
                </Drawer>

            </div>
        </div >

    )
}


export default Navigation