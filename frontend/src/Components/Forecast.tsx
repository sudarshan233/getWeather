import type {ForecastProps} from "../models/DashArc.types.ts";
import {useEffect, useState} from "react";
import WeatherIndex from "./WeatherIndex.tsx";
import { meanDaily } from "../lib/helpers.ts";

import { GiBirchTrees, GiGrass, GiTumbleweed, GiOlive } from "react-icons/gi";
import {Wheat, Leaf,} from "lucide-react";

const Forecast = (props: ForecastProps) => {
    const {
        forecastData, metric, weatherStat
    } = props;
    const [min, setMin] = useState<string[]>([]);
    const [max, setMax] = useState<string[]>([]);
    const [values, setValues] = useState<string[]>([]);
    const [dates, setDates] = useState<string[]>([])

    const [alderPollenStat, setAlderPollenStat] = useState<number[]>([])
    const [birchPollenStat, setBirchPollenStat] = useState<number[]>([])
    const [grassPollenStat, setGrassPollenStat] = useState<number[]>([])
    const [mugwortPollenStat, setMugwortPollenStat] = useState<number[]>([])
    const [ragweedPollenStat, setRagweedPollenStat] = useState<number[]>([])
    const [olivePollenStat, setOlivePollenStat] = useState<number[]>([])

    useEffect(() => {
        if (!forecastData?.timestamps) return;
        setDates(forecastData?.timestamps.map(date => {
            return new Date(date).toLocaleDateString('en-GB', {
                day: "2-digit",
                month: "short",
            })
        }))
        if (weatherStat === 'Temperature') {
            if (forecastData?.maxTemperature &&
                forecastData?.minTemperature) {

                const minTemp = Object.values(forecastData.minTemperature)
                const maxTemp = Object.values(forecastData.maxTemperature)

                if(metric === '°F'){
                    console.log(metric)
                    setMin(minTemp.map(temp => {
                        const value = Math.ceil((temp * 1.8) + 32)
                        return value.toString() + metric
                    }));
                    setMax(
                        maxTemp.map(temp => {
                            const value = Math.ceil((temp * 1.8) + 32)
                            return value.toString() + metric
                        })
                    );
                } else {
                    setMin(
                        minTemp.map(temp => {
                            const value = Math.ceil(temp)
                            return value.toString() + metric
                        })
                    );
                    setMax(
                        maxTemp.map(temp => {
                            const value = Math.ceil(temp)
                            return value.toString() + metric
                        })
                    );
                }
            }
        } else if (weatherStat === 'Wind Speed') {
            if (forecastData?.maxWindSpeed &&
                forecastData?.minWindSpeed) {

                const minWindSpeed = Object.values(forecastData.minWindSpeed)
                const maxWindSpeed = Object.values(forecastData.maxWindSpeed)

                setMin(
                    minWindSpeed.map(windSpeed => {
                        const value = Math.ceil(windSpeed)
                        return value.toString() + ' km/hr'
                    })
                );
                setMax(
                    maxWindSpeed.map(windSpeed => {
                        const value = Math.ceil(windSpeed)
                        return value.toString() + ' km/hr'
                    })
                );
            }
        } else if (weatherStat === 'Humidity') {
            if(forecastData?.maxHumidity &&
                forecastData.minHumidity) {

                const minHumidity = Object.values(forecastData.minHumidity)
                const maxHumidity = Object.values(forecastData.maxHumidity)

                setMin(
                    minHumidity.map(humidity => {
                        const value = Math.ceil(humidity)
                        return value.toString() + ' %'
                    })
                )

                setMax(
                    maxHumidity.map(humidity => {
                        const value = Math.ceil(humidity)
                        return value.toString() + ' %'
                    })
                )
            }
        } else if (weatherStat === 'Precipitation') {
            if (forecastData?.precipitation) {
                const precipitation = forecastData?.precipitation

                setValues(
                    precipitation.map(p => {
                        const value = Math.ceil(p)
                        return value.toString() + ' mm'
                    })
                )
            }
        } else if (weatherStat === 'UV Index') {
            if(forecastData?.uvIndex) {
                const uv = Object.values(forecastData.uvIndex)
                setValues(
                    uv.map(u => {
                        const value = Math.floor(u)
                        return value.toString()
                    })
                )
            }
        } else if(weatherStat === 'Pollen') {
            console.log(weatherStat)

            let timeStamps = forecastData.forecastPollenData.timeStamps.map(d => {
                return new Date(d).toLocaleDateString('en-GB', {
                    day: "2-digit",
                    month: "short",
                })
            })
            timeStamps = [...new Set(timeStamps)].slice(0, 5)
            console.log(timeStamps)
            setDates(timeStamps)

            if(!forecastData.forecastPollenData.alder_pollen ||
            !forecastData.forecastPollenData.birch_pollen ||
            !forecastData.forecastPollenData.grass_pollen || 
            !forecastData.forecastPollenData.mugwort_pollen ||
            !forecastData.forecastPollenData.ragweed_pollen ||
            !forecastData.forecastPollenData.olive_pollen) return;

            const alderHourly = Object.values(forecastData.forecastPollenData.alder_pollen);
            setAlderPollenStat(meanDaily(alderHourly));

            const birchHourly = Object.values(forecastData.forecastPollenData.birch_pollen);
            setBirchPollenStat(meanDaily(birchHourly));

            const grassHourly = Object.values(forecastData.forecastPollenData.grass_pollen);
            setGrassPollenStat(meanDaily(grassHourly));

            const mugwortHourly = Object.values(forecastData.forecastPollenData.mugwort_pollen);
            setMugwortPollenStat(meanDaily(mugwortHourly));

            const ragweedHourly = Object.values(forecastData.forecastPollenData.ragweed_pollen);
            setRagweedPollenStat(meanDaily(ragweedHourly));

            const oliveHourly = Object.values(forecastData.forecastPollenData.olive_pollen);
            setOlivePollenStat(meanDaily(oliveHourly));
        }

    }, [forecastData, weatherStat, metric]);

    return (
        <section className='flex justify-evenly w-full h-full'>
            {dates.map((day, index) => {
                return (
                    <div className='h-full w-full flex items-center justify-center'>
                        <div className='flex flex-col items-center justify-center gap-2
                        hover:bg-dark-secondary bg-dark-primary transition-colors rounded-lg'>
                            <span className='text-sm text-primary'>{day}</span>
                            {(() => {
                                // CASE 1 — Temperature, Wind, Humidity
                                if (weatherStat === "Temperature" ||weatherStat === "Wind Speed" ||weatherStat === "Humidity") {
                                    return (
                                        <div className="w-full flex flex-col items-center justify-center gap-2">
                                            <span className="text-sm text-center text-primary">
                                                {max[index]}
                                            </span>
                                            <span className="text-sm text-center text-primary">
                                                {min[index]}
                                            </span>
                                        </div>
                                    );
                                }

                                // CASE 2 — Precipitation, UV Index
                                if (weatherStat === "Precipitation" || weatherStat === "UV Index") {
                                    return (
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <span className="text-sm text-center text-primary">
                                                {values[index]}
                                                <WeatherIndex
                                                    weatherStat={weatherStat}
                                                    value={values[index]}
                                                />
                                            </span>
                                        </div>
                                    );
                                }

                                // CASE 3 — Pollen
                                if (weatherStat === "Pollen") {
                                    return (
                                        <div className="flex flex-col text-primary text-sm text-center gap-1">
                                            <span className="flex gap-1">
                                                <Wheat className="size-4"/>
                                                {alderPollenStat[index]}</span>
                                            <span className="flex gap-1">
                                                <GiBirchTrees className="size-4"/>
                                                {birchPollenStat[index]}</span>
                                            <span className="flex gap-1">
                                                <GiGrass className="size-4"/>
                                                {grassPollenStat[index]}</span>
                                            <span className="flex gap-1">
                                                <Leaf className="size-4"/>
                                                {mugwortPollenStat[index]}</span>
                                            <span className="flex gap-1">
                                                <GiTumbleweed className="size-4"/>
                                                {ragweedPollenStat[index]}</span>
                                            <span className="flex gap-1">
                                                <GiOlive className="size-4"/>
                                                {olivePollenStat[index]}</span>
                                        </div>
                                    );
                                }

                                return null;
                            })()}

                        </div>
                    </div>
                )
            })}
        </section>
    );
};

export default Forecast;