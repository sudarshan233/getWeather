"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPollenForecast = exports.fetchWeatherForecast = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openmeteo_1 = require("openmeteo");
const axios_1 = require("../lib/axios");
const fetchWeatherForecast = async (lat, lon) => {
    const params = {
        latitude: lat,
        longitude: lon,
        daily: ["temperature_2m_max", "temperature_2m_min", "temperature_2m_mean", "wind_speed_10m_max",
            "wind_speed_10m_min", "wind_speed_10m_mean", "relative_humidity_2m_max", "relative_humidity_2m_min",
            "relative_humidity_2m_mean", "uv_index_max"
        ],
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    try {
        const responses = await (0, openmeteo_1.fetchWeatherApi)(url, params);
        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];
        // Attributes for timezone and location
        const latitude = response.latitude();
        const longitude = response.longitude();
        const elevation = response.elevation();
        const utcOffsetSeconds = response.utcOffsetSeconds();
        console.log(`\nCoordinates: ${latitude}°N ${longitude}°E`, `\nElevation: ${elevation}m asl`, `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`);
        const daily = response.daily();
        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            daily: {
                time: Array.from({ length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)),
                temperature_2m_max: daily.variables(0).valuesArray(),
                temperature_2m_min: daily.variables(1).valuesArray(),
                temperature_2m_mean: daily.variables(2).valuesArray(),
                wind_speed_10m_max: daily.variables(3).valuesArray(),
                wind_speed_10m_min: daily.variables(4).valuesArray(),
                wind_speed_10m_mean: daily.variables(5).valuesArray(),
                relative_humidity_2m_max: daily.variables(6).valuesArray(),
                relative_humidity_2m_min: daily.variables(7).valuesArray(),
                relative_humidity_2m_mean: daily.variables(8).valuesArray(),
                uv_index_max: daily.variables(9).valuesArray(),
            },
        };
        const openWeatherData = await (0, axios_1.PrecipitationApi)(`?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=7`);
        const precipitation = openWeatherData.data.list.map((item) => {
            if (!item.rain)
                return 0;
            return item.rain;
        });
        return {
            timestamps: weatherData.daily.time,
            maxTemperature: weatherData.daily.temperature_2m_max,
            minTemperature: weatherData.daily.temperature_2m_min,
            meanTemperature: weatherData.daily.temperature_2m_mean,
            minWindSpeed: weatherData.daily.wind_speed_10m_min,
            maxWindSpeed: weatherData.daily.wind_speed_10m_max,
            meanWindSpeed: weatherData.daily.wind_speed_10m_mean,
            minHumidity: weatherData.daily.relative_humidity_2m_min,
            maxHumidity: weatherData.daily.relative_humidity_2m_max,
            meanHumidity: weatherData.daily.relative_humidity_2m_mean,
            uvIndex: weatherData.daily.uv_index_max,
            precipitation: precipitation,
        };
    }
    catch (error) {
        console.log(error);
    }
};
exports.fetchWeatherForecast = fetchWeatherForecast;
const fetchPollenForecast = async (lat, lon) => {
    const params = {
        latitude: lat,
        longitude: lon,
        hourly: ["ragweed_pollen", "olive_pollen", "mugwort_pollen", "grass_pollen",
            "birch_pollen", "alder_pollen"
        ],
    };
    const url = "https://air-quality-api.open-meteo.com/v1/air-quality";
    try {
        const responses = await (0, openmeteo_1.fetchWeatherApi)(url, params);
        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];
        // Attributes for timezone and location
        const latitude = response.latitude();
        const longitude = response.longitude();
        const elevation = response.elevation();
        const utcOffsetSeconds = response.utcOffsetSeconds();
        console.log(`\nCoordinates: ${latitude}°N ${longitude}°E`, `\nElevation: ${elevation}m asl`, `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`);
        const hourly = response.hourly();
        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            hourly: {
                time: Array.from({ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)),
                ragweed_pollen: hourly.variables(0).valuesArray(),
                olive_pollen: hourly.variables(1).valuesArray(),
                mugwort_pollen: hourly.variables(2).valuesArray(),
                grass_pollen: hourly.variables(3).valuesArray(),
                birch_pollen: hourly.variables(4).valuesArray(),
                alder_pollen: hourly.variables(5).valuesArray(),
            },
        };
        return {
            timeStamps: weatherData.hourly.time,
            ragweed_pollen: weatherData.hourly.ragweed_pollen,
            olive_pollen: weatherData.hourly.olive_pollen,
            mugwort_pollen: weatherData.hourly.mugwort_pollen,
            grass_pollen: weatherData.hourly.grass_pollen,
            birch_pollen: weatherData.hourly.birch_pollen,
            alder_pollen: weatherData.hourly.alder_pollen,
        };
    }
    catch (error) {
        console.log(error);
    }
};
exports.fetchPollenForecast = fetchPollenForecast;
