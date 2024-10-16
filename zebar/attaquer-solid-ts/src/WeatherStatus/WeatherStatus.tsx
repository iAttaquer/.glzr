import "./style.css";
import { WeatherOutput } from "zebar";
import { Component } from "solid-js";

interface WeatherStatusProps {
    weather: WeatherOutput;
}

const WeatherStatus: Component<WeatherStatusProps> = (props) => {
    const getWeatherIcon = (status: string) => {
        switch (status) {
            case 'clear_day':
              return <i class="nf nf-weather-day_sunny"></i>;
            case 'clear_night':
              return <i class="nf nf-weather-night_clear"></i>;
            case 'cloudy_day':
              return <i class="nf nf-weather-day_cloudy"></i>;
            case 'cloudy_night':
              return <i class="nf nf-weather-night_alt_cloudy"></i>;
            case 'light_rain_day':
              return <i class="nf nf-weather-day_sprinkle"></i>;
            case 'light_rain_night':
              return <i class="nf nf-weather-night_alt_sprinkle"></i>;
            case 'heavy_rain_day':
              return <i class="nf nf-weather-day_rain"></i>;
            case 'heavy_rain_night':
              return <i class="nf nf-weather-night_alt_rain"></i>;
            case 'snow_day':
              return <i class="nf nf-weather-day_snow"></i>;
            case 'snow_night':
              return <i class="nf nf-weather-night_alt_snow"></i>;
            case 'thunder_day':
              return <i class="nf nf-weather-day_lightning"></i>;
            case 'thunder_night':
              return <i class="nf nf-weather-night_alt_lightning"></i>;
          }
    };
    return (
        <div class="template weather">
            {getWeatherIcon(props.weather?.status)}
            {Math.round(props.weather?.celsiusTemp)}°C
        </div>
    );
};

export default WeatherStatus;