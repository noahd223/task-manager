import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';

// Types
/**
 * Props for the TaskInput component
 */
interface TaskInputProps {
  /** Callback function when a new task is added */
  onAddTask: (text: string) => void;
  /** Whether the input should be disabled */
  disabled?: boolean;
}

// Component
/**
 * TaskInput Component
 * Provides an input field for adding new tasks with animations and validation
 */
export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, disabled = false }) => {
  // State
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Animation refs
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const inputRef = useRef<TextInput>(null);

  // Handlers
  /**
   * Handles the press in animation for the add button
   */
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 40,
      friction: 3,
    }).start();
  };

  /**
   * Handles the press out animation for the add button
   */
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 40,
      friction: 3,
    }).start();
  };

  /**
   * Handles adding a new task
   * Validates input and clears the field after adding
   */
  const handleAddTask = () => {
    const trimmedText = text.trim();
    if (trimmedText && !disabled) {
      onAddTask(trimmedText);
      setText('');
      inputRef.current?.blur();
    }
  };

  /**
   * Handles the submit event of the text input
   * Triggers task addition when the return key is pressed
   */
  const handleSubmit = () => {
    handleAddTask();
  };

  // Effect to handle disabled state
  useEffect(() => {
    if (disabled) {
      inputRef.current?.blur();
    }
  }, [disabled]);

  // Render
  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          disabled && styles.inputDisabled,
        ]}
        value={text}
        onChangeText={setText}
        placeholder="Add a new task..."
        placeholderTextColor="#999"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSubmit}
        editable={!disabled}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[styles.addButton, disabled && styles.addButtonDisabled]}
        onPress={handleAddTask}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        <Animated.Text
          style={[
            styles.addButtonText,
            { transform: [{ scale: scaleAnim }] },
            disabled && styles.addButtonTextDisabled,
          ]}
        >
          +
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    color: '#999',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 32,
  },
  addButtonTextDisabled: {
    color: '#999',
  },
}); 