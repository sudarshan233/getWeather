import axios from 'axios';

export const geoCodeApi = axios.create({
    method: 'GET',
    baseURL: 'https:/geocoding-api.open-meteo.com/v1',
})

export const PrecipitationApi = axios.create({
    method: 'GET',
    baseURL: 'https://api.openweathermap.org/data/2.5/forecast/daily',
})