const initialState = {
  savedLocations: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LOCATION':
      return {
        ...state,
        savedLocations: [...state.savedLocations, action.payload],
      };

    case 'REMOVE_LOCATION':
      return {
        ...state,
        savedLocations: state.savedLocations.filter(location => location.name !== action.payload.name),
      };

    case 'CLEAR_ALL_LOCATIONS':
      return {
        ...state,
        savedLocations: [],
      };

    default:
      return state;
  }
};

export default reducer;