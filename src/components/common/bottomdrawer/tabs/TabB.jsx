import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Context } from '../../../../pages/home/Home';
import LineChart from '../../chart/linechart/LineChart';
import moment from 'moment';
import { createTheme, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, ToggleButtonGroup, Typography } from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ListAltIcon from '@mui/icons-material/ListAlt';

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

    return (
        <div>


            <Box sx={{ width: '100%', typography: 'body1', background: "rgba(255, 255, 255, 0)" }}>
                <TabContext value={value}
                >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', color: "#E1E1E1" }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{
                            ".Mui-selected": {
                                fontWeight: "700",
                                color: "#343746"
                            },
                        }}
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#343746"
                                }
                            }}
                        >
                            <Tab scrollButtons={"on"} label="Daily" value="1" sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#343746" }} />
                            <Tab scrollButtons={"on"} label="Hourly" value="2" sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#343746" }} />
                            <Tab scrollButtons={"on"} label="minutely" value="3" sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#343746" }} />
                        </TabList>
                    </Box>
                    <Box
                        sx={{
                            px: 2,
                            pb: 2,
                            height: '500px',
                            overflow: 'auto',
                            background: "rgba(255, 255, 255, 0)",
                            color: "#E1E1E1",
                        }}
                    >
                        <TabPanel value="1">
                            <Box sx={{ width: '100%', typography: 'body1', background: "rgba(255, 255, 255, 0)" }}>
                                <TabContext value={innerValue}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', color: "#E1E1E1" }}>
                                        <TabList onChange={handleChangeInner} aria-label="lab API tabs example" sx={{
                                            ".Mui-selected": {
                                                fontWeight: "700",
                                                color: "#343746"
                                            },
                                        }}
                                            TabIndicatorProps={{
                                                style: {
                                                    backgroundColor: "#343746"
                                                }
                                            }}
                                        >

                                            {Object.keys(state && state.api.weatherData !== "" && state?.api.weatherData?.daily[0]?.values).map((value, index) => <Tab variant="scrollable"
                                                scrollButtons="on" label={value} value={index + 1} sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#343746" }} />)}
                                        </TabList>
                                    </Box>
                                    <Box
                                        sx={{
                                            px: 2,
                                            pb: 2,
                                            height: '500px',
                                            overflow: 'auto',
                                            background: "rgba(255, 255, 255, 0)",
                                            color: "#343746",
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
                                                                    // backgroundColor: "red",
                                                                    // color: "white"
                                                                }
                                                            }
                                                        }
                                                        }
                                                    >
                                                        <ToggleButton value="list" aria-label="list" selectedColor={state.theme.colorMode === "dark" ? "#BDBEC5" : "#343746"} sx={{ background: state.theme.colorMode === "dark" ? "#343746" : "#BDBEC5" }} onClick={handleChanges}>
                                                            <ListAltIcon sx={{ color: state.theme.backgroundColor }} />
                                                        </ToggleButton>

                                                        <ToggleButton value="module" aria-label="module" selectedColor={state.theme.colorMode === "dark" ? "#BDBEC5" : "#343746"} sx={{ background: state.theme.colorMode === "dark" ? "#343746" : "#BDBEC5" }} onClick={handleChanges}>
                                                            <InsertChartIcon sx={{ color: state.theme.backgroundColor }} />
                                                        </ToggleButton>
                                                    </ToggleButtonGroup>

                                                </ThemeProvider>
                                                {chartListToggle ? <TableContainer><Table sx={{ maxWidth: 500 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow sx={{ background: state.theme.colorMode === "dark" ? "#20242A" : "#343746" }}>
                                                            <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#ffffff" }}><b>Date</b></TableCell>
                                                            <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#ffffff" }}><b>Day</b></TableCell>
                                                            <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#ffffff" }}><b>Value</b></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {<>
                                                            {state && state.api.weatherData !== "" && state?.api.weatherData?.daily.map((val, indx) =>
                                                                <TableRow sx={{ background: state.theme.colorMode === "dark" ? indx % 2 === 0 ? "#1F2937" : "#374151" : indx % 2 === 0 ? "rgba(255, 255, 255, .4)" : "rgba(238, 238, 238, .9)" }} key={indx}>
                                                                    <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#000000" }}>{moment(val.time).format(" DD/ MM/ yy")}</TableCell>
                                                                    <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#000000" }}>{moment(val.time).format("dddd")}</TableCell>
                                                                    <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#000000" }}>{val.values[value]}</TableCell>
                                                                </TableRow>
                                                            )}</>}



                                                    </TableBody>
                                                </Table></TableContainer> : <>
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
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', color: "#E1E1E1" }}>
                                        <TabList onChange={handleChangeInner} aria-label="lab API tabs example" sx={{
                                            ".Mui-selected": {
                                                fontWeight: "700",
                                                color: "#343746"
                                            },
                                        }}
                                            TabIndicatorProps={{
                                                style: {
                                                    backgroundColor: "#343746"
                                                }
                                            }}
                                        >

                                            {Object.keys(state && state.api.weatherData !== "" && state?.api.weatherData?.hourly[100]?.values).map((hValue, hIndx) => <Tab variant="scrollable"
                                                scrollButtons="on" label={hValue} index={hIndx + 1} sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#343746" }} />)}

                                        </TabList>


                                    </Box>
                                    <Box
                                        sx={{
                                            px: 2,
                                            pb: 2,
                                            height: '500px',
                                            overflow: 'auto',
                                            background: "rgba(255, 255, 255, 0)",
                                            color: "#E1E1E1",
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
                                                        <ToggleButton value="list" aria-label="list" selectedColor={state.theme.colorMode === "dark" ? "#BDBEC5" : "#343746"} sx={{ background: state.theme.colorMode === "dark" ? "#343746" : "#BDBEC5" }} onClick={handleChanges}>
                                                            <ListAltIcon sx={{ color: state.theme.backgroundColor }} />
                                                        </ToggleButton>

                                                        <ToggleButton value="module" aria-label="module" selectedColor={state.theme.colorMode === "dark" ? "#BDBEC5" : "#343746"} sx={{ background: state.theme.colorMode === "dark" ? "#343746" : "#BDBEC5" }} onClick={handleChanges}>
                                                            <InsertChartIcon sx={{ color: state.theme.backgroundColor }} />
                                                        </ToggleButton>
                                                    </ToggleButtonGroup>

                                                </ThemeProvider>
                                                {chartListToggle ? <TableContainer><Table sx={{ maxWidth: 500 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow sx={{ background: state.theme.colorMode === "dark" ? "#20242A" : "#343746" }}>
                                                            <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#ffffff" }}><b>Date</b></TableCell>
                                                            <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#ffffff" }}><b>Day</b></TableCell>
                                                            <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#ffffff" }}><b>Value</b></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody> {<>
                                                        {state && state.api.weatherData !== "" && state.api.weatherData.hourly.map((hVal, hInx) =>
                                                            <TableRow sx={{ background: state.theme.colorMode === "dark" ? hInx % 2 === 0 ? "#1F2937" : "#374151" : hInx % 2 === 0 ? "rgba(255, 255, 255, .4)" : "rgba(238, 238, 238, .9)" }} key={hInx}>
                                                                <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#000000" }}>{moment(hVal.time).format(" DD/ MM/ yy")}</TableCell>
                                                                <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#000000" }}>{moment(hVal.time).format("dddd")}</TableCell>
                                                                <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#000000" }}>{hVal.values[hValue]}</TableCell>
                                                            </TableRow>)}</>} </TableBody>
                                                </Table></TableContainer> : <>
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
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', color: "#E1E1E1" }}>
                                        <TabList onChange={handleChangeInner} aria-label="lab API tabs example" sx={{
                                            ".Mui-selected": {
                                                fontWeight: "700",
                                                color: "#343746"
                                            },
                                        }}
                                            TabIndicatorProps={{
                                                style: {
                                                    backgroundColor: "#343746"
                                                }
                                            }}>

                                            {Object.keys(state && state.api.weatherData !== "" && state?.api.weatherData?.minutely[0].values).map((minValue, minIndex) => <Tab label={minValue} sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#343746" }} variant="scrollable"
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
                                            color: "#E1E1E1",
                                        }}
                                    >
                                        {Object.keys(state && state.api.weatherData !== "" && state?.api.weatherData?.minutely[0].values).map((minValue, minIndex) => <TabPanel value={minIndex} key={minIndex} sx={{ color: "red" }} >

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
                                                        <ToggleButton value="list" aria-label="list" selectedColor={state.theme.colorMode === "dark" ? "#BDBEC5" : "#343746"} sx={{ background: state.theme.colorMode === "dark" ? "#343746" : "#BDBEC5" }} onClick={handleChanges}>
                                                            <ListAltIcon sx={{ color: state.theme.backgroundColor }} />
                                                        </ToggleButton>

                                                        <ToggleButton value="module" aria-label="module" selectedColor={state.theme.colorMode === "dark" ? "#BDBEC5" : "#343746"} sx={{ background: state.theme.colorMode === "dark" ? "#343746" : "#BDBEC5" }} onClick={handleChanges}>
                                                            <InsertChartIcon sx={{ color: state.theme.backgroundColor }} />
                                                        </ToggleButton>
                                                    </ToggleButtonGroup>

                                                </ThemeProvider>

                                                {chartListToggle ? <TableContainer><Table sx={{ maxWidth: 500, }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow sx={{ background: state.theme.colorMode === "dark" ? "#20242A" : "#343746" }}>
                                                            <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#ffffff" }}><b>Date</b></TableCell>
                                                            <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#ffffff" }}><b>Day</b></TableCell>
                                                            <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#ffffff" }}><b>Value</b></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>{<>
                                                        {state && state.api.weatherData !== "" && state?.api.weatherData?.minutely.map((minVal, minIndx) =>
                                                            <TableRow sx={{ background: state.theme.colorMode === "dark" ? minIndx % 2 === 0 ? "#1F2937" : "#374151" : minIndx % 2 === 0 ? "rgba(255, 255, 255, .4)" : "rgba(238, 238, 238, .9)" }} key={minIndx}>
                                                                <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#000000" }}>{moment(minVal.time).format(" DD/ MM/ yy")}</TableCell>
                                                                <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#000000" }}>{moment(minVal.time).format("dddd")}</TableCell>
                                                                <TableCell sx={{ color: state.theme.colorMode === "dark" ? "#ffffff" : "#000000" }}>{minVal.values[minValue]}</TableCell>
                                                            </TableRow>


                                                        )}</>}</TableBody>
                                                </Table></TableContainer> : <>
                                                    {<LineChart dataType={'minutely'}
                                                        chartVal={state && state.api.weatherData !== "" && state.api.weatherData} value={minValue}
                                                    />}</>}



                                            </Box>


                                        </TabPanel>)}
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