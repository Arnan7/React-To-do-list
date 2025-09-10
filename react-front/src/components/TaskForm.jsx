import React, { useState } from 'react';
import { CATEGORIES } from '../constants';

function TaskForm({ onAddTask }) {
    const [nuevaTarea, setNuevaTarea] = useState('');
    const [categoria, setCategoria] = useState('');

    const manejarCambio = (e) => {
        setNuevaTarea(e.target.value);
    };

    const manejarCambioCategoria = (e) => {
        setCategoria(e.target.value);
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        if (nuevaTarea.trim()) {
            onAddTask(nuevaTarea, categoria);
            setNuevaTarea('');
            setCategoria('');
        }
    };

    return (
        <form onSubmit={manejarEnvio} className="flex gap-2 mb-4">
            <input
                type="text"
                value={nuevaTarea}
                onChange={manejarCambio}
                placeholder="Escribe una nueva tarea"
                className="flex-grow p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <select
                id="task-category"
                value={categoria}
                onChange={manejarCambioCategoria}
                className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Sin Categoría</option>
                {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
            <div className="relative flex items-center">
                <span
                    title="Si no eliges una categoría, la IA lo hará automáticamente."
                    className="cursor-pointer ml-1 text-gray-400 border border-gray-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                >
                    i
                </span>
            </div>
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
                Agregar
            </button>
        </form>
    );
}

export default TaskForm;
