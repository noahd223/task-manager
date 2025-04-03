import React from 'react';
import { View, ViewProps } from 'react-native';

/**
 * Props for the ThemedView component
 * Extends React Native's ViewProps
 */
interface ThemedViewProps extends ViewProps {
  /**
   * The content to be rendered inside the view
   */
  children: React.ReactNode;
}

/**
 * ThemedView Component
 * A wrapper around React Native's View component with consistent styling
 * 
 * @component
 * @param {ThemedViewProps} props - Component props
 */
export const ThemedView: React.FC<ThemedViewProps> = ({ 
  children, 
  style, 
  ...props 
}) => {
  return (
    <View
      style={[
        {
          backgroundColor: '#fff',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}; 