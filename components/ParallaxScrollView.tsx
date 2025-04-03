import React from 'react';
import { ScrollView, Animated, StyleSheet, ViewStyle } from 'react-native';

/**
 * Props for the ParallaxScrollView component
 */
interface ParallaxScrollViewProps {
  /**
   * The content to be rendered inside the scroll view
   */
  children: React.ReactNode;
  /**
   * The header component to be rendered with parallax effect
   */
  header: React.ReactNode;
  /**
   * The height of the header component
   */
  headerHeight: number;
  /**
   * Additional styles for the container
   */
  style?: ViewStyle;
}

/**
 * ParallaxScrollView Component
 * A scroll view component that provides a parallax effect for its header
 * 
 * @component
 * @param {ParallaxScrollViewProps} props - Component props
 */
export const ParallaxScrollView: React.FC<ParallaxScrollViewProps> = ({
  children,
  header,
  headerHeight,
  style,
}) => {
  // Create animated value for parallax effect
  const scrollY = new Animated.Value(0);

  // Calculate header transform
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  // Calculate header scale
  const headerScale = scrollY.interpolate({
    inputRange: [-headerHeight, 0, headerHeight],
    outputRange: [1.5, 1, 0.8],
    extrapolate: 'clamp',
  });

  return (
    <Animated.ScrollView
      style={[styles.container, style]}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
    >
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            transform: [
              { translateY: headerTranslateY },
              { scale: headerScale },
            ],
          },
        ]}
      >
        {header}
      </Animated.View>
      {children}
    </Animated.ScrollView>
  );
};

/**
 * Styles for the ParallaxScrollView component
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
}); 