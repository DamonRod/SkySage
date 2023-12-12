import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, Pressable } from 'react-native';
import { connect } from 'react-redux';
import { addLocation, removeLocation, clearAllLocations, updateLocationName } from '../redux/actions';

const SavedLocationsScreen = ({ savedLocations, addLocation, removeLocation, clearAllLocations, updateLocationName, navigation }) => {
  const [locationName, setLocationName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
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
  
  const handleEditLocation = (location) => {
    setSelectedLocation(location);
    setModalVisible(true);
    setLocationName(location); // Set the location name in the modal input to the current name
  };

  const handleUpdateLocationName = () => {
    if (selectedLocation && locationName.trim() !== '') {
      updateLocationName(selectedLocation, locationName);
      setModalVisible(false);
      setSelectedLocation(null);
      setLocationName('');
    }
  };

  const handleClearAllLocations = () => {
    clearAllLocations();
  };

  const handleLocationPress = (location) => {
    setSelectedLocation(location);
    setModalVisible(true);
    // Set the location name in the modal input to the current name
    setLocationName(location);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedLocation(null);
    setLocationName('');
  };

  return (
    <View>
      <Text>Saved Locations</Text>
      <TextInput
        placeholder="Enter Location Name"
        value={locationName}
        onChangeText={(text) => setLocationName(text)}
      />
      <Button title="Save Location" onPress={handleSaveLocation} />

      {/* Render saved locations */}
      <FlatList
        data={savedLocations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          item && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button title={item.name} onPress={() => handleLocationPress(item.name)} />
              <Button title="Edit" onPress={() => handleEditLocation(item.name)} /> {/* Add this line */}
              <Button title="Remove" onPress={() => handleRemoveLocation(item.name)} />
            </View>
          )
        )}
      />

      {savedLocations.length > 0 && (
        <Button title="Clear All Locations" onPress={handleClearAllLocations} />
      )}

      {/* Modal for updating location name */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
            <Text>Edit Location Name</Text>
            <TextInput
              placeholder="Enter New Name"
              value={locationName}
              onChangeText={(text) => setLocationName(text)}
            />
            <Pressable onPress={handleUpdateLocationName}>
              <Text>Update</Text>
            </Pressable>
            <Pressable onPress={closeModal}>
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  updateLocationName,
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedLocationsScreen);
