import React from 'react';
import { Text, TextProps } from 'react-native';

/**
 * Props for the ThemedText component
 * Extends React Native's TextProps
 */
interface ThemedTextProps extends TextProps {
  /**
   * The text content to display
   */
  children: React.ReactNode;
}

/**
 * ThemedText Component
 * A wrapper around React Native's Text component with consistent styling
 * 
 * @component
 * @param {ThemedTextProps} props - Component props
 */
export const ThemedText: React.FC<ThemedTextProps> = ({ 
  children, 
  style, 
  ...props 
}) => {
  return (
    <Text
      style={[
        {
          color: '#333',
          fontSize: 16,
          lineHeight: 24,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}; 