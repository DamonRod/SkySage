import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import { globalStyles, colors } from './styles';

const ForecastScreen = ({ route }) => {
  const [city, setCity] = useState(route.params?.city || '');
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetForecast = async () => {
    try {
      setLoading(true);
      const openWeatherMapApiKey = '786e6b9533e1aafe1251e09e9c57856d';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${openWeatherMapApiKey}`
      );

      if (response.ok) {
        const data = await response.json();
        setForecastData(data.list);
        setError(null);
      } else {
        setError('Error fetching forecast data');
      }
    } catch (error) {
      setError('Error fetching forecast data');
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

  const renderForecastItem = ({ item }) => (
    <View style={[globalStyles.forecastItem, { backgroundColor: 'white' }]}>
      <Text>{`Date/Time: ${item.dt_txt}`}</Text>
      <Text>{`Temperature: ${convertKelvinToCelsius(
        item.main.temp
      )} °C, ${convertKelvinToFahrenheit(item.main.temp)} °F`}</Text>
      <Text>{`Humidity: ${item.main.humidity}%`}</Text>
      <Text>{`Pressure: ${item.main.pressure} hPa`}</Text>
      <Text>{`Description: ${item.weather[0].description}`}</Text>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>7-Day Forecast</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Enter City"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Button
        style={globalStyles.button}
        title="Get Forecast"
        onPress={handleGetForecast}
      />
      {loading && <ActivityIndicator size="large" color={colors.secondary} />}
      {error && <Text style={globalStyles.errorText}>{error}</Text>}
      {forecastData && <Text style={globalStyles.title}>City: {city}</Text>}
      {forecastData && (
        <FlatList
          data={forecastData}
          keyExtractor={(item) => item.dt.toString()}
          renderItem={renderForecastItem}
        />
      )}
    </View>
  );
};

export default ForecastScreen;
