"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weather_controllers_1 = require("../controllers/weather.controllers");
const router = express_1.default.Router();
router.get("/current", weather_controllers_1.getCurrentWeather);
router.get("/forecast", weather_controllers_1.getForecastWeather);
router.get("/forecast/pollen", weather_controllers_1.getForecastPollen);
exports.default = router;
