import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform, Easing } from 'react-native';

// Types
/**
 * Props for the Task component
 */
interface TaskProps {
  // Unique identifier for the task
  id: string;
  // The text content of the task
  text: string;
  // Whether the task is completed
  completed: boolean;
  // Callback function when task is toggled between completed and active
  onToggle: (id: string) => void;
  // Callback function when task is deleted
  onDelete: (id: string) => void;
  // Whether the task is being deleted (for animation)
  isDeleting?: boolean;
}

// Component
/**
 * Task Component
 * Displays a single task with completion toggle and delete functionality
 * Includes animations for press feedback and deletion
 */
export const Task: React.FC<TaskProps> = ({
  id,
  text,
  completed,
  onToggle,
  onDelete,
  isDeleting = false,
}) => {
  // Animation refs
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  // Handlers
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.85,
      useNativeDriver: true,
      tension: 40,
      friction: 2,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 40,
      friction: 2,
    }).start();
  };

  // Deletion animation effect
  useEffect(() => {
    if (isDeleting) {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        onDelete(id);
      });
    }
  }, [isDeleting, id, onDelete]);

  // Render
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.content}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onToggle(id)}
      >
        <View style={[styles.checkbox, completed && styles.checkboxChecked]}>
          {completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[styles.text, completed && styles.textCompleted]}>
          {text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(id)}
      >
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    minHeight: 60,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    ...Platform.select({
      ios: { marginTop: -5 },
      android: { marginTop: 0 },
    }),
  },
  deleteText: {
    fontSize: 28,
    color: '#f44336',
    lineHeight: 28,
  },
}); 