import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

// Open database (or return null for web platform)
const db = Platform.OS === 'web' ? null : SQLite.openDatabaseSync('moments.db');

export interface Moment {
  id: number;
  quote: string;
  imageUri: string;
}

// Initialize database
export const initDatabase = async (): Promise<void> => {
  if (!db) {
    console.warn('SQLite is not available on the web platform');
    return;
  }

  try {
    db.execSync(
      'CREATE TABLE IF NOT EXISTS moments (id INTEGER PRIMARY KEY NOT NULL, quote TEXT, imageUri TEXT);'
    );
  } catch (error) {
    console.error('Error creating table:', error);
    throw error;
  }
};

// Save a moment
export const saveMoment = async (quote: string, imageUri: string): Promise<void> => {
  if (!db) {
    console.warn('SQLite is not available on the web platform');
    return;
  }

  try {
    db.runSync(
      'INSERT INTO moments (quote, imageUri) VALUES (?, ?);',
      [quote, imageUri]
    );
  } catch (error) {
    console.error('Error saving moment:', error);
    throw error;
  }
};

// Load the most recent moment
export const loadMoment = async (): Promise<Moment | null> => {
  if (!db) {
    console.warn('SQLite is not available on the web platform');
    return null;
  }

  try {
    const result = db.getFirstSync(
      'SELECT * FROM moments ORDER BY id DESC LIMIT 1;'
    );
    
    return result ? result as Moment : null;
  } catch (error) {
    console.error('Error loading moment:', error);
    throw error;
  }
};