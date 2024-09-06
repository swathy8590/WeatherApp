import React, { useContext, useEffect } from 'react'


const PollenWidgetDark = () => {


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

            <div style={{ paddingBottom: "22px", color: '#000000', paddingTop: '40px' }}>
                <p style={{
                    fontSize: '16px', color: '#ffffff'
                }}>Air Quality and Pollen</p>
                <div className="tomorrow"
                    data-location-id="131617"
                    data-language="EN"
                    data-unit-system="METRIC"
                    data-skin="dark"
                    data-widget-type="aqiPollen"

                >

                </div>
            </div>

        </>
    )
}

export default PollenWidgetDark