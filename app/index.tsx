import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Task } from '../components/Task';
import { TaskInput } from '../components/TaskInput';
import { useTasks } from '../hooks/useTasks';

/**
 * Type definition for task filtering options
 */
type FilterType = 'all' | 'active' | 'completed';

/**
 * FilterButton Component
 * 
 * A reusable button component for filtering tasks by their completion status.
 * Provides visual feedback for the active filter state.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.label - Text to display on the button
 * @param {boolean} props.isActive - Whether this filter is currently selected
 * @param {Function} props.onPress - Callback function when button is pressed
 */
const FilterButton: React.FC<{
  label: string;
  isActive: boolean;
  onPress: () => void;
}> = ({ label, isActive, onPress }) => (
  <TouchableOpacity 
    style={[styles.filterButton, isActive && styles.filterButtonActive]}
    onPress={onPress}
  >
    <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

/**
 * Task Manager App
 * Manages tasks with filtering and animations
 */
export default function App() {
  // State for current filter selection
  const [filter, setFilter] = useState<FilterType>('all');
  
  // Custom hook for task management
  const {
    tasks,
    deletingTaskId,
    addTask,
    toggleTask,
    deleteTask,
    filterTasks,
  } = useTasks();

  // Derived state: filtered tasks based on current filter
  const filteredTasks = filterTasks(filter);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* App Title */}
          <Text style={styles.title}>Task Manager</Text>
          
          {/* Task Input Component */}
          <TaskInput onAddTask={addTask} />
          
          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            <FilterButton
              label="All"
              isActive={filter === 'all'}
              onPress={() => setFilter('all')}
            />
            <FilterButton
              label="Active"
              isActive={filter === 'active'}
              onPress={() => setFilter('active')}
            />
            <FilterButton
              label="Completed"
              isActive={filter === 'completed'}
              onPress={() => setFilter('completed')}
            />
          </View>
          
          {/* Scrollable Task List */}
          <ScrollView 
            style={styles.taskList}
            contentContainerStyle={styles.taskListContent}
            showsVerticalScrollIndicator={false}
          >
            {filteredTasks.map((task) => (
              <Task
                key={task.id}
                {...task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                isDeleting={task.id === deletingTaskId}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterButtonActive: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  taskList: {
    flex: 1,
  },
  taskListContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
}); 