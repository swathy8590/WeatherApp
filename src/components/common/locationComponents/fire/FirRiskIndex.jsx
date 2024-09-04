import { Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { Context } from 'react-responsive';

const FirRiskIndex = () => {


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
            <div style={{ paddingBottom: "22px", color: '#000000', width: "250px" }}>
                <p style={{ textAlign: 'center', fontSize: '20px' }}>Fire Risk Index</p>
                <div class="tomorrow"
                    data-location-id="131617,131617,133024,131517,133210,142001"
                    data-language="EN"
                    data-unit-system="METRIC"
                    data-skin="light"
                    data-widget-type="fire"
                    style={{ paddingBottom: "22px", position: "relative" }}
                >
                    <a
                        href="https://www.tomorrow.io/weather-api/"
                        rel="nofollow noopener noreferrer"
                        target="_blank"
                        style={{ position: "absolute", bottom: 0, transform: "translateX(-50%)", left: "50%" }}
                    >
                        <img
                            alt="Powered by the Tomorrow.io Weather API"
                            src="https://weather-website-client.tomorrow.io/img/powered-by.svg"
                            width="250"
                            height="18"
                        />
                    </a>
                </div>
            </div>

        </>
    )
}

export default FirRiskIndex