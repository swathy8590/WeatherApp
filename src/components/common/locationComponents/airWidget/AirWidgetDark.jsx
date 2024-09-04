import React, { useContext, useEffect } from 'react'

const AirWidgetDark = () => {


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
            <div style={{ paddingBottom: "22px", color: 'white', width: "100%" }}>
                <p style={{ fontSize: '16px' }}>Air Quality and Pollutants</p>
                <div className="tomorrow"
                    data-location-id="131617"
                    data-language="EN"
                    data-unit-system="METRIC"
                    data-skin="dark"
                    data-widget-type="aqiPollutant"
                >
                </div>
            </div>
        </>
    )
}

export default AirWidgetDark