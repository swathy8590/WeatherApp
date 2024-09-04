import React, { useContext, useState } from "react";
import { styled } from '@mui/material/styles';
import { Box, ListItemIcon, Divider, IconButton, List, ListItem, ListItemText } from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { Context } from "../../../pages/home/Home";
import { Link } from "react-router-dom";



const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme?.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function SideDrawer() {
    const { state, dispatch } = useContext(Context)

    const lsitItemStyle = { paddingLeft: "22px" }
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <> <Box sx={{ display: 'flex', background: state.theme?.backgroundColor, zIndex: 999 }}>
            <Drawer variant="permanent" open={open} PaperProps={{
                sx: {
                    backgroundColor: state.theme?.backgroundColor,



                }
            }}   >
                <DrawerHeader sx={{ background: state.theme?.backgroundColor, color: '#ffffff', justifyContent: 'center' }}>

                    {open !== true ? <IconButton color="primary" onClick={handleDrawerOpen} >
                        <MenuIcon sx={{ color: state.theme?.color }} />
                    </IconButton> :
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon sx={{ color: state.theme?.color }} />
                        </IconButton>}

                </DrawerHeader >
                <Divider sx={{ background: state.theme?.borderColor }} />
                <List sx={{ background: state.theme?.backgroundColor, }}>

                    <Link style={{ textDecoration: 'none' }} to="/" >
                        <ListItem onMouseOver={handleDrawerOpen} onMouseLeave={handleDrawerClose}
                            style={lsitItemStyle}>
                            <ListItemIcon  >
                                <HomeOutlinedIcon sx={{ color: state.theme?.color }} />
                            </ListItemIcon>
                            <ListItemText primary="Home" sx={{ color: state.theme?.color }} />
                        </ListItem>
                    </Link>

                    <Divider sx={{ background: state.theme?.borderColor }} />
                    <Link style={{ textDecoration: 'none' }} to="/location" >
                        <ListItem onMouseOver={handleDrawerOpen} onMouseLeave={handleDrawerClose} style={lsitItemStyle}>
                            <ListItemIcon>
                                <LocationOnOutlinedIcon sx={{ color: state.theme?.color }} />
                            </ListItemIcon>
                            <ListItemText primary="Current weather" sx={{ color: state.theme?.color }} />
                        </ListItem>
                    </Link>
                    <Divider sx={{ background: state.theme?.borderColor }} />

                </List>

            </Drawer>

        </Box>


        </>
    );
}

export default SideDrawer