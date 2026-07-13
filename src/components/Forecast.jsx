import "./Forecast.css";

function Forecast({ forecast }) {
  return (
    <div className="forecast-container">
      <h2 className="forecast-title">
        📅 5-Day Forecast
      </h2>

      <div className="forecast-grid">
        {forecast.map((day) => {
          const date = new Date(day.dt * 1000);

          return (
            <div
              className="forecast-card"
              key={day.dt}
            >
              <h3>
                {date.toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </h3>

              <p className="forecast-date">
                {date.getDate()}{" "}
                {date.toLocaleString("default", {
                  month: "short",
                })}
              </p>

              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />

              <h2>
                {Math.round(day.main.temp)}°C
              </h2>

              <p className="forecast-desc">
                {day.weather[0].description}
              </p>

              <div className="forecast-temp">
                <span>
                  ⬇ {Math.round(day.main.temp_min)}°
                </span>

                <span>
                  ⬆ {Math.round(day.main.temp_max)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;