export const addLocation = (locationName) => ({
  type: 'ADD_LOCATION',
  payload: { name: locationName },
});

export const removeLocation = (locationName) => ({
  type: 'REMOVE_LOCATION',
  payload: { name: locationName },
});

export const clearAllLocations = () => ({
  type: 'CLEAR_ALL_LOCATIONS',
});
