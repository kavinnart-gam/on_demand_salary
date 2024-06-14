import AsyncStorage from '@react-native-async-storage/async-storage';

interface SetDataAsyncStoragePropTypes {
  key: string;
  value: string;
}

interface SetObjectAsyncStoragePropTypes {
  key: string;
  value: unknown;
}

interface GetDataAsyncStoragePropTypes {
  key: string;
}

interface GetObjectAsyncStoragePropTypes {
  key: string;
}

interface RemoveDataAsyncStoragePropTypes {
  key: string;
}

const setDataToAsyncStorage = async ({
  key,
  value,
}: SetDataAsyncStoragePropTypes) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('set data to async storage error : ', error);
  }
};

const setObjectToAsyncStorage = async ({
  key,
  value,
}: SetObjectAsyncStoragePropTypes) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log('set object to async storage error : ', error);
  }
};

const getDataFromAsyncStorage = async ({key}: GetDataAsyncStoragePropTypes) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? value : null;
  } catch (error) {
    console.log('get data from async storage : ', error);
  }
};

const getObjectFromAsyncStorage = async ({
  key,
}: GetObjectAsyncStoragePropTypes) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log('get object from async storage : ', error);
  }
};

const removeDataToAsyncStorage = async ({
  key,
}: RemoveDataAsyncStoragePropTypes) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('remove data to async storage : ', error);
  }
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    // clear error
    console.log('async storage clearAll : ', error);
  }

  console.log('Done.');
};

export default {
  setDataToAsyncStorage,
  setObjectToAsyncStorage,
  getDataFromAsyncStorage,
  getObjectFromAsyncStorage,
  removeDataToAsyncStorage,
  clearAll,
};
