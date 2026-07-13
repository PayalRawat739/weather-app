import "./WeatherCard.css";

function WeatherCard({ weather }) {
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="weather-card">
      <h2>{weather.name}, {weather.sys.country}</h2>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        alt="Weather"
      />

      <h1>{Math.round(weather.main.temp)}°C</h1>

      <p>{weather.weather[0].description}</p>

      <div className="weather-details">

        <div className="detail-card">
          🌡 <strong>Feels Like</strong>
          <p>{Math.round(weather.main.feels_like)}°C</p>
        </div>

        <div className="detail-card">
          💧 <strong>Humidity</strong>
          <p>{weather.main.humidity}%</p>
        </div>

        <div className="detail-card">
          💨 <strong>Wind</strong>
          <p>{weather.wind.speed} m/s</p>
        </div>

        <div className="detail-card">
          🌍 <strong>Pressure</strong>
          <p>{weather.main.pressure} hPa</p>
        </div>

        <div className="detail-card">
          👀 <strong>Visibility</strong>
          <p>{weather.visibility / 1000} km</p>
        </div>

        <div className="detail-card">
          🌅 <strong>Sunrise</strong>
          <p>{sunrise}</p>
        </div>

        <div className="detail-card">
          🌇 <strong>Sunset</strong>
          <p>{sunset}</p>
        </div>

      </div>
    </div>
  );
}

export default WeatherCard;