import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, Pressable, Alert } from 'react-native';
import { connect } from 'react-redux';
import { addLocation, removeLocation, clearAllLocations } from '../redux/actions';
import { globalStyles, colors } from './styles';

const SavedLocationsScreen = ({ savedLocations, addLocation, removeLocation, clearAllLocations, navigation }) => {
  const [locationName, setLocationName] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSaveLocation = () => {
    if (locationName.trim() !== '') {
      addLocation(locationName);
      setLocationName('');
    }
  };

  const handleRemoveLocation = (location) => {
    removeLocation(location);
  };

  const handleClearAllLocations = () => {
    Alert.alert(
      'Clear All Locations',
      'Are you sure you want to remove all saved locations?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            clearAllLocations();
          },
        },
      ],
      { cancelable: true }
    );
  };
  

  const handleLocationPress = (location) => {
    setSelectedLocation(location);
    setLocationName(location);
    navigation.navigate('Current Weather', { city: location, clearForm: true });
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Saved Locations</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Enter Location Name"
        value={locationName}
        onChangeText={(text) => setLocationName(text)}
      />
      <Button
        style={globalStyles.button}
        title="Save Location"
        onPress={handleSaveLocation}
      />

      <FlatList
        data={savedLocations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          item && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button title={item.name} onPress={() => handleLocationPress(item.name)} />
              <Button title="Remove" onPress={() => handleRemoveLocation(item.name)} />
            </View>
          )
        )}
      />

      {savedLocations.length > 0 && (
        <Button style={globalStyles.button} title="Clear All Locations" onPress={handleClearAllLocations} />
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  savedLocations: state.savedLocations,
});

const mapDispatchToProps = {
  addLocation,
  removeLocation,
  clearAllLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedLocationsScreen);
