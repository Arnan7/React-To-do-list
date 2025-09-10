// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FavoriteTasksPage from './pages/FavoriteTasksPage';
import CompletedTasksPage from './pages/CompletedTasksPage';
import CategoryFilter from './components/CategoryFilter';
import { useTasksContext } from './hooks/useTasksContext';

function App() {
  const { filteredTasks, agregarTarea, setFiltroCategoria, filtroCategoria, eliminarTarea, guardarCambios, toggleFavorita, toggleCompletada, filtroFecha, setFiltroFecha } = useTasksContext();

  const tareasPendientes = filteredTasks.filter(tarea => !tarea.completada && (filtroCategoria === 'todas' || tarea.categoria === filtroCategoria));

  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <Router>
      <div className="bg-gray-800 min-h-screen text-white">
        <div className="container mx-auto p-4">
          <header className="bg-gray-900 rounded-lg p-4 mb-6">
            <nav className="flex items-center justify-center space-x-4">
              <NavLink to="/" className={navLinkStyle}>Tareas Pendientes</NavLink>
              <NavLink to="/favorites" className={navLinkStyle}>Tareas Favoritas</NavLink>
              <NavLink to="/completed" className={navLinkStyle}>Tareas Completadas</NavLink>
            </nav>
          </header>

          <main>
            <Routes>
              <Route path="/" element={
                <div className="bg-gray-900 rounded-lg p-6">
                  <h1 className="text-3xl font-bold text-center mb-6">Lista de Tareas</h1>
                  <div className="max-w-xl mx-auto">
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
                  </div>
                </div>
              } />
              <Route path="/favorites" element={<FavoriteTasksPage />} />
              <Route path="/completed" element={<CompletedTasksPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
