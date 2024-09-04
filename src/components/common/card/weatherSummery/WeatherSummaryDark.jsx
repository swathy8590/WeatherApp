import React from 'react'

const WeatherSummaryDark = () => {

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


    return (
        <div>




            <div class="tomorrow"
                data-location-id="131617"
                data-language="EN"
                data-unit-system="METRIC"
                data-skin="dark"
                data-widget-type="summary"
                style={{ paddingBottom: "10px", position: "relative" }}
            >

            </div>
        </div>
    )
}

export default WeatherSummaryDark