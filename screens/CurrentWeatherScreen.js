import { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';

const WeatherScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetWeather = async () => {
    try {
      setLoading(true);
      const apiKey = '786e6b9533e1aafe1251e09e9c57856d';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } else {
        setError('Error fetching weather data');
      }
    } catch (error) {
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  const convertKelvinToFahrenheit = (kelvin) => {
    return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(2);
  };

  return (
    <View>
      <Text>Curent Weather Information</Text>
      <TextInput
        placeholder="Enter City"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Button title="Get Weather" color="#78e1e9" onPress={handleGetWeather} />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {loading && <ActivityIndicator size="large" color="#e4d155" />}

      {weatherData && (
        <View>
          <Text>{`City: ${weatherData.name}`}</Text>
          <Text>{`Temperature: ${convertKelvinToCelsius(
            weatherData.main.temp
          )} °C, ${convertKelvinToFahrenheit(weatherData.main.temp)} °F`}</Text>
          <Text>{`Humidity: ${weatherData.main.humidity}%`}</Text>
          <Text>{`Pressure: ${weatherData.main.pressure} hPa`}</Text>
          <Text>{`Description: ${weatherData.weather[0].description}`}</Text>
        </View>
      )}
    </View>
  );
};

export default WeatherScreen;
