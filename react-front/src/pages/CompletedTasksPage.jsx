import TaskList from '../components/TaskList';
import CategoryFilter from '../components/CategoryFilter';
import { useTasksContext } from '../hooks/useTasksContext';

function CompletedTasksPage() {
  const { allTasks, eliminarTarea, guardarCambios, toggleFavorita, toggleCompletada, filtroCategoria, setFiltroCategoria, filtroFecha, setFiltroFecha } = useTasksContext();

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
    <div className="bg-gray-900 rounded-lg p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Tareas Completadas</h1>
      <div className="max-w-xl mx-auto">
        <CategoryFilter
          setFiltroCategoria={setFiltroCategoria}
          filtroCategoria={filtroCategoria}
          setFiltroFecha={setFiltroFecha}
          filtroFecha={filtroFecha}
        />
        {tareasCompletadas.length > 0 ? (
          <TaskList
            tareas={tareasCompletadas}
            eliminarTarea={eliminarTarea}
            guardarCambios={guardarCambios}
            toggleFavorita={toggleFavorita}
            toggleCompletada={toggleCompletada}
          />
        ) : (
          <p className="text-center text-gray-400 mt-8">No tienes tareas completadas.</p>
        )}
      </div>
    </div>
  );
}

export default CompletedTasksPage;
