import type { CurrentDataProps } from "./DashArc.types"

export interface SidebarProps {
    search: string,
    setSearch: (search: string) => void,
    loading: boolean,
    getWeather: (city: string) => void,
    forecastWeather: (city: string) => void
    currentData: CurrentDataProps | null
}

export interface MiniWeatherBarProps {
    currentData: CurrentDataProps | null
    city: string
    loading: boolean
}