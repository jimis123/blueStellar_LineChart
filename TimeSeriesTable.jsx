import React from "react";
import Records from './timeseries.json';

export default function TimeSeriesTable() {

    return (
        <div>
            <h2>Table for Given Data</h2>
            <div className="table-wrapper">
            <table className="fl-table">
                <thead>
                <tr>
                    <th>Time and Date</th>
                    <th>Price in Greece:</th>
                    <th>Price in France:</th>
                    <th>Price in Denmark:</th>
                </tr>
                </thead>
                <tbody>
                    {Records.map((data, index) => (
                        <tr key={index}>
                            <td>{new Date(data.DateTime).toLocaleString()}</td>
                            <td>{data.ENTSOE_GR_DAM_Price}</td>
                            <td>{data.ENTSOE_FR_DAM_Price}</td>
                            <td>{data.ENTSOE_DE_DAM_Price}</td>
                        </tr>
                    ))}           
                </tbody>
            </table>
            </div>
        </div>
    );
};
