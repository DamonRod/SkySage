import { useRef, useEffect } from 'react';
import { View, Text, Image, Button, Animated } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const fadein = useRef(new Animated.Value(0)).current;
  const buttonFade = useRef(new Animated.Value(0)).current;
  const buttonFade2 = useRef(new Animated.Value(0)).current;
  const buttonFade3 = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(fadein, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(buttonFade, {
      toValue: 1,
      duration: 1000,
      delay: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(buttonFade2, {
      toValue: 1,
      duration: 1200,
      delay: 600,
      useNativeDriver: true,
    }).start();

    Animated.timing(buttonFade3, {
      toValue: 1,
      duration: 1400,
      delay: 700,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startAnimation();
  }, [fadein, buttonFade, buttonFade2]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SkySage</Text>
      <Animated.Image
        source={require('../assets/logo.png')}
        style={{
          width: 100,
          height: 100,
          marginVertical: 20,
          opacity: fadein,
        }}
      />
      <Animated.View
        style={{
          opacity: buttonFade,
          transform: [
            {
              translateY: buttonFade.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        }}>
        <Button
          title="Current Weather"
          color="#78e1e9"
          onPress={() => navigation.navigate('Current Weather')}
        />
      </Animated.View>
      <Animated.View
        style={{
          opacity: buttonFade2,
          transform: [
            {
              translateY: buttonFade2.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        }}>
        <Button
          title="Weather Forecast"
          color="#78e1e9"
          onPress={() => navigation.navigate('Weather Forecast')}
        />
      </Animated.View>
      <Animated.View
        style={{
          opacity: buttonFade3,
          transform: [
            {
              translateY: buttonFade3.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        }}>
        <Button
          title="Saved Locations"
          color="#78e1e9"
          onPress={() => navigation.navigate('Saved Locations')}
        />
      </Animated.View>      
    </View>
  );
};

export default HomeScreen;
