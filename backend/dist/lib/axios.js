"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrecipitationApi = exports.geoCodeApi = void 0;
const axios_1 = __importDefault(require("axios"));
exports.geoCodeApi = axios_1.default.create({
    method: 'GET',
    baseURL: 'https:/geocoding-api.open-meteo.com/v1',
});
exports.PrecipitationApi = axios_1.default.create({
    method: 'GET',
    baseURL: 'https://api.openweathermap.org/data/2.5/forecast/daily',
});
