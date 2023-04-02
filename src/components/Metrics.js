import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function MetricsDisplay({data, yaxis, xaxis}){
    let sortedData = data.sort((a, b) =>{
        let dateA = new Date(a.retrieved_date);
        let dateB = new Date(b.retrieved_date);
        console.log(dateA > dateB);
        return dateA < dateB ? -1 : 1;
    } )
    console.log(sortedData);
    console.log(data);
    return (
        <>
            <LineChart width={700} height={300} data={sortedData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Legend verticalAlign="top" height={36}/>
                <Line name=""type="monotone" dataKey={yaxis} stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey={xaxis} />
                <YAxis domain = {['dataMin - 100', 'dataMax + 100']}/>
                <Tooltip />
            </LineChart>
        </>
    )
}
export default MetricsDisplay;