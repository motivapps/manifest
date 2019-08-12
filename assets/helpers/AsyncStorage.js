import { AsyncStorage } from 'react-native';

const storeData = async (key, value, callback, errCB) => {
  try {
    await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
    // return callback ? callback(value) : value;
    console.log('Successfully stored!!');
  } catch (error) {
    // Error saving data
    return errCB();
  }
};

const retrieveData = async (key, callback, errCB) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      console.log('Success!!!', value);
      return callback ? callback(value) : value;
    }
  } catch (error) {
    // Error retrieving data
    return errCB();
  }
};

export default {
  storeData,
  retrieveData,
};
