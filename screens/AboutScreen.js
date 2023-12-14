import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';

const AboutScreen = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleEasterEggPress = () => {
    setShowEasterEgg(!showEasterEgg);
    if (!showEasterEgg) {
      Alert.alert('Easter Egg Found!', 'Congratulations, you found the Easter egg!');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>About SkySage</Text>
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 100, height: 100, marginBottom: 20 }}
      />
      <Text style={{ marginHorizontal: 45, textAlign: 'justify', marginBottom: 20 }}>
        SkySage is a weather app designed to provide users with up-to-date weather conditions.
        How did we choose this name? When thinking of a name, we also needed a color scheme for the app.
        Sage, which means a person endowed with wisdom and knowledge, pairing it with sky would mean
        knowledge about the sky, weather in this case. It also happens to be a color that is like a light 
        green that is unsaturated. And another major part that inspired this app and its name was Sage from 
        the video game Valorant, which inspired us to use the color scheme.
      </Text>

      <Text style={{ marginTop: 20 }}>
        Developed by Damon, Marc, and James
      </Text>
      <TouchableOpacity onPress={handleEasterEggPress}>
        <Text style={{ color: 'rgba(0, 0, 0, 0.2)' }}>🐣</Text>
      </TouchableOpacity>
      {showEasterEgg && (
        <View>
          <Image
            source={{ uri: 'https://c.tenor.com/bdXrzy-_-LMAAAAd/tenor.gif' }}
            style={{ marginTop: 10, width: 200, height: 200 }}
          />
        </View>
      )}
    </View>
  );
};

export default AboutScreen;
