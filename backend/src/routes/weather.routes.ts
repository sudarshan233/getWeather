import express from "express";

import {
    getCurrentWeather, getForecastPollen, getForecastWeather
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

router.get(
    "/forecast/pollen",
    getForecastPollen)

export default router