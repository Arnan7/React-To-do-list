// src/context/TasksContext.jsx
import useTasks from '../hooks/useTasks';
import { createContext } from 'react';

export const TasksContext = createContext();

// 2. Crear el Proveedor del Contexto
export function TasksProvider({ children }) {
  // Usamos el hook useTasks que ya tiene toda la lógica
  const tasksData = useTasks();

  return (
    <TasksContext.Provider value={tasksData}>
      {children}
    </TasksContext.Provider>
  );
}
