import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

// Function to select an image from the gallery
export async function pickImage(): Promise<string | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    alert('Permission to access the gallery is required!');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }

  return null;
}

// Function to save a file to local storage
export async function saveFile(uri: string, fileName: string): Promise<string> {
  const directory = FileSystem.documentDirectory;
  if (!directory) {
    throw new Error('Local storage is not available.');
  }

  const destUri = `${directory}${fileName}`;
  await FileSystem.copyAsync({ from: uri, to: destUri });
  return destUri;
}

// Function to delete a file from local storage
export async function deleteFile(filePath: string): Promise<void> {
  await FileSystem.deleteAsync(filePath, { idempotent: true });
}

// Function to check if a file exists
export async function fileExists(filePath: string): Promise<boolean> {
  const fileInfo = await FileSystem.getInfoAsync(filePath);
  return fileInfo.exists;
}
