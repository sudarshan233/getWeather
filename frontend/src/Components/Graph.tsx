import {Area, ComposedChart, Legend, Line, Tooltip, XAxis} from "recharts";
import type {GraphProps} from "../models/DashArc.types.ts";
import {useEffect, useState} from "react";
import { meanDaily } from "../lib/helpers.ts";


const Graph = (props: GraphProps) => {

    const {
        forecastData, weatherStat, metric
    } = props;

    const [stat, setStat] = useState<number[]>([])
    const [dates, setDates] = useState<string[]>([]);

    const [alderPollenStat, setAlderPollenStat] = useState<number[]>([])
    const [birchPollenStat, setBirchPollenStat] = useState<number[]>([])
    const [grassPollenStat, setGrassPollenStat] = useState<number[]>([])
    const [mugwortPollenStat, setMugwortPollenStat] = useState<number[]>([])
    const [ragweedPollenStat, setRagweedPollenStat] = useState<number[]>([])
    const [olivePollenStat, setOlivePollenStat] = useState<number[]>([])

    useEffect(() => {
        if (!forecastData?.timestamps) return;

        setDates(forecastData?.timestamps)
        if(weatherStat === 'Temperature') {
            const meanTemp = Object.values(forecastData.meanTemperature);
            if(metric === '°F') setStat(meanTemp.map(temp => {
                return (temp * 1.8) + 32
            }))
            else setStat(meanTemp)

        } else if (weatherStat === 'Wind Speed') {
            const meanWindSpeed = Object.values(forecastData.meanWindSpeed);
            setStat(meanWindSpeed)

        } else if (weatherStat === 'Humidity') {
            const meanHumidity = Object.values(forecastData.meanHumidity);
            setStat(meanHumidity)

        } else if (weatherStat === 'Precipitation') {
            const precipitation = forecastData.precipitation
            setStat(precipitation)
        } else if (weatherStat === 'UV Index') {
            const uv = Object.values(forecastData.uvIndex)
            setStat(uv)
            console.log(uv)
        } else if (weatherStat === 'Pollen') {
            const alderHourly = Object.values(forecastData.forecastPollenData.alder_pollen);
            setAlderPollenStat(meanDaily(alderHourly));
            // setAlderPollenStat([12, 18, 25, 17, 22])
            
            const birchHourly = Object.values(forecastData.forecastPollenData.birch_pollen);
            setBirchPollenStat(meanDaily(birchHourly));
            // setBirchPollenStat([34, 41, 52, 47, 39])
            
            const grassHourly = Object.values(forecastData.forecastPollenData.grass_pollen);
            setGrassPollenStat(meanDaily(grassHourly));
            // setGrassPollenStat([15, 22, 19, 28, 24])
            
            const mugwortHourly = Object.values(forecastData.forecastPollenData.mugwort_pollen);
            setMugwortPollenStat(meanDaily(mugwortHourly));
            // setMugwortPollenStat([6, 9, 7, 12, 10])
            
            const ragweedHourly = Object.values(forecastData.forecastPollenData.ragweed_pollen);
            setRagweedPollenStat(meanDaily(ragweedHourly));
            // setRagweedPollenStat([21, 29, 25, 31, 28])
            
            const oliveHourly = Object.values(forecastData.forecastPollenData.olive_pollen);
            setOlivePollenStat(meanDaily(oliveHourly));
            // setOlivePollenStat([9, 14, 12, 16, 13])
        }
    },[forecastData, weatherStat, metric])

    if (weatherStat !== "Pollen" && !stat) return null;


    const chartData = stat.map(
        (t: number, index: number) => ({
        day: new Date(dates[index]).toLocaleDateString('en-GB', {
            day: "2-digit",
            month: "2-digit",
        }),
        value: t,
    }));

    const pollenLength = alderPollenStat.length;

    const pollenChartData = dates.slice(0, pollenLength).map((day, index) => ({
        day: new Date(day).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" }),
        alder: alderPollenStat[index],
        birch: birchPollenStat[index],
        grass: grassPollenStat[index],
        mugwort: mugwortPollenStat[index],
        ragweed: ragweedPollenStat[index],
        olive: olivePollenStat[index],
    }));



    const CustomLabel = ({ x, y, value, weatherStat, metric }: any) => {
        let displayValue = ""
        if(weatherStat === 'Temperature') {
            displayValue = metric === '°C' ? Math.ceil(value) + metric : Math.ceil((value * 1.8) + 32) + metric
        } else if(weatherStat === 'Wind Speed') {
            displayValue = Math.ceil(value) + ' km/hr'
        } else if(weatherStat === 'Humidity') {
            displayValue = Math.ceil(value) + ' %'
        } else if(weatherStat === 'Precipitation') {
            displayValue = Math.ceil(value) + ' mm'
        } else if (weatherStat === 'UV Index') {
            displayValue = Math.floor(value).toString()
        }
        return (
            <text
                x={x}
                y={y - 10}   // move label upward (adjust if needed)
                fill="#ccc"
                fontSize={12}
                textAnchor="middle"
            >
                {displayValue}
            </text>
        );
    };

    const data = weatherStat === "Pollen" ? pollenChartData : chartData;

    return (
        <ComposedChart className='px-4 w-full h-[75%] self-center outline-0'
                   responsive data={data}
                   margin={{ left: 30, right: 30, top: 20, bottom: 5 }}>
            <XAxis dataKey="day"/>
            <Tooltip/>
            {weatherStat === 'Pollen' ? 
            (<>
                <Line type='monotone' dataKey="alder"   stroke="#FF6B6B"  name="Alder Pollen" />
                <Line type='monotone' dataKey="birch"   stroke="#FFD93D"  name="Birch Pollen" />
                <Line type='monotone' dataKey="grass"   stroke="#6BCB77"  name="Grass Pollen" />
                <Line type='monotone' dataKey="mugwort" stroke="#4D96FF"  name="Mugwort Pollen" />
                <Line type='monotone' dataKey="ragweed" stroke="#845EC2"  name="Ragweed Pollen" />
                <Line type='monotone' dataKey="olive"   stroke="#FF9671"  name="Olive Pollen" />
            </>)
                    : 
            (<>
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="none"
                    legendType="none"
                    fill="#A8B3BD"
                    style={{
                        opacity: "40%"
                    }}// 20% opacity
                />
                <Line type="monotone" dataKey="value" stroke="#A8B3BD" strokeWidth={2}
                    name={'Mean' + ' ' + weatherStat}
                    label={(props) => <CustomLabel {...props} metric={metric}
                        weatherStat={weatherStat}/>}
                />
            </>)
            }
            <Legend
                align="right"
                wrapperStyle={{
                    fontSize: '12px',
                }}
            />
        </ComposedChart>
    );
};

export default Graph;