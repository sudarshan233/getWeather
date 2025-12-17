import {useState} from "react";

import WeatherButton from "./WeatherButton.tsx";
import WeatherHeader from "./WeatherHeader.tsx";
import Forecast from "./Forecast.tsx";
import ToggleButton from "./ToggleButton.tsx";
import Graph from "./Graph.tsx";

import {
    Wind, Droplets, CloudRain, Flower, ArrowBigLeft, ArrowBigRight,
} from "lucide-react";

import { TbUvIndex } from "react-icons/tb";
import { LiaTemperatureHighSolid } from "react-icons/lia";

import type {DashArcProps} from "../models/DashArc.types.ts";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import PollenLegend from "./PollenLegend.tsx";

const DashArc = (props: DashArcProps ) => {
    const {
        forecastData, currentData, loading
    } = props;

    const [metric, setMetric] = useState<string>('°C');
    const [moveStat, setMoveStat] = useState<string>('Forecast');
    const [leftArrowColour, setLeftArrowColour] = useState<string>('stroke-zinc-500');
    const [rightArrowColour, setRightArrowColour] = useState<string>('stroke-accent');

    const buttons = ['Temperature', 'Wind Speed', 'Humidity', 'Precipitation',
        'UV Index', 'Pollen'
    ]
    const position = [
        '-top-6', 'top-28 right-6', 'bottom-28 right-6',
        '-bottom-6', 'bottom-28 left-6', 'top-28 left-6'
    ]
    const icons: React.ComponentType<any>[]  = [
        LiaTemperatureHighSolid, Wind, Droplets, CloudRain, TbUvIndex, Flower
    ]
    const [activeButton, setActiveButton] = useState<string | null>(null)

    const activateButton = (name: string) => {
        setActiveButton(
            (prevState) => prevState === name ? null : name
        )
    }
    return (
        <div className='bg-accent rounded-full flex items-center justify-center
        w-[200px] h-[200px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px]
        relative'>
            {
                buttons.map((name: string, index: number) => (
                    <WeatherButton
                        key={index} index={index} name={name}
                        position={position[index]}
                        icon={icons[index]}
                        isActive={activeButton === name}
                        activateButton ={activateButton}
                    />
                ))
            }
            <div className='bg-dark-primary rounded-full
            w-[190px]  h-[190px] md:w-[390px] md:h-[390px] lg:w-[595px] lg:h-[595px]
            flex justify-center py-28'>
                {loading ? <DotLottieReact
                src='https://lottie.host/268ccfa9-6ec2-4c25-9b12-0f297f97a724/56tW4uDt3l.lottie'
                loop autoplay
                className='drop-shadow-sm'/> : activeButton === null ?
                <p className='text-sm text-placeholder self-center'>Choose a weather stat</p>
                : <section className='w-full h-full flex items-center flex-col
                transition-all duration-500'>
                        <WeatherHeader weatherStat={activeButton} forecastData={forecastData}
                                       currentData={currentData} metric={metric}
                                       icon={icons[buttons.indexOf(activeButton)]} />

                        <div className='h-3/4 w-full flex flex-row px-4 items-center'>
                            <button onClick={() => {
                                setMoveStat((prevState) => {
                                    if (prevState === 'Graph') {
                                        setLeftArrowColour('stroke-zinc-500');
                                        setRightArrowColour('stroke-accent');
                                        return 'Forecast'
                                    }
                                    return prevState;
                                })
                            }}>
                                <ArrowBigLeft className={`${leftArrowColour}`}/>
                            </button>
                            {moveStat === 'Forecast' ?
                                <Forecast
                                    forecastData={forecastData} metric={metric}
                                    weatherStat={activeButton} /> :
                                <div className='w-full h-full flex items-center'>
                                    <Graph forecastData={forecastData}
                                               weatherStat={activeButton}
                                               metric={metric}/>
                                </div>
                            }
                            <button onClick={() => {
                                setMoveStat((prevState) => {
                                    if (prevState === 'Forecast'){

                                        setLeftArrowColour('stroke-accent');
                                        setRightArrowColour('stroke-zinc-500')
                                        return 'Graph'
                                    }

                                    return prevState;
                                })
                            }}>
                                <ArrowBigRight className={`${rightArrowColour}`}/>
                            </button>
                        </div>
                            {activeButton === 'Temperature' ? <ToggleButton
                            setMetric={setMetric}/>: null}
                            {activeButton === 'Pollen' ? <PollenLegend /> : null}
                    </section>}
            </div>
        </div>
    );
};

export default DashArc;