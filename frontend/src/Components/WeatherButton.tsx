import type {WeatherButtonProps} from "../models/DashArc.types.ts";

const WeatherButton = (props: WeatherButtonProps) => {
    const {
        name,
        position,
        isActive,
        icon: Icon,
        activateButton
    } = props;

    const bgClass =
        isActive ? "bg-accent border-accent" : "bg-dark-secondary border-primary";

    return (
        <div className={`size-100 flex items-center justify-center
        p-4 rounded-lg cursor-pointer border-2 ${bgClass}
        absolute ${position} hover:border-accent transition-all
        duration-500`}
        onClick={() => activateButton(name)}>
            <Icon className='text-2xl'/>
        </div>
    );
};

export default WeatherButton;