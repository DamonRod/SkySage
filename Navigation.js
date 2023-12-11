import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import WeatherScreen from './screens/CurrentWeatherScreen';
import ForecastScreen from './screens/ForecastScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="SkySage" component={HomeScreen} />
        <Tab.Screen name="Current Weather" component={WeatherScreen} />
        <Tab.Screen name="Weather Forecast" component={ForecastScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
