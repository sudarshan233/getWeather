import type {WeatherIndexProps} from "../models/DashArc.types.ts";
import {useEffect, useState} from "react";
import {fetchColourIndex, fetchIndex} from "../lib/helpers.ts";

const WeatherIndex = (props: WeatherIndexProps) => {
    const {
        weatherStat, value
    } = props;
    const [weatherClass, setWeatherClass] = useState('')
    const [style, setStyle] = useState('')
    useEffect(() => {
        const index = fetchIndex(weatherStat, value);
        setWeatherClass(index)
        setStyle(fetchColourIndex(index))
    }, [weatherStat, value])
    return (
        <div className='flex gap-1 items-center mt-2'>
            <div className={`size-2 rounded-full ${style}`}></div>
            <span className='text-sm text-primary'>{weatherClass}</span>
        </div>
    );
};

export default WeatherIndex;
