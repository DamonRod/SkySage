import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import { globalStyles, colors } from './styles';

const CurrentWeatherScreen = ({ route }) => {
  const [city, setCity] = useState(route.params?.city || '');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params?.clearForm) {
      setCity(route.params?.city || '');
    }
  }, [route.params?.clearForm, route.params?.city]);

  const handleGetCurrentWeather = async () => {
    try {
      setLoading(true);
      const openWeatherMapApiKey = '786e6b9533e1aafe1251e09e9c57856d';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${openWeatherMapApiKey}`
      );

      if (response.ok) {
        const data = await response.json();
        setCurrentWeather(data);
        setError(null);
      } else {
        setError('Error fetching current weather data');
      }
    } catch (error) {
      setError('Error fetching current weather data');
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
    <ScrollView style={globalStyles.container}>
      <View>
        <Text style={globalStyles.title}>Current Weather</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Enter City"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Button
          style={globalStyles.button}
          title="Get Current Weather"
          onPress={handleGetCurrentWeather}
        />
        {loading && <ActivityIndicator size="large" color={colors.secondary} />}
        {error && <Text style={globalStyles.errorText}>{error}</Text>}
        {currentWeather && <Text style={globalStyles.title}>City: {currentWeather.name}</Text>}
        {currentWeather && (
          <View>
            <Text>{`Temperature: ${convertKelvinToCelsius(
              currentWeather.main.temp
            )} °C, ${convertKelvinToFahrenheit(currentWeather.main.temp)} °F`}</Text>
            <Text>{`Humidity: ${currentWeather.main.humidity}%`}</Text>
            <Text>{`Pressure: ${currentWeather.main.pressure} hPa`}</Text>
            <Text>{`Description: ${currentWeather.weather[0].description}`}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default CurrentWeatherScreen;
