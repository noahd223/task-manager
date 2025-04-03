import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';

interface TaskProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({ id, text, completed, onToggle, onDelete }) => {
  // Animation value for task press feedback
  const [scale] = React.useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 40,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 40,
      friction: 3,
    }).start();
  };

  return (
    <Animated.View style={[styles.taskContainer, { transform: [{ scale }] }]}>
      <TouchableOpacity
        style={[styles.checkbox, completed && styles.checked]}
        onPress={() => onToggle(id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <Text style={[styles.taskText, completed && styles.completedTask]}>
        {text}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    minHeight: 60, // Ensure minimum height for consistent layout
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginRight: 10, // Add space between text and delete button
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        marginTop: -2, // Slight adjustment for iOS to center the X
      },
      android: {
        marginTop: 0,
      },
    }),
  },
  deleteText: {
    color: '#FF3B30',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 28, // Match font size to ensure vertical centering
  },
});

export default Task; 