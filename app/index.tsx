import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Animated, SafeAreaView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Task } from '../components/Task';
import TaskInput from '../components/TaskInput';
import { useTasks } from '../hooks/useTasks';

// Types
type FilterType = 'all' | 'active' | 'completed';

// Components
/**
 * Progress Bar Component
 * Displays an animated progress bar based on task completion
 */
const ProgressBar: React.FC<{ progress: Animated.Value }> = ({ progress }) => {
  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressBar}>
      <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
    </View>
  );
};

/**
 * Filter Button Component
 * Renders a button for filtering tasks
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

// Main App Component
/**
 * Task Manager App
 * Manages tasks with filtering, progress tracking, and animations
 */
export default function App() {
  // State
  const [filter, setFilter] = useState<FilterType>('all');
  
  // Custom hook for task management
  const {
    tasks,
    progress,
    deletingTaskId,
    addTask,
    toggleTask,
    deleteTask,
    filterTasks,
    getCompletedCount,
  } = useTasks();

  // Derived state
  const filteredTasks = filterTasks(filter);
  const completedTasks = getCompletedCount();

  // Render
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Task Manager</Text>
          
          <View style={styles.progressContainer}>
            <ProgressBar progress={progress} />
            <Text style={styles.progressText}>
              {tasks.length > 0 
                ? `${completedTasks} of ${tasks.length} tasks completed`
                : 'No tasks yet'}
            </Text>
          </View>
          
          <TaskInput onAddTask={addTask} />
          
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

// Styles
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
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
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