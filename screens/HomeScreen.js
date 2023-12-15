import { useRef, useEffect } from 'react';
import { View, Text, Image, Button, Animated, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const fadein = useRef(new Animated.Value(0)).current;
  const buttonFade = useRef(new Animated.Value(0)).current;
  const buttonFade2 = useRef(new Animated.Value(0)).current;
  const buttonFade3 = useRef(new Animated.Value(0)).current;
  const buttonFade4 = useRef(new Animated.Value(0)).current;
  const logoFall = useRef(new Animated.Value(-200)).current;

  const startAnimation = () => {
    fadein.setValue(0);
    logoFall.setValue(-200);
    buttonFade.setValue(0);
    buttonFade2.setValue(0);
    buttonFade3.setValue(0);
    buttonFade4.setValue(0);

    Animated.timing(fadein, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(logoFall, {
      toValue: 0,
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

    Animated.timing(buttonFade4, {
      toValue: 1,
      duration: 1600,
      delay: 800,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startAnimation();
  }, [fadein, logoFall, buttonFade, buttonFade2]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SkySage</Text>
      <TouchableOpacity onPress={startAnimation}>
        <Animated.Image
          source={require('../assets/logo.png')}
          style={{
            width: 100,
            height: 100,
            marginVertical: 20,
            opacity: fadein,
            transform: [{ translateY: logoFall }],
          }}
        />
      </TouchableOpacity>
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
          onPress={() => navigation.navigate('Saved Locations')}
        />
      </Animated.View>
      <Animated.View
        style={{
          opacity: buttonFade4,
          transform: [
            {
              translateY: buttonFade4.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        }}>
        <Button
          title="About Page"
          onPress={() => navigation.navigate('About')}
        />
      </Animated.View>

    </View>
  );
};

export default HomeScreen;
