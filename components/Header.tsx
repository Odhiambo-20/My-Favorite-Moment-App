import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface HeaderProps {
  title: string; // The title displayed in the header
  onBackPress?: () => void; // Function for back button press (optional)
  onMenuPress?: () => void; // Function for menu button press (optional)
  onRightIconPress?: () => void; // Function for the right-side icon press (optional)
  rightIcon?: any; // Optional custom right-side icon
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  onMenuPress,
  onRightIconPress,
  rightIcon,
}) => {
  return (
    <View style={styles.container}>
      {/* Left Section (Back or Menu Button) */}
      {onBackPress ? (
        <TouchableOpacity onPress={onBackPress} style={styles.iconContainer}>
          <Image
            source={require('./assets/back-icon.png')} // Replace with your back icon
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : onMenuPress ? (
        <TouchableOpacity onPress={onMenuPress} style={styles.iconContainer}>
          <Image
            source={require('./assets/menu-icon.png')} // Replace with your menu icon
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}

      {/* Title Section */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Section (Optional Icon) */}
      {rightIcon && onRightIconPress ? (
        <TouchableOpacity onPress={onRightIconPress} style={styles.iconContainer}>
          <Image source={rightIcon} style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#4CAF50', // Adjust to match your app theme
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconContainer: {
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  spacer: {
    width: 40, // Width to balance the layout
  },
});

export default Header;
