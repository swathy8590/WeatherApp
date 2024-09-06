import React, { useContext, useEffect } from 'react'
import { Context } from '../../../pages/home/Home';

const WeatherWidget = () => {
    const { state, dispatch } = useContext(Context);

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

    }, [state])

    return (
        <div style={{
            position: 'absolute', bottom: 0, zIndex: 9999, width: '60%', left: '100px'
        }}> <div className="tomorrow"
            data-location-id=""
            data-language="EN"
            data-unit-system="METRIC"
            data-skin={"light"}
            data-widget-type="upcoming"
            style={{ paddingBottom: '22px', position: 'relative', }}
        >

            </div> </div>
    )
}

export default WeatherWidget