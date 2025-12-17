export interface WeatherButtonProps {
    index?: number
    name: string
    position: string
    icon: React.ComponentType<any>
    activateButton: (name: string) => void
    isActive: boolean
}

export interface DashArcProps {
    forecastData: ForecastDataProps | null
    currentData: CurrentDataProps | null
    loading: boolean
}

export interface ForecastProps {
    forecastData: ForecastDataProps | null,
    metric: string,
    weatherStat: string
}

export interface CurrentDataProps {
    "timestamp": string
    "currentTemperature": number,
    "currentHumidity": number,
    "currentWindSpeed": number,
    "currentPrecipitation": number,
    "currentPollenData": {
        "alder_pollen": number | null,
        "birch_pollen": number | null,
        "grass_pollen": number | null,
        "mugwort_pollen": number | null,
        "ragweed_pollen": number |null,
        "olive_pollen": number | null
    }
}

export interface GraphProps {
    forecastData: ForecastDataProps | null,
    weatherStat: string,
    metric: string
}

export interface ForecastDataProps {
    timestamps: string[]
    maxTemperature: object,
    minTemperature: object,
    meanTemperature: object,
    maxWindSpeed: object,
    minWindSpeed: object,
    meanWindSpeed: object,
    maxHumidity: object,
    minHumidity: object,
    meanHumidity: object,
    uvIndex: object,
    precipitation: number[],
    forecastPollenData: {
        timeStamps: string[],
        "alder_pollen": object,
        "birch_pollen": object,
        "grass_pollen": object,
        "mugwort_pollen": object,
        "ragweed_pollen":object,
        "olive_pollen": object
    }

}

export interface WeatherHeaderProps {
    currentData: CurrentDataProps | null,
    forecastData?: ForecastDataProps | null
    metric?: string,
    icon: React.ComponentType<any>
    weatherStat: string
}

export interface ToggleButtonProps {
    setMetric: (metric: string) => void
}

export interface WeatherIndexProps {
    weatherStat: string
    value: string
}