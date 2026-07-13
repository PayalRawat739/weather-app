import Lottie from "lottie-react";

import clear from "../assets/animations/clear.json";
import clouds from "../assets/animations/clouds.json";
import rain from "../assets/animations/rain.json";
import snow from "../assets/animations/snow.json";
import thunder from "../assets/animations/thunder.json";

function WeatherAnimation({ type }) {
  const weather = type.toLowerCase();

  let animation = clear;

  switch (weather) {
    case "clouds":
      animation = clouds;
      break;

    case "rain":
      animation = rain;
      break;

    case "snow":
      animation = snow;
      break;

    case "thunderstorm":
      animation = thunder;
      break;

    default:
      animation = clear;
  }

  return (
    <div style={{ width: 180, margin: "0 auto" }}>
      <Lottie animationData={animation} loop />
    </div>
  );
}

export default WeatherAnimation;