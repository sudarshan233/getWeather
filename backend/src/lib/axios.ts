import axios from 'axios';

export const geoCodeApi = axios.create({
    method: 'GET',
    baseURL: 'https:/geocoding-api.open-meteo.com/v1',
})