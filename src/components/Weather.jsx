import React,{ useState, useEffect,useRef } from "react";
import "./Weather.css";
import "../index.css";
import {Search,Droplet,Wind,Waves,Mountain} from "lucide-react";

const Weather = () =>{
    const [weatherData,setWeatherData] = useState(null);
    const [cityInput, setCityInput] = useState("");
    const search = async (latOrCity,lon) =>{
        const key = import.meta.env.VITE_API_KEY;
        const base = "https://api.openweathermap.org/data/2.5/weather";
        let url;
        if(typeof(latOrCity)==="string"){
            url = `${base}?q=${encodeURIComponent(latOrCity)}&appid=${key}&units=metric`
        }
        else{
            url = `${base}?lat=${latOrCity}&lon=${lon}&appid=${key}&units=metric`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setWeatherData ({
            icon:data.weather[0].icon,
            temp: data.main.temp,
            feels:data.main.feels_like,
            temp_min:data.main.temp_min,
            temp_max:data.main.temp_max,
            city:data.name,
            description:data.weather[0].description,
            humidity:data.main.humidity,
            pressure:data.main.pressure,
            wind_speed:data.wind.speed,
            ground_level:data.main.grnd_level
        });
    }
    useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          // Permission granted, fetch by coords
          search(coords.latitude, coords.longitude).catch(console.error);
        },
        (err) => {
          console.warn("Geolocation failed:", err.message);
          // Fallback to default city
          search("London").catch(console.error);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      // Geolocation not supported
      search("London").catch(console.error);
    }
  }, []);
  
  if (!weatherData) {
    return <div className="weather-card">Loading…</div>;
  }

  // Manual city search still available
  function handleCitySearch() {
    if (cityInput.trim()) {
      search(cityInput.trim()).catch(console.error);
    }
  }

    
    return (
    <div className="weather-card">
      <div className="search">
        <input
          type="text"
          placeholder="Or enter city name…"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCitySearch()}
        />
        <button onClick={handleCitySearch}>
          <Search size={24} />
        </button>
      </div>
        <div className="weather-info">
        <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
            className="weather-icon"
            alt="weather icon"
        />
        <p className="temp">{weatherData.temp}°c</p>
        <div class="kpi-strip">
        <div class="kpi"><span class="label">Feels</span><span class="value" id="kpi-feels">{weatherData.feels}°C</span></div>
        <div class="kpi"><span class="label">Min/Max</span><span class="value" id="kpi-minmax">{weatherData.temp_min}°C/{weatherData.temp_max}°C</span></div>
        </div>
        <p className="city">{weatherData.city}</p>
        <p className="description">{weatherData.description}</p>
        <div class="stats-grid">
      <div class="stat-card">
        <span class="icon"><Droplet/></span>
        <span class="label">Humidity</span>
        <span class="value" id="stat-humidity">{weatherData.humidity}%</span>
      </div>
      <div class="stat-card">
        <span class="icon"><Waves/></span>
        <span class="label">Pressure</span>
        <span class="value" id="stat-pressure">{weatherData.pressure} hPa</span>
      </div>
      <div class="stat-card">
        <span class="icon"><Wind/></span>
        <span class="label">Wind speed</span>
        <span class="value" id="stat-sea">{weatherData.wind_speed}km/h</span>
      </div>
      <div class="stat-card">
        <span class="icon"><Mountain/></span>
        <span class="label">Ground Lvl</span>
        <span class="value" id="stat-ground">{weatherData.ground_level}</span>
        </div>
    </div>
    </div>
    </div>
    );
}

export default Weather;