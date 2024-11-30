import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, ToastAndroid, Platform } from 'react-native';
import ImageSelector from '../components/ImageSelector';
import QuoteInput from '../components/QuoteInput';
import SaveButton from '../components/SaveButton';
import { initDatabase, loadMoment, saveMoment, Moment } from './database/database';
import { saveFile } from './utils/fileUtils';
import * as FileSystem from 'expo-file-system';

export default function MainScreen() {
  const [quote, setQuote] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    initDatabase().catch((error) =>
      console.error('Error initializing database:', error)
    );
    loadExistingData();
  }, []);

  const loadExistingData = async () => {
    try {
      const moment = await loadMoment();
      if (moment) {
        setQuote(moment.quote);
        setImage(moment.imageUri);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error loading moment:', error);
    }
  };

  const handleSave = async () => {
    if (!image || !quote.trim()) {
      alert('Please select an image and enter a quote');
      return;
    }

    try {
      // Generate a unique filename for the image
      const fileName = `moment_${Date.now()}.jpg`;
      const permanentUri = await saveFile(image, fileName);

      // Save to SQLite database
      await saveMoment(quote, permanentUri);
      setIsSaved(true);

      // If there was a previous image, we can delete it to save space
      if (image && image !== permanentUri) {
        try {
          await FileSystem.deleteAsync(image, { idempotent: true });
        } catch (error) {
          console.log('Error deleting temporary file:', error);
        }
      }

      // Show success feedback
      if (Platform.OS === 'android') {
        ToastAndroid.show('Moment saved successfully!', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Moment saved successfully!');
      }
    } catch (error) {
      console.error('Error saving moment:', error);
      alert('Failed to save your moment. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lab 7 - My Favourite Moment</Text>
      <ImageSelector image={image} setImage={setImage} />
      <QuoteInput quote={quote} setQuote={setQuote} />
      {!isSaved && <SaveButton onPress={handleSave} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
});
