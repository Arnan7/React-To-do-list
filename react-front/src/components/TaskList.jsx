import { useState } from 'react';
import Tarea from './Tarea';
import TaskSearch from './TaskSearch';

function TaskList({ tareas, eliminarTarea, guardarCambios, toggleFavorita, toggleCompletada }) {
    const [search, setSearch] = useState('');

    const tareasFiltradas = tareas.filter(t =>
        t.texto.toLowerCase().includes(search.trim().toLowerCase())
    );

    return (
        <div className="mt-4">
            <TaskSearch value={search} onChange={setSearch} />
            <div className="space-y-4 mt-4">
                {tareasFiltradas.map(tarea => (
                    <Tarea
                        key={tarea.id}
                        tarea={tarea}
                        eliminarTarea={eliminarTarea}
                        guardarCambios={guardarCambios}
                        toggleFavorita={toggleFavorita}
                        toggleCompletada={toggleCompletada}
                    />
                ))}
            </div>
        </div>
    );
}

export default TaskList;
