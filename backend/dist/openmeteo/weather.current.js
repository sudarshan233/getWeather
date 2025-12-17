"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPollen = exports.fetchCurrentWeather = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openmeteo_1 = require("openmeteo");
const axios_1 = require("../lib/axios");
const fetchCurrentWeather = async (lat, lon) => {
    const params = {
        latitude: lat,
        longitude: lon,
        current: [
            "temperature_2m", "wind_speed_10m", "relative_humidity_2m",
        ],
        domain: "cams_europe"
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
        const current = response.current();
        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                temperature_2m: current.variables(0).value(),
                wind_speed_10m: current.variables(1).value(),
                relative_humidity_2m: current.variables(2).value()
            },
        };
        const openWeatherData = await (0, axios_1.PrecipitationApi)(`?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=1`);
        const precipitation = openWeatherData.data.list[0].rain;
        return {
            timeStamp: weatherData.current.time,
            currentTemperature: weatherData.current.temperature_2m,
            currentHumidity: weatherData.current.relative_humidity_2m,
            currentWindSpeed: weatherData.current.wind_speed_10m,
            currentPrecipitation: precipitation
        };
    }
    catch (error) {
        console.log(error);
    }
};
exports.fetchCurrentWeather = fetchCurrentWeather;
const fetchPollen = async (lat, lon) => {
    const params = {
        latitude: lat,
        longitude: lon,
        current: ["alder_pollen", "birch_pollen", "grass_pollen", "mugwort_pollen", "ragweed_pollen", "olive_pollen"],
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
        const current = response.current();
        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                alder_pollen: current.variables(0).value(),
                birch_pollen: current.variables(1).value(),
                grass_pollen: current.variables(2).value(),
                mugwort_pollen: current.variables(3).value(),
                ragweed_pollen: current.variables(4).value(),
                olive_pollen: current.variables(5).value(),
            },
        };
        // The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
        return {
            alder_pollen: weatherData.current.alder_pollen,
            birch_pollen: weatherData.current.birch_pollen,
            grass_pollen: weatherData.current.grass_pollen,
            mugwort_pollen: weatherData.current.mugwort_pollen,
            ragweed_pollen: weatherData.current.ragweed_pollen,
            olive_pollen: weatherData.current.olive_pollen,
        };
    }
    catch (error) {
        console.log(error);
    }
};
exports.fetchPollen = fetchPollen;
