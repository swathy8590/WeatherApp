import React, { useContext, useEffect } from 'react'
import { Context } from 'react-responsive';

const FireRiskDark = () => {


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


            <div style={{ paddingBottom: "22px", color: '#ffffff', width: "250px" }}  >
                <p style={{ textAlign: 'center', fontSize: '20px' }}>Fire Risk Index</p>
                <div className="tomorrow"
                    data-location-id="131617,131617,131617,131617,131617,131617"
                    data-language="EN"
                    data-unit-system="METRIC"
                    data-skin="dark"
                    data-widget-type="fire"
                >

                </div>
            </div>




        </>
    )
}

export default FireRiskDark