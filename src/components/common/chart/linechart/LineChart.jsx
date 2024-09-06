import React, { useContext, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Context } from '../../../../pages/home/Home'
import moment from 'moment'
import { colors } from '@mui/material'

const LineChart = ({ dataType, chartVal, value }) => {
    const { state, dispatch } = useContext(Context);
    const [chartData, setchartData] = useState({ dataValue: [] })
    const [chartDataTime, setchartDataTime] = useState({ dataTime: [] })

    console.log(dataType)

    useEffect(() => {

        if (dataType === 'daily') {
            chartVal && setchartData({ ...chartData, dataValue: chartVal.daily?.map((val, indx) => val.values[value]) })
            setchartDataTime({ ...chartDataTime, dataTime: chartVal.daily?.map((val, indx) => moment(val.time).format(" DD/ MMM/ yy")) })

        } else if (dataType === 'hourly') {
            chartVal && setchartData({ ...chartData, dataValue: chartVal.hourly?.map((val, indx) => val.values[value]) })
            setchartDataTime({ ...chartDataTime, dataTime: chartVal.hourly?.map((val, indx) => moment(val.time).format(" DD/ MMM/ yy")) })
        } else if (dataType === 'minutely') {
            chartVal && setchartData({ ...chartData, dataValue: chartVal.minutely?.map((val, indx) => val.values[value]) })
            setchartDataTime({ ...chartDataTime, dataTime: chartVal.minutely?.map((val, indx) => moment(val.time).format(" DD/ MMM/ yy")) })
        }
    }, [chartVal, value])

    const data = {
        series: [{
            name: `${value}`,
            data: chartData && chartData?.dataValue
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                },
            },
            dataLabels: {
                enabled: true

            },
            stroke: {
                width: [5, 7, 5],
                curve: 'straight',
                dashArray: [0, 8, 5]
            },
            title: {
                text: value,
                align: 'left',
                style: {
                    color: state.theme.color
                }


            },
            legend: {
                tooltipHoverFormatter: function (val, opts) {
                    return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
                }
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6
                }
            },
            xaxis: {
                categories: chartDataTime && chartDataTime?.dataTime,
                labels: {
                    style: {
                        colors: state.theme.color
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: state.theme.color
                    }
                }
            },

            tooltip: {
                y: [
                    {
                        title: {
                            formatter: function (val) {
                                return val + " (mins)"
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                return val + " per session"
                            }
                        }
                    },

                    {
                        title: {
                            formatter: function (val) {
                                return val;
                            }
                        }
                    }
                ]
            },
            grid: {
                borderColor: "#343746"
            }
        },
    }
    return (
        <div style={{ color: 'red' }}> <div id="chart" style={{ color: 'black', marginBottom: '50px' }}>
            <ReactApexChart options={data.options} series={data.series} type="line" height={350} />
        </div></div>
    )
}

export default LineChart