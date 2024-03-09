import React from "react";

export default function TimeseriesComponent({DateTime, ENTSOE_DE_DAM_Price, ENTSOE_GR_DAM_Price, ENTSOE_FR_DAM_Price}) {

    return (
        <div>
            <p>Date and time: {DateTime}</p>
            <p>Price in Denmark: {ENTSOE_DE_DAM_Price} 	\u20A0</p>
            <p>Price in Greece: {ENTSOE_GR_DAM_Price}</p>
            <p>Price in France: {ENTSOE_FR_DAM_Price}</p>
        </div>
    );
};
