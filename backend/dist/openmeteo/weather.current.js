"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWeather = void 0;
const openmeteo_1 = require("openmeteo");
const fetchWeather = async (lat, lon) => {
    const params = {
        latitude: lat,
        longitude: lon,
        daily: "uv_index_max",
        hourly: ["ragweed_pollen", "olive_pollen", "mugwort_pollen", "grass_pollen",
            "birch_pollen", "alder_pollen"
        ],
        current: [
            "temperature_2m", "precipitation", "wind_speed_10m", "relative_humidity_2m",
            "alder_pollen", "birch_pollen", "grass_pollen", "mugwort_pollen",
            "ragweed_pollen", "olive_pollen"
        ],
    };
    const url = "https://api.open-meteo.com/v1/forecast";
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
        const daily = response.daily();
        const hourly = response.hourly();
        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                temperature_2m: current.variables(0).value(),
                precipitation: current.variables(1).value(),
                wind_speed_10m: current.variables(2).value(),
                relative_humidity_2m: current.variables(3).value(),
                alder_pollen: current.variables(0).value(),
                birch_pollen: current.variables(1).value(),
                grass_pollen: current.variables(2).value(),
                mugwort_pollen: current.variables(3).value(),
                ragweed_pollen: current.variables(4).value(),
                olive_pollen: current.variables(5).value(),
            },
            hourly: {
                time: Array.from({ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)),
                ragweed_pollen: hourly.variables(0).valuesArray(),
                olive_pollen: hourly.variables(1).valuesArray(),
                mugwort_pollen: hourly.variables(2).valuesArray(),
                grass_pollen: hourly.variables(3).valuesArray(),
                birch_pollen: hourly.variables(4).valuesArray(),
                alder_pollen: hourly.variables(5).valuesArray(),
            },
            daily: {
                time: Array.from({ length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)),
                uv_index_max: daily.variables(0).valuesArray(),
            },
        };
        return {
            timeStamp: weatherData.current.time,
            currentTemperature: weatherData.current.temperature_2m,
            currenPrecipitation: weatherData.current.precipitation,
            currentHumidity: weatherData.current.relative_humidity_2m,
            currentWindSpeed: weatherData.current.wind_speed_10m,
            currentPollen: {
                alder_pollen: weatherData.current.alder_pollen,
                birch_pollen: weatherData.current.birch_pollen,
                grass_pollen: weatherData.current.grass_pollen,
                mugwort_pollen: weatherData.current.mugwort_pollen,
                ragweed_pollen: weatherData.current.ragweed_pollen,
                olive_pollen: weatherData.current.olive_pollen,
            }
        };
    }
    catch (error) {
        console.log(error);
    }
};
exports.fetchWeather = fetchWeather;
