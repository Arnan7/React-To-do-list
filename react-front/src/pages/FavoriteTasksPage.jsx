import TaskList from '../components/TaskList';
import CategoryFilter from '../components/CategoryFilter';
import { useTasksContext } from '../hooks/useTasksContext';

function FavoriteTasksPage() {
  const { allTasks, eliminarTarea, guardarCambios, toggleFavorita, toggleCompletada, filtroCategoria, setFiltroCategoria, filtroFecha, setFiltroFecha } = useTasksContext();

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
    <div className="bg-gray-900 rounded-lg p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Tareas Favoritas</h1>
      <div className="max-w-xl mx-auto">
        <CategoryFilter
          setFiltroCategoria={setFiltroCategoria}
          filtroCategoria={filtroCategoria}
          setFiltroFecha={setFiltroFecha}
          filtroFecha={filtroFecha}
        />
        {tareasFavoritas.length > 0 ? (
          <TaskList
            tareas={tareasFavoritas}
            eliminarTarea={eliminarTarea}
            guardarCambios={guardarCambios}
            toggleFavorita={toggleFavorita}
            toggleCompletada={toggleCompletada}
          />
        ) : (
          <p className="text-center text-gray-400 mt-8">No tienes tareas favoritas aún.</p>
        )}
      </div>
    </div>
  );
}

export default FavoriteTasksPage;
