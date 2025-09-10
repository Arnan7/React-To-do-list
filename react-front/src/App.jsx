// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FavoriteTasksPage from './pages/FavoriteTasksPage';
import CompletedTasksPage from './pages/CompletedTasksPage';
import CategoryFilter from './components/CategoryFilter';
import { useTasksContext } from './hooks/useTasksContext';

/**
 * Componente principal de la aplicación.
 * Configura el enrutamiento y renderiza las diferentes vistas.
 * El estado de las tareas se gestiona a través de `TasksContext`.
 */
function App() {
  const { filteredTasks, allTasks, filtroCategoria, agregarTarea, setFiltroCategoria, eliminarTarea, guardarCambios, toggleFavorita, toggleCompletada, filtroFecha, setFiltroFecha } = useTasksContext();

  // Filtra las tareas para separar solo las tareas no completadas
  const tareasPendientes = filteredTasks.filter(tarea => !tarea.completada && (filtroCategoria === 'todas' || tarea.categoria === filtroCategoria));

  return (
    <Router>
      <div>
        {/* Barra de navegación para cambiar entre las vistas de tareas */}
        <nav>
          <Link to="/">Tareas Pendientes</Link> | <Link to="/favorites">Tareas Favoritas</Link> | <Link to="/completed">Tareas Completadas</Link>
        </nav>
        <hr />
        {/* Definición de las rutas de la aplicación */}
        <Routes>
          {/* Ruta principal para mostrar solo las tareas pendientes */}
          <Route path="/" element={
            <>
              <h1>Lista de Tareas Pendientes</h1>
              <TaskForm onAddTask={agregarTarea} />
              <CategoryFilter
                setFiltroCategoria={setFiltroCategoria}
                filtroCategoria={filtroCategoria}
                setFiltroFecha={setFiltroFecha}
                filtroFecha={filtroFecha}
              />
              <TaskList
                tareas={tareasPendientes}
                eliminarTarea={eliminarTarea}
                guardarCambios={guardarCambios}
                toggleFavorita={toggleFavorita}
                toggleCompletada={toggleCompletada}
              />
            </>
          } />
          {/* Ruta para mostrar solo las tareas favoritas */}
          <Route path="/favorites" element={<FavoriteTasksPage />} />
          {/* Ruta para mostrar solo las tareas completadas */}
          <Route path="/completed" element={<CompletedTasksPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
