"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPollenForecast = exports.fetchWeatherForecast = void 0;
const openmeteo_1 = require("openmeteo");
const url = "https://api.open-meteo.com/v1/forecast";
const fetchWeatherForecast = async (lat, lon) => {
    const params = {
        latitude: lat,
        longitude: lon,
        daily: ["temperature_2m_max", "temperature_2m_min", "wind_speed_10m_max",
            "precipitation_sum", "relative_humidity_2m_max",
            "relative_humidity_2m_min", "wind_speed_10m_min", "uv_index_max"
        ],
    };
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
                uv_index_max: daily.variables(0).valuesArray(),
                temperature_2m_max: daily.variables(1).valuesArray(),
                temperature_2m_min: daily.variables(2).valuesArray(),
                wind_speed_10m_max: daily.variables(3).valuesArray(),
                precipitation_sum: daily.variables(4).valuesArray(),
                relative_humidity_2m_max: daily.variables(5).valuesArray(),
                relative_humidity_2m_min: daily.variables(6).valuesArray(),
                wind_speed_10m_min: daily.variables(7).valuesArray(),
            },
        };
        return {
            daily: weatherData.daily
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
            hourly: weatherData.hourly
        };
    }
    catch (error) {
        console.log(error);
    }
};
exports.fetchPollenForecast = fetchPollenForecast;
