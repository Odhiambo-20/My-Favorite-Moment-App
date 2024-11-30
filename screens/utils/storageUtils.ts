import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to save data to AsyncStorage
export async function saveToStorage(key: string, value: any): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
}

// Function to retrieve data from AsyncStorage
export async function getFromStorage<T>(key: string): Promise<T | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? (JSON.parse(jsonValue) as T) : null;
  } catch (error) {
    console.error('Error retrieving from storage:', error);
    return null;
  }
}

// Function to remove data from AsyncStorage
export async function removeFromStorage(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from storage:', error);
  }
}

// Function to clear all AsyncStorage data
export async function clearStorage(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
}
