import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

// Search weather by city
export const getWeather = async (city) => {
  const response = await axios.get(CURRENT_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });

  return response.data;
};

// Weather by current location
export const getWeatherByCoords = async (lat, lon) => {
  const response = await axios.get(CURRENT_URL, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric",
    },
  });

  return response.data;
};

// 5-Day Forecast
export const getForecast = async (city) => {
  const response = await axios.get(FORECAST_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });

  return response.data;
};