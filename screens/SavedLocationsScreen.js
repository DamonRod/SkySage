// screens/SavedLocationsScreen.js
import React from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { addLocation, removeLocation, clearAllLocations } from '../redux/actions';

const SavedLocationsScreen = ({ savedLocations, addLocation, removeLocation, clearAllLocations, navigation }) => {
    const [locationName, setLocationName] = React.useState('');

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
        clearAllLocations();
    };

    const handleLocationPress = (location) => {
        navigation.navigate('Current Weather', { city: location });
    };

    console.log('savedLocations:', savedLocations); // Log the savedLocations array

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
                            <Button title="Remove" onPress={() => handleRemoveLocation(item.name)} />
                        </View>
                    )
                )}
            />

            {savedLocations.length > 0 && (
                <Button title="Clear All Locations" onPress={handleClearAllLocations} />
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
