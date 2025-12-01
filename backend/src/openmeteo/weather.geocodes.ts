import {geoCodeApi} from "../lib/axios";

export const geoCodes = async (city: string) => {
    try {
        const response = await geoCodeApi({
            url: `/search?name=${city}&language=en&format=json&count=1`,
        });

        return response.data.results;

    } catch (error) {
        console.error(error);
    }
}