<template>
  <div class="min-h-screen flex flex-col items-center justify-center space-y-6">
    <h1 class="text-4xl font-bold text-gray-700">Simple Weather</h1>
    <div class="space-y-4 w-64">
      <input
        type="text"
        v-model="zipCode"
        placeholder="Enter zip code"
        class="w-full p-2 rounded text-center bg-white"
      />
      <button
        @click="fetchWeatherData"
        class="w-full bg-blue-500 font-bold hover:bg-blue-600 text-white p-2 rounded transition duration-200"
      >
        Get 5-Day Forecast
      </button>
    </div>
    <div v-if="weatherData">
      <h2 class="text-3xl pb-6 font-bold text-gray-700">
        {{ weatherData.city.name }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div
          v-for="forecast in filteredForecasts"
          :key="forecast.dt"
          class="rounded p-4 bg-white shadow-lg"
        >
          <p class="text-md font-semibold">
            {{ getDayOfTheWeek(forecast.dt) }}
          </p>

          <div class="text-4xl">
            {{ getWeatherEmoji(forecast.weather[0].main) }}
          </div>

          <p class="text-xl">{{ Math.round(forecast.main.temp) }}°F</p>
          <p class="text-sm">{{ forecast.weather[0].description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zipCode: "",
      weatherData: null,
    };
  },
  computed: {
    filteredForecasts() {
      return this.weatherData
        ? this.weatherData.list.filter((_, index) => index % 8 === 0)
        : [];
    },
  },
  watch: {
    weatherData: "updateBackgroundColor",
  },
  mounted() {
    this.updateBackgroundColor();
  },
  methods: {
    async fetchWeatherData() {
      if (this.zipCode.length === 5 && !isNaN(this.zipCode)) {
        const apiKey = process.env.VUE_APP_OPENWEATHER_API_KEY;
        const forecastWeather = await this.fetchData(
          `https://api.openweathermap.org/data/2.5/forecast?zip=${this.zipCode},us&units=imperial&appid=${apiKey}`
        );

        if (forecastWeather.cod === "200") {
          this.weatherData = forecastWeather;
        } else {
          alert(
            "Failed to fetch weather data. Please check the zip code or try again later."
          );
        }
      } else {
        alert("Please enter a valid zip code.");
      }
    },
    async fetchData(url) {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    },
    getDayOfTheWeek(timestamp) {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const date = new Date(timestamp * 1000);
      return days[date.getDay()];
    },

    getWeatherEmoji(weatherCondition) {
      const weatherEmojiMap = {
        Clear: "☀️",
        Clouds: "☁️",
        Rain: "🌧️",
        Snow: "❄️",
        Thunderstorm: "⚡",
        Drizzle: "🌦️",
        Mist: "🌫️",
        Fog: "🌫️",
        Haze: "🌫️",
        Smoke: "💨",
        Dust: "💨",
        Sand: "💨",
        Ash: "💨",
        Squall: "💨",
        Tornado: "🌪️",
      };

      return weatherEmojiMap[weatherCondition] || "❓";
    },

    updateBackgroundColor() {
      if (this.weatherData) {
        const tempFahrenheit = this.weatherData.list[0].main.temp;
        if (tempFahrenheit < 60) {
          document.body.style.backgroundColor = "#add8e6";
        } else if (tempFahrenheit >= 60 && tempFahrenheit < 80) {
          document.body.style.backgroundColor = "#ffcc00";
        } else {
          document.body.style.backgroundColor = "#ff4500";
        }
      }
    },
  },
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
