import { Request, Response } from 'express';

import {GeoCodesResponse} from "../models/weather.types";
import {fetchWeather} from "../openmeteo/weather.current";
import {geoCodes} from "../openmeteo/weather.geocodes";

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
        const weatherData = await fetchWeather(latitude, longitude);

        // console.log(weatherData);
        res.status(200).json({
            success: true,
            weatherData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        })
    }
}
