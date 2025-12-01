import express from "express";

import {
    getCurrentWeather
} from "../weather.controllers";

const router = express.Router();

router.get(
    "/current",
    getCurrentWeather
)

export default router