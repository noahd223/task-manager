import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Text } from 'react-native';

/**
 * Props for the Collapsible component
 * @interface CollapsibleProps
 * @property {string} title - The title text to display
 * @property {React.ReactNode} children - The content to be collapsed/expanded
 * @property {boolean} [defaultExpanded] - Whether the component should be expanded by default
 */
interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

/**
 * Collapsible Component
 * A component that can be expanded or collapsed to show/hide content
 * 
 * @component
 * @param {CollapsibleProps} props - Component props
 */
export const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
  defaultExpanded = false,
}) => {
  // State for tracking expansion status
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  // Animated value for rotation animation
  const [rotateAnimation] = useState(new Animated.Value(defaultExpanded ? 1 : 0));

  /**
   * Toggles the expanded state of the component
   * Animates the rotation of the arrow indicator
   */
  const toggleExpand = useCallback(() => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);
    
    Animated.spring(rotateAnimation, {
      toValue,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [isExpanded, rotateAnimation]);

  // Calculate rotation for the arrow indicator
  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={toggleExpand}
      >
        <Text style={styles.title}>{title}</Text>
        <Animated.Text style={[styles.arrow, { transform: [{ rotate }] }]}>
          ▼
        </Animated.Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
};

/**
 * Styles for the Collapsible component
 */
const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  arrow: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    padding: 15,
  },
}); 