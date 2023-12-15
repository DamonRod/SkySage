import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal } from 'react-native';
import { connect } from 'react-redux';
import { addLocation, removeLocation, clearAllLocations } from '../redux/actions';
import { globalStyles } from './styles';

const SavedLocationsScreen = ({ savedLocations, addLocation, removeLocation, clearAllLocations, navigation }) => {
  const [locationName, setLocationName] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleSaveLocation = () => {
    if (locationName.trim() !== '') {
      addLocation(locationName);
      setLocationName('');
    }
  };

  const handleRemoveLocation = (location) => {
    setSelectedLocation(location);
    setDeleteModalVisible(true);
  };

  const handleConfirmDeleteLocation = () => {
    if (selectedLocation) {
      removeLocation(selectedLocation);
      setDeleteModalVisible(false);
    }
  };

  const handleCancelDeleteLocation = () => {
    setDeleteModalVisible(false);
  };

  const handleClearAllLocations = () => {
    setConfirmationModalVisible(true);
  };

  const handleConfirmClearAllLocations = () => {
    clearAllLocations();
    setConfirmationModalVisible(false);
  };

  const handleCancelClearAllLocations = () => {
    setConfirmationModalVisible(false);
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
      <View style={{ marginBottom: 10 }} />

      <FlatList
        data={savedLocations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          item && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Button title={item.name} onPress={() => handleLocationPress(item.name)} />
              <Button title="Remove" onPress={() => handleRemoveLocation(item.name)} />
            </View>
          )
        )}
      />

      {savedLocations.length > 0 && (
        <Button style={globalStyles.button} title="Clear All Locations" onPress={handleClearAllLocations} />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmationModalVisible}
        onRequestClose={() => setConfirmationModalVisible(false)}
      >
        <View style={globalStyles.centeredModal}>
          <View style={globalStyles.modalContent}>
            <Text style={globalStyles.modalText}>Are you sure you want to clear all locations?</Text>
            <View style={globalStyles.modalButtons}>
              <Button title="Cancel" onPress={handleCancelClearAllLocations} />
              <Button title="Confirm" onPress={handleConfirmClearAllLocations} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={globalStyles.centeredModal}>
          <View style={globalStyles.modalContent}>
            <Text style={globalStyles.modalText}>Are you sure you want to delete this location?</Text>
            <View style={globalStyles.modalButtons}>
              <Button title="Cancel" onPress={handleCancelDeleteLocation} />
              <Button title="Delete" onPress={handleConfirmDeleteLocation} />
            </View>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedLocationsScreen);
