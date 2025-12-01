"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geoCodes = void 0;
const axios_1 = require("../lib/axios");
const geoCodes = async (city) => {
    try {
        const response = await (0, axios_1.geoCodeApi)({
            url: `/search?name=${city}&language=en&format=json&count=1`,
        });
        return response.data.results;
    }
    catch (error) {
        console.error(error);
    }
};
exports.geoCodes = geoCodes;
