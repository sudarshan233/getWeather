import {
    Search
} from 'lucide-react'
import type {SidebarProps} from "../models/App.types.ts";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {useState} from "react";
import MiniWeatherBar from './MiniWeatherBar.tsx';

const Sidebar = (props: SidebarProps) => {
    const { search, setSearch, getWeather, forecastWeather, loading,
        currentData
     } = props;
    const [submittedSearch, setSubmittedSearch] = useState<boolean>(false);
    const [city, setCity] = useState('')
    return (
        <div className='w-1/4 h-full bg-dark-secondary
        p-2 md:p-4 rounded-tr-lg rounded-br-lg
        flex flex-col items-center'>
            <div className="flex justify-between items-center
            bg-dark-primary rounded-lg py-2 px-4 w-full">
                <input type={'text'} placeholder={'Search City'}
                       className="bg-dark-primary outline-0 text-primary w-full"
                onChange={
                    (e) => setSearch(e.target.value)
                }
                onKeyDown={(event) =>{
                    if (event.key === 'Enter') {
                        getWeather(search);
                        forecastWeather(search);
                        setSubmittedSearch(true);
                        setCity(search)
                    }
                }}/>
                <Search className={'size-4 stroke-accent'}/>
            </div>
            { loading ? <div className='flex h-full items-center'>
                <DotLottieReact
                    src='https://lottie.host/268ccfa9-6ec2-4c25-9b12-0f297f97a724/56tW4uDt3l.lottie'
                    loop autoplay
                    className='drop-shadow-sm'/>
            </div> : submittedSearch ? <MiniWeatherBar 
            currentData={currentData} city={city} loading={loading}
            /> : <div className='flex h-full items-center'>
                <p className="text-placeholder text-sm">Choose a city</p>
            </div>}
        </div>
    );
};

export default Sidebar;