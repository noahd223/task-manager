import { useState, useCallback } from 'react';
import { Animated } from 'react-native';

/**
 * Interface defining the structure of a task item
 * @property {string} id - Unique identifier for the task
 * @property {string} text - The content/description of the task
 * @property {boolean} completed - Whether the task is marked as completed
 */
interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
}

/**
 * Custom hook for managing tasks and their state
 * Provides functionality for adding, toggling, deleting, and filtering tasks
 * Also manages the progress bar animation state
 * 
 * @returns {Object} Object containing tasks state and task management functions
 */
export const useTasks = () => {
  // State for storing all tasks
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  // Animated value for progress bar
  const [progress] = useState(new Animated.Value(0));

  /**
   * Updates the progress bar animation based on task completion ratio
   * @param {TaskItem[]} updatedTasks - The current list of tasks
   */
  const updateProgress = useCallback((updatedTasks: TaskItem[]) => {
    // Calculate completion ratio
    const completedCount = updatedTasks.filter(t => t.completed).length;
    const progressValue = updatedTasks.length > 0 ? completedCount / updatedTasks.length : 0;
    
    // Animate progress bar with spring animation
    Animated.spring(progress, {
      toValue: progressValue,
      useNativeDriver: false,
      tension: 50,
      friction: 7,
    }).start();
  }, [progress]);

  /**
   * Adds a new task to the list
   * @param {string} text - The content of the new task
   */
  const addTask = useCallback((text: string) => {
    // Create new task with unique ID
    const newTask: TaskItem = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    // Update tasks state and progress
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    updateProgress(updatedTasks);
  }, [tasks, updateProgress]);

  /**
   * Toggles the completion status of a task
   * @param {string} id - The ID of the task to toggle
   */
  const toggleTask = useCallback((id: string) => {
    // Update task completion status
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    updateProgress(updatedTasks);
  }, [tasks, updateProgress]);

  /**
   * Deletes a task from the list
   * @param {string} id - The ID of the task to delete
   */
  const deleteTask = useCallback((id: string) => {
    // Remove task and update state
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    updateProgress(updatedTasks);
  }, [tasks, updateProgress]);

  /**
   * Filters tasks based on completion status
   * @param {'all' | 'active' | 'completed'} filter - The filter type to apply
   * @returns {TaskItem[]} Filtered list of tasks
   */
  const filterTasks = useCallback((filter: 'all' | 'active' | 'completed') => {
    return tasks.filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });
  }, [tasks]);

  /**
   * Gets the count of completed tasks
   * @returns {number} Number of completed tasks
   */
  const getCompletedCount = useCallback(() => {
    return tasks.filter(task => task.completed).length;
  }, [tasks]);

  // Return all necessary state and functions
  return {
    tasks,
    progress,
    addTask,
    toggleTask,
    deleteTask,
    filterTasks,
    getCompletedCount,
  };
}; 