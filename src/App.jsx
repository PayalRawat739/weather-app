import { useState, useEffect } from "react";
import "./App.css";

import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";

import {
  getWeather,
  getWeatherByCoords,
  getForecast,
} from "./services/weatherApi";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [recentCities, setRecentCities] = useState([]);
 const [favoriteCities, setFavoriteCities] = useState(() => {
 const saved = localStorage.getItem("favoriteCities");
    return saved ? JSON.parse(saved) : [];
  });

  // Dark Mode
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);
  useEffect(() => {
  localStorage.setItem(
    "favoriteCities",
    JSON.stringify(favoriteCities)
  );
}, [favoriteCities]);
  useEffect(() => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const weatherData = await getWeatherByCoords(
          position.coords.latitude,
          position.coords.longitude
        );

        setWeather(weatherData);

        const forecastData = await getForecast(weatherData.name);

        const dailyForecast = forecastData.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

        setForecast(dailyForecast);
      } catch (error) {
        console.log(error);
      }
    },
    () => {}
  );
}, []);

  // Search Weather
  const searchWeather = async (city) => {
    if (!city.trim()) return;
   
    setLoading(true);

    try {
      const weatherData = await getWeather(city);
      const forecastData = await getForecast(city);

      setWeather(weatherData);

      const dailyForecast = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(dailyForecast);

      setRecentCities((prev) => {
        const updated = [
          city,
          ...prev.filter(
            (item) => item.toLowerCase() !== city.toLowerCase()
          ),
        ];
 

        return updated.slice(0, 5);
      });
    }catch (error) {
      alert(error.response?.data?.message || "City not found!");
    } finally {
      setLoading(false);
    }
  };
  const addFavorite = () => {
  if (!weather) return;

  const city = weather.name;

  if (
    favoriteCities.some(
      (item) => item.toLowerCase() === city.toLowerCase()
    )
  ) {
    alert("Already in Favorites ❤️");
    return;
  }

  setFavoriteCities([...favoriteCities, city]);
};

  // Current Location
  const getCurrentLocationWeather = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const weatherData = await getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );

          setWeather(weatherData);

          const forecastData = await getForecast(weatherData.name);

          const dailyForecast = forecastData.list.filter((item) =>
            item.dt_txt.includes("12:00:00")
          );

          setForecast(dailyForecast);
        } catch {
          alert("Unable to fetch location weather.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        alert("Location permission denied.");
      }
    );
  };

  return (
    <div
      className={`app ${
        weather ? weather.weather[0].main.toLowerCase() : ""
      }`}
    >
      <h1 className="title">🌤 Weather Forecast</h1>

      <button
        className="theme-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>


      <SearchBox onSearch={searchWeather} />

      <button
        className="location-btn"
        onClick={getCurrentLocationWeather}
      >
        📍 Use My Location
      </button>

      {loading && (
        <p className="loading">
          Loading Weather...
        </p>
      )}

      {weather && (
        <WeatherCard weather={weather} />
      )}
      {weather && (
  <button
    className="favorite-btn"
    onClick={addFavorite}
  >
    ❤️ Add to Favorites
  </button>
)}

      {recentCities.length > 0 && (
        <div className="recent-searches">
          <h3>🕘 Recent Searches</h3>
          {favoriteCities.length > 0 && (
  <div className="favorites">
    <h3>❤️ Favorite Cities</h3>

    <div className="favorite-list">
      {favoriteCities.map((city, index) => (
        <button
          key={index}
          onClick={() => searchWeather(city)}
        >
          ❤️ {city}
        </button>
      ))}
    </div>
  </div>
)}

          <div className="recent-list">
            {recentCities.map((city, index) => (
              <button
                key={index}
                onClick={() => searchWeather(city)}
              >
                📍 {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {forecast.length > 0 && (
        <Forecast forecast={forecast} />
      )}
    </div>
  );
}

export default App;