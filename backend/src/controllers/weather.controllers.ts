import { Request, Response } from 'express';

import {GeoCodesResponse} from "../models/weather.types";

import {geoCodes} from "../openmeteo/weather.geocodes";
import {fetchPollenForecast, fetchWeatherForecast} from "../openmeteo/weather.forecast";
import {fetchCurrentWeather, fetchPollen} from "../openmeteo/weather.current";

export const getCurrentWeather = async (req: Request, res: Response) => {
    const city  = req.query.city as string;

    try {
        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required"
            });
        }
        const coordinates = await geoCodes(city);

        if (!coordinates) {
            return res.status(404).json({
                success: false,
                message: "City not found"
            });
        }

        const { latitude, longitude } = coordinates[0] as GeoCodesResponse;
        console.log(latitude, longitude);
        const currentWeatherData = await fetchCurrentWeather(latitude, longitude);
        const currentPollenData = await fetchPollen(latitude, longitude);

        // console.log(weatherData);
        res.status(200).json({
            success: true,
            weatherData: {
                ...currentWeatherData,
                currentPollenData
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        })
    }
}

export const getForecastWeather = async (req: Request, res: Response) => {
    const city  = req.query.city as string;

    try {
        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required"
            });
        }
        const coordinates = await geoCodes(city);

        if (!coordinates) {
            return res.status(404).json({
                success: false,
                message: "City not found"
            });
        }

        const { latitude, longitude } = coordinates[0] as GeoCodesResponse;
        const forecastWeatherData = await fetchWeatherForecast(latitude, longitude);
        const forecastPollenData = await fetchPollenForecast(latitude, longitude);

        // console.log(weatherData);
        res.status(200).json({
            success: true,
            weatherData: {
                ...forecastWeatherData,
                forecastPollenData
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        })
    }
}
