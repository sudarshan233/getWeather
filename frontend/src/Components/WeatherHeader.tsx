import type {WeatherHeaderProps} from "../models/DashArc.types.ts";

import { Wheat, Leaf } from 'lucide-react'
import { GiBirchTrees, GiGrass, GiTumbleweed, GiOlive } from "react-icons/gi";

const WeatherHeader = (props: WeatherHeaderProps) => {
    const {
        currentData, metric, icon: Icon, weatherStat, forecastData
    } = props;

    const pollen = ['Alder', 'Birch', 'Grass', 'Mugwort', 'Ragweed', 'Olive']

    if (!currentData?.currentTemperature) return null;

    let displayHeader: string | number = '';

    if (weatherStat === 'Temperature') {
        if(!metric) return null
        displayHeader =
            metric === '°F'
                ? Math.ceil(currentData?.currentTemperature * 1.8 + 32)
                + metric
                : Math.ceil(currentData?.currentTemperature) + metric;
    } else if (weatherStat === 'Wind Speed') {
        displayHeader = `${Math.ceil(currentData.currentWindSpeed)}km/h`;
    } else if (weatherStat === 'Humidity') {
        displayHeader = `${Math.ceil(currentData.currentHumidity)}%`;
    } else if (weatherStat === 'Precipitation') {
        if(!currentData.currentPrecipitation)
            displayHeader = `0 mm`;
        else displayHeader = `${currentData.currentPrecipitation} mm`;
    } else if (weatherStat === 'UV Index') {
        if(!forecastData?.uvIndex) return null;

        const uv: number[] = Object.values(forecastData.uvIndex)
        displayHeader = `${Math.ceil(uv[0])}`
    }

    return (
        <div className='w-[60%] flex items-center justify-center flex-wrap'>
            {weatherStat !== 'Pollen' ?
                <div className='flex items-center justify-center gap-1'>
                    <Icon className='size-12'/>
                    <span className='text-4xl text-primary'>
                        {displayHeader}
                    </span>
            </div> : pollen.map((item) => {
                    if (item === 'Alder') {
                        return (
                            <div className='flex items-center justify-center gap-1 mr-8'>
                                <Wheat className='size-12'/>
                                <span className='text-4xl text-primary'>
                                    {
                                        currentData.currentPollenData.alder_pollen === null ? 0 :
                                            currentData.currentPollenData.alder_pollen
                                    }
                                </span>
                            </div>
                        )
                    } else if (item === 'Birch') {
                        return (
                            <div className='flex items-center justify-center gap-1 mr-8'>
                                <GiBirchTrees className='size-12'/>
                                <span className='text-4xl text-primary'>
                                    {
                                        currentData.currentPollenData.birch_pollen === null ? 0 :
                                            currentData.currentPollenData.birch_pollen
                                    }
                                </span>
                            </div>
                        )
                    } else if (item === 'Grass') {
                        return (
                            <div className='flex items-center justify-center gap-1'>
                                <GiGrass className='size-12'/>
                                <span className='text-4xl text-primary'>
                                    {
                                        currentData.currentPollenData.grass_pollen === null ? 0 :
                                            currentData.currentPollenData.grass_pollen
                                    }
                                </span>
                            </div>
                        )
                    } else if (item === 'Ragweed') {
                        return (
                            <div className='flex items-center justify-center gap-1 mr-8'>
                                <GiTumbleweed className='size-12'/>
                                <span className='text-4xl text-primary'>
                                    {
                                        currentData.currentPollenData.ragweed_pollen === null ? 0 :
                                            currentData.currentPollenData.ragweed_pollen
                                    }
                                </span>
                            </div>
                        )
                    } else if (item === 'Olive') {
                        return (
                            <div className='flex items-center justify-center gap-1'>
                                <GiOlive className='size-12'/>
                                <span className='text-4xl text-primary'>
                                    {
                                        currentData.currentPollenData.olive_pollen === null ? 0 :
                                            currentData.currentPollenData.olive_pollen
                                    }
                                </span>
                            </div>
                        )
                    } else {
                        return (<div className='flex items-center justify-center gap-1 mr-8'>
                            <Leaf className='size-12'/>
                            <span className='text-4xl text-primary'>
                                    {
                                        currentData.currentPollenData.mugwort_pollen === null ? 0 :
                                            currentData.currentPollenData.mugwort_pollen
                                    }
                                </span>
                        </div>)
                    }
            })}
        </div>
    );
};

export default WeatherHeader;