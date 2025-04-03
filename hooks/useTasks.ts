import { useState, useCallback } from 'react';
import { Animated } from 'react-native';

// Types
/**
 * Interface defining the structure of a task item
 */
interface TaskItem {
  /** Unique identifier for the task */
  id: string;
  /** The content/description of the task */
  text: string;
  /** Whether the task is marked as completed */
  completed: boolean;
}

/**
 * Type for task filter options
 */
type TaskFilter = 'all' | 'active' | 'completed';

// Constants
const ANIMATION_CONFIG = {
  tension: 50,
  friction: 7,
  useNativeDriver: false,
} as const;

/**
 * Custom hook for managing tasks and their state
 * Provides functionality for adding, toggling, deleting, and filtering tasks
 * Also manages the progress bar animation state
 * 
 * @returns {Object} Object containing tasks state and task management functions
 */
export const useTasks = () => {
  // State
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [progress] = useState(new Animated.Value(0));
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  // Progress calculation
  const calculateProgress = useCallback((updatedTasks: TaskItem[]) => {
    const completedCount = updatedTasks.filter(t => t.completed).length;
    return updatedTasks.length > 0 ? completedCount / updatedTasks.length : 0;
  }, []);

  // Progress animation
  const updateProgress = useCallback((updatedTasks: TaskItem[]) => {
    const progressValue = calculateProgress(updatedTasks);
    Animated.spring(progress, {
      toValue: progressValue,
      ...ANIMATION_CONFIG,
    }).start();
  }, [progress, calculateProgress]);

  // Task management functions
  const addTask = useCallback((text: string) => {
    const newTask: TaskItem = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    updateProgress(updatedTasks);
  }, [tasks, updateProgress]);

  const toggleTask = useCallback((id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    updateProgress(updatedTasks);
  }, [tasks, updateProgress]);

  const deleteTask = useCallback((id: string) => {
    // Set the task as being deleted to trigger animation
    setDeletingTaskId(id);
    
    // Remove the task after animation completes
    setTimeout(() => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      updateProgress(updatedTasks);
      setDeletingTaskId(null);
    }, 200); // Match the animation duration
  }, [tasks, updateProgress]);

  const filterTasks = useCallback((filter: TaskFilter) => {
    return tasks.filter(task => {
      switch (filter) {
        case 'active':
          return !task.completed;
        case 'completed':
          return task.completed;
        default:
          return true;
      }
    });
  }, [tasks]);

  const getCompletedCount = useCallback(() => {
    return tasks.filter(task => task.completed).length;
  }, [tasks]);

  // Return values
  return {
    tasks,
    progress,
    deletingTaskId,
    addTask,
    toggleTask,
    deleteTask,
    filterTasks,
    getCompletedCount,
  };
}; 