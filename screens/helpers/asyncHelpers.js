import { AsyncStorage } from 'react-native';

const storeData = async (key, value, errCB) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Successfully stored!!');
  } catch (error) {
    // Error saving data
    return errCB();
  }
};

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      console.log('Success!!!', value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
    console.error(error);
  }
};

const storeMulti = async (array, errCB) => {
  try {
    await AsyncStorage.multiSet(array);
    console.log('Successfully stored!!');
  } catch (error) {
    // Error storing data
    return errCB();
  }
};

const getMulti = async (array, CB, errCB) => {
  try {
    const value = await AsyncStorage.getItem(array);
    if (value !== null) {
      // We have data!!
      console.log('Success!!!', value);
      return value;
    }
    return errCB();
  } catch (error) {
    // Error retrieving data
    return errCB();
  }
};

export { storeData, getData, storeMulti, getMulti };
