import { DateTime } from 'luxon';
import WAK from './apikey.js';

const API_KEY = WAK;
// const API_KEY = process.env.REACT_APP_API_KEY;
// const API_KEY = YOUR_API_KEY;     
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    // console.log(url);
    return fetch(url).then((res) => res.json());
};

// The below function is used to format the current weather data
const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
    } = data;

    const { main: details, icon } = weather[0];
    return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed };
};

// The below function is used to format the forecast weather data
const formatForecastWeather = (data) => {
    let { timezone, hourly, daily } = data;

    hourly = hourly.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
            temp: d.temp,
            icon: d.weather[0].icon,
        };
    });

    daily = daily.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, "ccc"),
            temp: d.temp.day,
            icon: d.weather[0].icon,
        };
    });

    return { timezone, hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {
    // formatCurrentWeather is a function that formats the current weather data
    const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    // formatForecastWeather is a function that formats the forecast weather data
    // const formattedForecastWeather = await getWeatherData("forecast", { lat, lon, exclude: "minutely,alerts", units: searchParams.units }).then(formatForecastWeather);
    const formattedForecastWeather = await getWeatherData("onecall", { lat, lon, exclude: "current,minutely,alerts", units: searchParams.units }).then(formatForecastWeather);

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
    secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

export default getFormattedWeatherData;

export { iconUrl, formatToLocalTime };  