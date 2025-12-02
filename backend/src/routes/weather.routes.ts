import express from "express";

import {
    getCurrentWeather
} from "../controllers/weather.controllers";

const router = express.Router();

router.get(
    "/current",
    getCurrentWeather
)

export default router