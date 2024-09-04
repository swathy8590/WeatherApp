import React, { useContext, useEffect } from 'react'
import { Context } from 'react-responsive';

const AirWidget = () => {



    useEffect(() => {

        (function (d, s, id) {
            if (d.getElementById(id)) {
                if (window.__TOMORROW__) {
                    window.__TOMORROW__.renderWidget();
                }
                return;
            }
            const fjs = d.getElementsByTagName(s)[0];
            const js = d.createElement(s);
            js.id = id;
            js.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";

            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'tomorrow-sdk');

    }, [])
    return (
        <>
            <div style={{ paddingBottom: "22px", color: '#000000', width: "100%" }}>
                <p style={{ fontSize: '16px' }}>Air Quality and Pollutants</p>
                <div className="tomorrow"
                    data-location-id="131617"
                    data-language="EN"
                    data-unit-system="METRIC"
                    data-skin="light"
                    data-widget-type="aqiPollutant"

                >

                </div>
            </div>
        </>
    )
}

export default AirWidget