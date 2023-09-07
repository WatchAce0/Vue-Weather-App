<template>
  <div class="container">
    <h1>Color Changing Weather</h1>
    <h2>Enter a zip code to get the temperature.</h2>
    <input type="text" v-model="zipCode" placeholder="Enter zip code" />
    <button @click="fetchTemperature">Get Temp</button>
    <div class="temperature">
      <p>{{ temperatureText }}</p>
    </div>
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
