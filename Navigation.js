import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomeScreen from './screens/HomeScreen';
import WeatherScreen from './screens/CurrentWeatherScreen';
import ForecastScreen from './screens/ForecastScreen';
import SavedLocationsScreen from './screens/SavedLocationsScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="SkySage" component={HomeScreen} />
          <Tab.Screen name="Current Weather" component={WeatherScreen} />
          <Tab.Screen name="Weather Forecast" component={ForecastScreen} />
          <Tab.Screen name="Saved Locations" component={SavedLocationsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Navigation;
