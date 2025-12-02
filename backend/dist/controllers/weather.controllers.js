"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentWeather = void 0;
const weather_current_1 = require("../openmeteo/weather.current");
const weather_geocodes_1 = require("../openmeteo/weather.geocodes");
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
        const weatherData = await (0, weather_current_1.fetchWeather)(latitude, longitude);
        // console.log(weatherData);
        res.status(200).json({
            success: true,
            weatherData,
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
