import { StyleSheet } from 'react-native';

export const colors = {
  green: '#4CAF50',
  primary: '#78e1e9',
  secondary: '#e4d155',
  error: '#ff0000',
  black: '#000000',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b1d697',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.black,
  },
  input: {
    height: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    color: colors.error,
    marginBottom: 16,
  },
  forecastItem: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
