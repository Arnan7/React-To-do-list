import { useState } from 'react';
import Tarea from './Tarea';
import TaskSearch from './TaskSearch';

/**
 * Componente `TaskList`
 * Muestra una lista de tareas, permitiendo buscar y filtrar entre ellas.
 * Renderiza un componente `TaskSearch` para la búsqueda y mapea las tareas filtradas
 * a componentes `Tarea` individuales.
 */
function TaskList({ tareas, eliminarTarea, guardarCambios, toggleFavorita, toggleCompletada }) {
    // Estado local para el término de búsqueda
    const [search, setSearch] = useState('');

    // Filtra las tareas basándose en el término de búsqueda (insensible a mayúsculas/minúsculas y espacios)
    const tareasFiltradas = tareas.filter(t =>
        t.texto.toLowerCase().includes(search.trim().toLowerCase())
    );

    return (
        <div>
            {/* Componente para la barra de búsqueda */}
            <TaskSearch value={search} onChange={setSearch} />
            <ul>
                {/* Mapea las tareas filtradas a componentes Tarea */}
                {tareasFiltradas.map(tarea => (
                    <Tarea
                        key={tarea.id} // `key` es importante para la renderización eficiente de listas en React
                        tarea={tarea}
                        eliminarTarea={eliminarTarea}
                        guardarCambios={guardarCambios}
                        toggleFavorita={toggleFavorita}
                        toggleCompletada={toggleCompletada}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TaskList;