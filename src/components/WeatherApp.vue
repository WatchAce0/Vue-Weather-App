<template>
  <div class="flex flex-col min-h-screen">
    <!-- Main Content -->
    <div class="flex-grow flex flex-col items-center justify-center space-y-6">
      <h1 class="text-3xl font-bold text-gray-700">Color Changing Weather</h1>
      <h2 class="text-xl text-gray-600">
        Enter a zip code to get the temperature.
      </h2>
      <div class="space-y-4 w-64">
        <input
          type="text"
          v-model="zipCode"
          placeholder="Enter zip code"
          class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 shadow-sm"
        />
        <button
          @click="fetchTemperature"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200 shadow-sm"
        >
          Get Temp
        </button>
      </div>
      <p class="text-4xl font-semibold text-gray-700">{{ temperatureText }}</p>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-6">
      <div class="container mx-auto text-center">
        <div class="flex justify-center items-center space-x-4">
          <img
            src="https://cdn.freebiesupply.com/logos/large/2x/netlify-logo-png-transparent.png"
            alt="Netlify Logo"
            class="h-8"
          />
          <img
            src="https://raw.githubusercontent.com/ioBroker/ioBroker.openweathermap/HEAD/admin/openweathermap.png"
            alt="OpenWeatherMap Logo"
            class="h-8"
          />
          <img
            src="https://th.bing.com/th/id/R.6fc1c04b114f92b2ea6747c9a0b57f61?rik=xXmXG%2bKcP3wJWw&pid=ImgRaw&r=0"
            alt="Vue.js Logo"
            class="h-8"
          />
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiKey: "654e2a3a4a1b9f8974467426689fded2", // Your API key
      zipCode: "",
      temperatureText: "",
    };
  },
  methods: {
    async fetchTemperature() {
      if (this.zipCode.length === 5 && !isNaN(this.zipCode)) {
        const weatherData = await this.fetchWeatherData(this.zipCode);
        if (weatherData && weatherData.cod === 200) {
          this.updateUI(weatherData);
        } else {
          alert(
            "Failed to fetch weather data. Please check the zip code or try again later."
          );
        }
      } else {
        alert("Please enter a valid zip code.");
      }
    },

    async fetchWeatherData(zipCode) {
      const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${this.apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    },
    updateUI(weatherData) {
      if (weatherData.main && weatherData.main.temp) {
        const tempFahrenheit = Math.round(weatherData.main.temp);
        this.temperatureText = `${tempFahrenheit}°F`;

        if (tempFahrenheit < 60) {
          document.body.style.backgroundColor = "lightblue";
        } else if (tempFahrenheit >= 60 && tempFahrenheit < 80) {
          document.body.style.backgroundColor = "orange";
        } else {
          document.body.style.backgroundColor = "red";
        }
      } else {
        alert("Failed to fetch temperature data.");
      }
    },
  },
};
</script>
<style scoped>
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  transition: background-color 0.5s;
}

.container {
  text-align: center;
}

.temperature {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 20px;
}

input {
  padding: 5px 10px;
  font-size: 1rem;
}

button {
  padding: 6px 12px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
