import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Props for the HapticTab component
 */
interface HapticTabProps {
  /**
   * The text to display
   */
  children: React.ReactNode;
  /**
   * Callback function when pressed
   */
  onPress: () => void;
}

/**
 * HapticTab Component
 * A button component that provides haptic feedback when pressed
 * 
 * @component
 * @param {HapticTabProps} props - Component props
 */
export const HapticTab: React.FC<HapticTabProps> = ({ children, onPress }) => {
  const handlePress = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    } catch (error) {
      console.error('Error triggering haptic feedback:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

/**
 * Styles for the HapticTab component
 */
const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
}); 