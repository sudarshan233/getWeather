import { Calendar, Leaf, Wheat } from 'lucide-react'
import type { MiniWeatherBarProps } from '../models/App.types'
import { LiaTemperatureHighSolid } from 'react-icons/lia'
import { describeDay, generateTips} from '../lib/helpers'
import { GiBirchTrees, GiGrass, GiOlive, GiTumbleweed } from 'react-icons/gi'

const MiniWeatherBar = (props: MiniWeatherBarProps) => {
    const { currentData, city, loading } = props
    if(!loading) {
        if(!currentData) return <></>
        return(
            <div className='flex flex-col h-full w-full items-start gap-8
            overflow-y-auto'>

                <div className='flex gap-4 flex-wrap mt-4
                hover:bg-dark-tertiary rounded-lg bg-dark-secondary transition-colors
                p-2'>
                    <h2 className='text-4xl text-primary justify-start'>{city}</h2>

                    <div className='w-full flex gap-2 items-center'>
                        <Calendar className='size-8' />
                        <span className='text-xl text-primary'>
                            {new Date().toLocaleDateString('en-GB', {
                                day: "2-digit",
                                month: "long",
                                year: "numeric"
                            })}
                        </span>
                    </div>

                    <div className='w-full flex gap-1 items-center'>
                        <LiaTemperatureHighSolid className='size-10' />
                        <span className='text-xl text-primary'>
                            {Math.ceil(currentData?.currentTemperature)}°C
                        </span>
                    </div>
                </div>

                <div className='mt-4 flex gap-6 flex-wrap justify-evenly p-2
                hover:bg-dark-tertiary rounded-lg bg-dark-secondary transition-colors'>
                    <div className='flex items-center justify-center gap-1'>
                        <Wheat className='size-10'/>
                        <span className='text-2xl text-primary'>
                            {
                                currentData.currentPollenData.alder_pollen === null ? 0 :
                                currentData.currentPollenData.alder_pollen
                            }
                        </span>
                    </div>

                    <div className='flex items-center justify-center gap-1'>
                        <GiBirchTrees className='size-10'/>
                        <span className='text-2xl text-primary'>
                            {
                                currentData.currentPollenData.birch_pollen === null ? 0 :
                                currentData.currentPollenData.birch_pollen
                            }
                        </span>
                    </div>

                    <div className='flex items-center justify-center gap-1'>
                        <GiGrass className='size-10'/>
                        <span className='text-2xl text-primary'>
                            {
                                currentData.currentPollenData.grass_pollen === null ? 0 :
                                currentData.currentPollenData.grass_pollen
                            }
                        </span>
                    </div>

                    <div className='flex items-center justify-center gap-1 '>
                        <GiTumbleweed className='size-10'/>
                        <span className='text-2xl text-primary'>
                            {
                                currentData.currentPollenData.ragweed_pollen === null ? 0 :
                                currentData.currentPollenData.ragweed_pollen
                            }
                        </span>
                    </div>

                    <div className='flex items-center justify-center gap-1'>
                        <GiOlive className='size-10'/>
                        <span className='text-2xl text-primary'>
                            {
                                currentData.currentPollenData.olive_pollen === null ? 0 :
                                currentData.currentPollenData.olive_pollen
                            }
                        </span>
                    </div>
                    <div className='flex items-center justify-center gap-1'>
                        <Leaf className='size-10'/>
                        <span className='text-2xl text-primary'>
                            {
                                currentData.currentPollenData.mugwort_pollen === null ? 0 :
                                currentData.currentPollenData.mugwort_pollen
                            }
                        </span>
                    </div>
                </div>

                <div className='flex flex-col gap-6 mt-8 justify-self-end'>
                    <span className='text-base text-primary'>
                        {describeDay(currentData)}
                    </span>
                    <span className='text-base text-primary'>
                        {generateTips(currentData)}
                    </span>
                </div>
            </div>
        )
    }
    return <></>
}

export default MiniWeatherBar