import React from 'react';
import { Linking, TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * Props for the ExternalLink component
 */
interface ExternalLinkProps {
  /**
   * The URL to open when pressed
   */
  href: string;
  /**
   * The text to display
   */
  children: React.ReactNode;
}

/**
 * ExternalLink Component
 * A component that opens external URLs in the device's browser
 * 
 * @component
 * @param {ExternalLinkProps} props - Component props
 */
export const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children }) => {
  const handlePress = async () => {
    try {
      await Linking.openURL(href);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.link}>{children}</Text>
    </TouchableOpacity>
  );
};

/**
 * Styles for the ExternalLink component
 */
const styles = StyleSheet.create({
  link: {
    color: '#2e78b7',
    textDecorationLine: 'underline',
  },
}); 