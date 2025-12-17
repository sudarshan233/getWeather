import express from "express";

import {
    getCurrentWeather, getForecastWeather
} from "../controllers/weather.controllers";

const router = express.Router();

router.get(
    "/current",
    getCurrentWeather
)

router.get(
    "/forecast",
    getForecastWeather
)

export default router