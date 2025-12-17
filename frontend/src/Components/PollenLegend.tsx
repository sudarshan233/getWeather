import { GiBirchTrees, GiGrass, GiTumbleweed, GiOlive } from "react-icons/gi";
import {Wheat, Leaf,} from "lucide-react";

export const PollenLegend = () => {
  return (
    <div className="justify-self-end grid grid-cols-3 grid-rows-2w-[50%]">
        <span className="flex justify-center items-center mr-4">
            <Wheat className='size-4 mr-2' />
            <p className="text-xs text-primary">Alder Pollen</p>
        </span>

        <span className="flex justify-center items-center mr-4">
            <GiBirchTrees className='size-4 mr-2' />
            <p className="text-xs text-primary">Birch Pollen</p>
        </span>

        <span className="flex justify-center items-center">
            <GiGrass className='size-4 mr-2' />
            <p className="text-xs text-primary">Grass Pollen</p>
        </span>

        <span className="flex justify-center items-center mr-4">
            <Leaf className='size-4 mr-2' />
            <p className="text-xs text-primary">Mugwort Pollen</p>
        </span>

        <span className="flex justify-center items-center mr-4">
            <GiTumbleweed className='size-4 mr-2' />
            <p className="text-xs text-primary">Ragweed Pollen</p>
        </span>

        <span className="flex justify-center items-center">
            <GiOlive className='size-4 mr-2' />
            <p className="text-xs text-primary">Olive Pollen</p>
        </span>
    </div>

  )
}

export default PollenLegend