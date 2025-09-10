import React, { useState } from 'react';
import { CATEGORIES } from '../constants';

/**
 * Componente `TaskForm`
 * Un formulario para agregar nuevas tareas con categoría.
 * Gestiona el estado del input y llama a la función `onAddTask` del padre al enviar el formulario.
 */
function TaskForm({ onAddTask }) {
    // Estado local para almacenar el texto de la nueva tarea
    const [nuevaTarea, setNuevaTarea] = useState('');
    // Estado local para la categoría
    const [categoria, setCategoria] = useState('');

    // Maneja el cambio en el input del formulario
    const manejarCambio = (e) => {
        setNuevaTarea(e.target.value);
    };

    // Maneja el cambio de la categoría
    const manejarCambioCategoria = (e) => {
        setCategoria(e.target.value);
    };

    // Maneja el envío del formulario
    const manejarEnvio = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
        onAddTask(nuevaTarea, categoria); // Llama a la función `onAddTask` pasada por props con el texto y la categoría
        setNuevaTarea(''); // Limpia el input después de agregar la tarea
        setCategoria(''); // Resetea la categoría
    };

    return (
        <form onSubmit={manejarEnvio}>
            <input
                type="text"
                value={nuevaTarea}
                onChange={manejarCambio}
                placeholder="Escribe una nueva tarea"
                required
            />
            <select id="task-category" value={categoria} onChange={manejarCambioCategoria}>
                <option value="">Sin Categoría</option>
                {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
            <label htmlFor="task-category" style={{ marginRight: '10px' }}>
                <span 
                    title="Si no eliges una categoría, la IA lo hará automáticamente."
                    style={{
                        cursor: 'pointer', 
                        marginLeft: '5px', 
                        color: '#333',
                        fontWeight: 'bolder',
                        fontFamily: 'sans-serif',
                        border: '1.5px solid #333',
                        borderRadius: '50%',
                        padding: '2px 6px',
                        fontSize: '12px'
                    }}
                >
                    i
                </span>
            </label>
            <button type="submit">Agregar Tarea</button>
        </form>
    );
}

export default TaskForm;