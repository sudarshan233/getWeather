import type { CurrentDataProps } from "../models/DashArc.types";

export const fetchDays = (day: number): string => {
    switch (day) {
        case 0:
            return 'Sun';
        case 6:
            return 'Sat';

        case 1:
            return 'Mon';

        case 2:
            return 'Tue';
        case 4:
            return 'Thu';

        case 3: return 'Wed';
        case 5: return 'Fri';
        default:
            return '';
    }
}

export const fetchIndex = (
    weatherStat: string, value: string): string => {

    if(weatherStat === 'Precipitation') {
        const n = parseInt(String(value).replace(/\D/g, ''), 10)
        if(n >= 0 && n < 2) return 'Low';

        else if(n >=2 && n < 10) return 'Normal';

        else if(n > 10) return 'High';

        else return ''
    }

    if(weatherStat === 'UV Index') {
        const n = parseInt(value, 10)
        if(n >= 0 && n <= 2) return 'Low';

        else if(n >=3 && n <= 5) return 'Normal';

        else if(n >= 6) return 'High';

        else return ''
    }

    else return '';
}

export const fetchColourIndex = (index: string): string => {

        if(index === 'Low') return 'bg-green-500';

        else if(index === 'Normal') return 'bg-yellow-500';

        else if(index === 'High') return 'bg-red-500';

        else return ''
}

export const meanDaily = (values: (number | null)[], hoursPerDay = 24, days = 5) => {
    const result: number[] = [];

    for (let i = 0; i < days; i++) {
        const slice = values.slice(i * hoursPerDay, (i + 1) * hoursPerDay);

        if (slice.length === 0) {
            result.push(0); // missing data
            continue;
        }

        const cleaned = slice.map(v => v ?? 0);
        const mean = cleaned.reduce((a, b) => a + b, 0) / cleaned.length;

        result.push(Math.round(mean));
    }

    return result;
};

export const describeDay = (current: CurrentDataProps | null) => {
    if (!current) return null;

    const temp = current.currentTemperature;
    const wind = current.currentWindSpeed;
    const humidity = current.currentHumidity;

    let parts: string[] = [];

    // Temperature
    if (temp >= 32) parts.push("very hot");
    else if (temp >= 25) parts.push("warm and pleasant");
    else if (temp >= 18) parts.push("mild");
    else if (temp >= 10) parts.push("cool");
    else parts.push("cold");

    // Wind
    if (wind >= 30) parts.push("with strong winds");
    else if (wind >= 15) parts.push("with a light breeze");
    else parts.push("with calm winds");

    // Humidity
    if (humidity >= 80) parts.push("and high humidity");
    else if (humidity <= 30) parts.push("and dry air");
    else parts.push("and moderate humidity");

    // Build base sentence
    const base = `A ${parts.join(" ")} throughout the day.`;  
    return base
};

export const generateTips = (current: CurrentDataProps | null) => {
    if (!current) return null;

    const temp = current.currentTemperature;
    const wind = current.currentWindSpeed;
    const humidity = current.currentHumidity;

    let tips: string[] = [];

    if (temp >= 30) tips.push("Stay hydrated and protect yourself from heat.");
    if (temp <= 10) tips.push("Wear warm layers to stay comfortable outside.");
    if (humidity > 85) tips.push("Fog may develop; visibility could be lower today.");
    if (wind >= 25) tips.push("Secure loose items and avoid light outdoor structures.");
    if (temp >= 20 && humidity >= 70) tips.push("Humidity may increase discomfort during afternoon activities.");

    if (tips.length === 0) tips.push("Weather conditions are stable; no major precautions needed today.");

    const combined = tips.join(" ");
    return combined
};


