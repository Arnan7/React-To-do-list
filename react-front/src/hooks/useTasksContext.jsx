import { useContext } from 'react';
import { TasksContext } from '../context/TasksContext';

export function useTasksContext() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasksContext debe ser usado dentro de un TasksProvider');
  }
  return context;
}
