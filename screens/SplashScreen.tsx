import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

export default function SplashScreen({ navigation }: { navigation: any }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Replace 'Home' with your main screen's name
    }, 3000); // Adjust the delay as needed (e.g., 3000ms = 3 seconds)

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/placeholder.png')} // Replace with your logo path
        style={styles.logo}
      />
      <Text style={styles.title}>My Favourite Moment</Text>
      <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4caf50', // Background color (adjust to your theme)
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
});
