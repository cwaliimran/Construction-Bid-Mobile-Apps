import AsyncStorage from '@react-native-async-storage/async-storage';

const checkValue = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('Error reading value', error);
  }
};

// Example usage
checkValue('userId');
checkValue('token');
