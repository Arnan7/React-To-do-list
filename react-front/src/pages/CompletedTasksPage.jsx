import TaskList from '../components/TaskList';
import CategoryFilter from '../components/CategoryFilter';
import { useTasksContext } from '../hooks/useTasksContext';

/**
 * Componente `CompletedTasksPage`
 * Muestra una lista de tareas que han sido marcadas como completadas.
 * Filtra las tareas recibidas por props para mostrar solo las completadas y las pasa a `TaskList`.
 */
function CompletedTasksPage() {
  const { allTasks, eliminarTarea, guardarCambios, toggleFavorita, toggleCompletada, filtroCategoria, setFiltroCategoria, filtroFecha, setFiltroFecha } = useTasksContext();

  // Filtra las tareas para obtener solo aquellas que están marcadas como completadas
  const tareasCompletadas = allTasks
    .filter(tarea => tarea.completada && (filtroCategoria === 'todas' || tarea.categoria === filtroCategoria))
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
      <h2>Tareas Completadas</h2>
      <CategoryFilter
        setFiltroCategoria={setFiltroCategoria}
        filtroCategoria={filtroCategoria}
        setFiltroFecha={setFiltroFecha}
        filtroFecha={filtroFecha}
      />
      {/* Renderiza TaskList si hay tareas completadas, de lo contrario muestra un mensaje */}
      {tareasCompletadas.length > 0 ? (
        <TaskList
          tareas={tareasCompletadas} // Pasa solo las tareas completadas al TaskList
          eliminarTarea={eliminarTarea}
          guardarCambios={guardarCambios}
          toggleFavorita={toggleFavorita}
          toggleCompletada={toggleCompletada}
        />
      ) : (
        <p>No tienes tareas completadas.</p>
      )}
    </div>
  );
}

export default CompletedTasksPage;