import {useState} from "react";
import type {ToggleButtonProps} from "../models/DashArc.types.ts";

const ToggleButton = (props: ToggleButtonProps) => {
    const[buttonPosition, setButtonPosition] = useState('justify-start');
    const {
        setMetric
    } = props
    return (
        <div className='w-full rounded-lg
        flex items-center justify-center gap-2'>
            <span className='text-base text-primary'>°C</span>
            <div className={`flex ${buttonPosition} items-center w-12 h-6 bg-dark-secondary rounded-lg
            px-1`}>
                <button className='size-4 rounded-full bg-accent'
                onClick={() => {
                    setButtonPosition((prevState) => {
                        if(prevState === 'justify-start') {
                            setMetric('°F')
                            return 'justify-end'
                        }
                        setMetric('°C')
                        return "justify-start"
                    });
                }}></button>
            </div>
            <span className='text-base text-primary'>°F</span>
        </div>
    );
};

export default ToggleButton;