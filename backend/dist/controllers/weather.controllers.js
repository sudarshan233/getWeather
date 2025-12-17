"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getForecastWeather = exports.getCurrentWeather = void 0;
const weather_geocodes_1 = require("../openmeteo/weather.geocodes");
const weather_forecast_1 = require("../openmeteo/weather.forecast");
const weather_current_1 = require("../openmeteo/weather.current");
const getCurrentWeather = async (req, res) => {
    const city = req.query.city;
    try {
        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required"
            });
        }
        const coordinates = await (0, weather_geocodes_1.geoCodes)(city);
        if (!coordinates) {
            return res.status(404).json({
                success: false,
                message: "City not found"
            });
        }
        const { latitude, longitude } = coordinates[0];
        console.log(latitude, longitude);
        const currentWeatherData = await (0, weather_current_1.fetchCurrentWeather)(latitude, longitude);
        const currentPollenData = await (0, weather_current_1.fetchPollen)(latitude, longitude);
        // console.log(weatherData);
        res.status(200).json({
            success: true,
            weatherData: {
                ...currentWeatherData,
                currentPollenData
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
};
exports.getCurrentWeather = getCurrentWeather;
const getForecastWeather = async (req, res) => {
    const city = req.query.city;
    try {
        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required"
            });
        }
        const coordinates = await (0, weather_geocodes_1.geoCodes)(city);
        if (!coordinates) {
            return res.status(404).json({
                success: false,
                message: "City not found"
            });
        }
        const { latitude, longitude } = coordinates[0];
        const forecastWeatherData = await (0, weather_forecast_1.fetchWeatherForecast)(latitude, longitude);
        const forecastPollenData = await (0, weather_forecast_1.fetchPollenForecast)(latitude, longitude);
        // console.log(weatherData);
        res.status(200).json({
            success: true,
            weatherData: {
                ...forecastWeatherData,
                forecastPollenData
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
};
exports.getForecastWeather = getForecastWeather;
