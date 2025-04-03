import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

/**
 * Props for the HelloWave component
 */
interface HelloWaveProps {
  /**
   * The name to display in the greeting
   */
  name?: string;
}

/**
 * HelloWave Component
 * A component that displays a greeting with a waving animation
 * 
 * @component
 * @param {HelloWaveProps} props - Component props
 */
export const HelloWave: React.FC<HelloWaveProps> = ({ name = 'there' }) => {
  // Create animated value for wave animation
  const waveAnimation = new Animated.Value(0);

  // Start wave animation
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Calculate rotation for wave animation
  const rotate = waveAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '20deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hello, {name}!{' '}
        <Animated.Text style={{ transform: [{ rotate }] }}>👋</Animated.Text>
      </Text>
    </View>
  );
};

/**
 * Styles for the HelloWave component
 */
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 