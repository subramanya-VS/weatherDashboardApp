# Weather Dashboard

A responsive weather dashboard that fetches and displays real-time weather information for a given city or the user's current location using the OpenWeatherMap API.

## 🌐 Live Demo

[Weather DashBoard](https://weatherdashboard-subramanya.vercel.app/)

## Features

* Fetch weather by entering a city name
* Use the browser's geolocation API to get weather by location
* Responsive design for mobile and desktop
* Real-time weather data displayed including:

  * Temperature
  * Feels-like temperature
  * Weather conditions
  * Humidity
  * Wind speed
  * Rain volume (if applicable)

## Technologies Used

* React (Frontend)
* Node.js (Backend)
* Express (Optional for API proxy)
* Tailwind CSS (Styling)
* OpenWeatherMap RESTful API (Third-party weather data)

## How It Works

1. The user can either:

   * Click **Use My Location**, which uses the browser's `navigator.geolocation` API to get the user's coordinates.
   * Enter a city name manually in the input field and click **Fetch by City**.

2. The frontend sends a request to a backend function (`getWeather`) which constructs the appropriate URL to call the OpenWeatherMap API.

3. The backend fetches weather data using the OpenWeatherMap REST API and returns the JSON response.

4. The frontend parses and displays relevant weather information from the JSON:

   * Coordinates
   * Country and city name
   * Current temperature and "feels like"
   * Weather description
   * Humidity, wind speed, and rain volume if available

## API Reference

**OpenWeatherMap API Endpoint:**

```
https://api.openweathermap.org/data/2.5/weather
```

**Parameters Used:**

* `q` for city name
* `lat` and `lon` for geographic coordinates
* `appid` for API key (stored in `.env`)
* `units=metric` for Celsius temperature

## Installation & Setup

1. Clone the repository:

```
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the root with your OpenWeatherMap API key:

```
WEATHER_API_KEY=your_api_key_here
```

4. Run the development server:

```
npm run dev
```


## License

This project is licensed under the MIT License.
