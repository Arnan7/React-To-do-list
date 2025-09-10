import TaskList from '../components/TaskList';
import CategoryFilter from '../components/CategoryFilter';
import { useTasksContext } from '../hooks/useTasksContext';

/**
 * Componente `FavoriteTasksPage`
 * Muestra una lista de tareas que han sido marcadas como favoritas.
 * Filtra las tareas recibidas por props para mostrar solo las favoritas y las pasa a `TaskList`.
 */
function FavoriteTasksPage() {
  const { allTasks, eliminarTarea, guardarCambios, toggleFavorita, toggleCompletada, filtroCategoria, setFiltroCategoria, filtroFecha, setFiltroFecha } = useTasksContext();

  // Filtra las tareas para obtener solo aquellas que están marcadas como favoritas
  const tareasFavoritas = allTasks
    .filter(tarea => tarea.favorita && (filtroCategoria === 'todas' || tarea.categoria === filtroCategoria))
    .sort((a, b) => {
      if (filtroFecha === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (filtroFecha === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });

  return (
    <div>
      <h2>Tareas Favoritas</h2>
      <CategoryFilter
        setFiltroCategoria={setFiltroCategoria}
        filtroCategoria={filtroCategoria}
        setFiltroFecha={setFiltroFecha}
        filtroFecha={filtroFecha}
      />
      {/* Renderiza TaskList si hay tareas favoritas, de lo contrario muestra un mensaje */}
      {tareasFavoritas.length > 0 ? (
        <TaskList
          tareas={tareasFavoritas} // Pasa solo las tareas favoritas al TaskList
          eliminarTarea={eliminarTarea}
          guardarCambios={guardarCambios}
          toggleFavorita={toggleFavorita}
          toggleCompletada={toggleCompletada}
        />
      ) : (
        <p>No tienes tareas favoritas aún.</p>
      )}
    </div>
  );
}

export default FavoriteTasksPage;