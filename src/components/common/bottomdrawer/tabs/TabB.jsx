import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Context } from '../../../../pages/home/Home';
import LineChart from '../../chart/linechart/LineChart';
import moment from 'moment';
import { createTheme, Fab, styled, ThemeProvider, ToggleButtonGroup, Typography } from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { WiDayCloudy, WiDaySunny, WidDayCloudy } from 'weather-icons-react';

const TabB = () => {
    const { state, dispatch } = useContext(Context);

    const [value, setValue] = useState('1');
    const [innerValue, setInnerValue] = useState(1);
    const [chartListToggle, setChartListToggle] = useState(true)
    const [view, setView] = useState('list');


    const handleChanges = (event, nextView) => {
        setView(nextView);
        setChartListToggle(!chartListToggle)
    };


    // const chartListToggler = (e) => {

    //     // console.log(e.target.id)
    //     // e.target.id && e.target.id === 'chart' ? e.target.style.background = 'blue' : e.target.style.background = ''
    //     //     ||
    //     //     e.target.id && e.target.id === 'list' ? e.target.style.background = 'green' : e.target.style.background = ''
    // }



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeInner = (event, newInnerValue) => {
        setInnerValue(newInnerValue);


    };


    const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: selectedColor,
        },
    }));

    const theme = createTheme({
        palette: {
            text: {
                primary: '#00ff00',
            },
        },
    });
    console.log(typeof innerValue)

    return (
        <div>


            <Box sx={{ width: '100%', typography: 'body1', background: "rgba(255, 255, 255, 0)" }}>
                <TabContext value={value} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', color: state.theme.color }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Daily" value="1" sx={{ color: state.theme.color }} />
                            <Tab label="Hourly" value="2" sx={{ color: state.theme.color }} />
                            <Tab label="minutely" value="3" sx={{ color: state.theme.color }} />
                        </TabList>
                    </Box>
                    <Box
                        sx={{
                            px: 2,
                            pb: 2,
                            height: '500px',
                            overflow: 'auto',
                            background: "rgba(255, 255, 255, 0)",
                            color: state.theme.color,
                            border: '1px solid #C5C5C5',
                        }}
                    >
                        <TabPanel value="1">
                            <Box sx={{ width: '100%', typography: 'body1', background: "rgba(255, 255, 255, 0)" }}>
                                <TabContext value={innerValue}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', color: state.theme.color }}>
                                        <TabList onChange={handleChangeInner} aria-label="lab API tabs example">

                                            {Object.keys(state && state.api.weatherData !== "" && state?.api.weatherData?.daily[0]?.values).map((value, index) => <Tab variant="scrollable"
                                                scrollButtons="auto" label={value} value={index + 1} sx={{ color: state.theme.color }} />)}
                                        </TabList>
                                    </Box>
                                    <Box
                                        sx={{
                                            px: 2,
                                            pb: 2,
                                            height: '500px',
                                            overflow: 'auto',
                                            background: "rgba(255, 255, 255, 0)",
                                            color: state.theme.color,
                                        }}
                                    >
                                        {Object.keys(state && state.api.weatherData !== "" && state?.api.weatherData?.daily[0]?.values).map((value, index) => <TabPanel value={index + 1} key={index}>
                                            <Box sx={{ paddingBottom: '100px' }}>
                                                <ThemeProvider theme={theme}>
                                                    <ToggleButtonGroup
                                                        orientation="vertical"
                                                        value={view}
                                                        exclusive
                                                        onChange={handleChanges}
                                                        sx={{
                                                            position: 'absolute',
                                                            left: '10px',
                                                            border: state.theme.color,
                                                            selected: {
                                                                "&&": {
                                                                    backgroundColor: "red",
                                                                    color: "white"
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <ToggleButton value="list" aria-label="list" selectedColor={state.theme.selectColor} sx={{ background: state.theme.color }} onClick={handleChanges}>
                                                            <ListAltIcon sx={{ color: state.theme.backgroundColor }} />
                                                        </ToggleButton>

                                                        <ToggleButton value="module" aria-label="module" selectedColor={state.theme.selectColor} sx={{ background: state.theme.color }} onClick={handleChanges}>
                                                            <InsertChartIcon sx={{ color: state.theme.backgroundColor }} />
                                                        </ToggleButton>
                                                    </ToggleButtonGroup>

                                                </ThemeProvider>


                                                {chartListToggle ? <>
                                                    {state && state.api.weatherData !== "" && state?.api.weatherData?.daily.map((val, indx) => <Box sx={{ display: "flex", fontSize: '17px', gap: '20px', maxHeight: '35px', padding: 0, margin: 0 }} >
                                                        <Typography>{moment(val.time).format(" DD/ MM/ yy")}</Typography>   <Typography>{moment(val.time).format("dddd")} -</Typography>
                                                        {/* <Typography></Typography>{val.values[value] === 0 ? <WiDaySunny size={27} color={'#1492E6'} /> : <WiDayCloudy size={27} color={'#1492E6'} />} */}
                                                        <Typography>{val.values[value]} </Typography>
                                                    </Box>)}</> : <>
                                                    {<LineChart dataType={"daily"}
                                                        chartVal={state && state.api.weatherData !== "" && state.api.weatherData}

                                                        value={value}
                                                    />}</>}
                                            </Box>

                                        </TabPanel>)}
                                    </Box>
                                </TabContext>
                            </Box>
                        </TabPanel>


                        <TabPanel value="2">
                            <Box sx={{ width: '100%', typography: 'body1', background: "rgba(255, 255, 255, 0)" }}>
                                <TabContext value={innerValue}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', color: state.theme.color }}>
                                        <TabList onChange={handleChangeInner} aria-label="lab API tabs example">

                                            {Object.keys(state && state.api.weatherData !== "" && state?.api.weatherData?.hourly[100]?.values).map((hValue, hIndx) => <Tab variant="scrollable"
                                                scrollButtons="auto" label={hValue} index={hIndx + 1} sx={{ color: state.theme.color }} />)}

                                        </TabList>


                                    </Box>
                                    <Box
                                        sx={{
                                            px: 2,
                                            pb: 2,
                                            height: '500px',
                                            overflow: 'auto',
                                            background: "rgba(255, 255, 255, 0)",
                                            color: state.theme.color,
                                        }}
                                    >
                                        {Object.keys(state && state.api.weatherData !== "" && state.api.weatherData.hourly[100].values).map((hValue, hIndx) => <TabPanel value={hIndx} key={hIndx} >

                                            <Box>
                                                <ThemeProvider theme={theme}>
                                                    <ToggleButtonGroup
                                                        orientation="vertical"
                                                        value={view}
                                                        exclusive
                                                        onChange={handleChanges}
                                                        sx={{
                                                            position: 'absolute',
                                                            left: '10px',
                                                            border: state.theme.color,
                                                            selected: {
                                                                "&&": {
                                                                    backgroundColor: "red",
                                                                    color: "white"
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <ToggleButton value="list" aria-label="list" selectedColor={state.theme.selectColor} sx={{ background: state.theme.color }} onClick={handleChanges}>
                                                            <ListAltIcon sx={{ color: state.theme.backgroundColor }} />
                                                        </ToggleButton>

                                                        <ToggleButton value="module" aria-label="module" selectedColor={state.theme.selectColor} sx={{ background: state.theme.color }} onClick={handleChanges}>
                                                            <InsertChartIcon sx={{ color: state.theme.backgroundColor }} />
                                                        </ToggleButton>
                                                    </ToggleButtonGroup>

                                                </ThemeProvider>
                                                {chartListToggle ? <>
                                                    {state && state.api.weatherData !== "" && state.api.weatherData.hourly.map((hVal, hInx) => <Box sx={{ display: "flex", fontSize: '12px', gap: '20px', fontWeight: 300 }}>
                                                        <Typography sx={{ fontSize: '15px' }}>{moment(hVal.time).format("DD/ MM/ yy")} </Typography><Typography>{moment(hVal.time).format("dddd")} -</Typography><Typography> {hVal.values[hValue]}</Typography></Box>)}</> : <>
                                                    {<LineChart dataType={'hourly'}
                                                        chartVal={state && state.api.weatherData !== "" && state.api.weatherData} value={hValue}
                                                    />}</>}
                                            </Box>
                                        </TabPanel>)}

                                    </Box>




                                </TabContext>
                            </Box>
                        </TabPanel>




                        <TabPanel value="3">
                            <Box sx={{ width: '100%', typography: 'body1', background: "rgba(255, 255, 255, 0)" }}>
                                <TabContext value={innerValue}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', color: state.theme.color }}>
                                        <TabList onChange={handleChangeInner} aria-label="lab API tabs example">

                                            {Object.keys(state && state.api.weatherData !== "" && state?.api.weatherData?.minutely[0].values).map((minValue, minIndex) => <Tab label={minValue} sx={{ color: state.theme.color }} variant="scrollable"
                                                scrollButtons="auto" />)}

                                        </TabList>


                                    </Box>
                                    <Box
                                        sx={{
                                            px: 2,
                                            pb: 2,
                                            height: '500px',
                                            overflow: 'auto',
                                            background: "rgba(255, 255, 255, 0)",
                                            color: state.theme.color,
                                            // border: '1px solid #C5C5C5',
                                        }}
                                    >
                                        {Object.keys(state && state.api.weatherData !== "" && state?.api.weatherData?.minutely[0].values).map((minValue, minIndex) => <TabPanel value={minIndex} key={minIndex} sx={{ color: state.theme.color }} >

                                            <Box>


                                                <ThemeProvider theme={theme}>
                                                    <ToggleButtonGroup
                                                        orientation="vertical"
                                                        value={view}
                                                        exclusive
                                                        onChange={handleChanges}
                                                        sx={{
                                                            position: 'absolute',
                                                            left: '10px',
                                                            border: state.theme.color,
                                                            selected: {
                                                                "&&": {
                                                                    backgroundColor: "red",
                                                                    color: "white"
                                                                }
                                                            }
                                                        }}

                                                    >
                                                        <ToggleButton value="list" aria-label="list" selectedColor={state.theme.selectColor} sx={{ background: state.theme.color }} onClick={handleChanges}>
                                                            <ListAltIcon sx={{ color: state.theme.backgroundColor }} />
                                                        </ToggleButton>

                                                        <ToggleButton value="module" aria-label="module" selectedColor={state.theme.selectColor} sx={{ background: state.theme.color }} onClick={handleChanges}>
                                                            <InsertChartIcon sx={{ color: state.theme.backgroundColor }} />
                                                        </ToggleButton>
                                                    </ToggleButtonGroup>

                                                </ThemeProvider>

                                                {chartListToggle ? <>
                                                    {state && state.api.weatherData !== "" && state?.api.weatherData?.minutely.map((minVal, minIndx) =>


                                                        <Box sx={{ display: "flex", fontSize: '17px', gap: '10px' }}>
                                                            <Typography>{moment(minVal.time).format("DD/ MM/ yy")}</Typography><Typography>{moment(minVal.time).format("dddd")} -</Typography> <Typography>{minVal.values[minValue]}</Typography>

                                                        </Box>
                                                    )}</> : <>
                                                    {<LineChart dataType={'minutely'}
                                                        chartVal={state && state.api.weatherData !== "" && state.api.weatherData} value={minValue}
                                                    />}</>}



                                            </Box>


                                        </TabPanel>)}

                                        {/* <TabPanel value="2"><LineChart stateType="daily" /></TabPanel> */}
                                    </Box>




                                </TabContext>
                            </Box>
                        </TabPanel>

                    </Box>
                </TabContext>
            </Box >
        </div >

    );
};

export default TabB;