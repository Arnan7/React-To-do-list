import { useState, useEffect, useCallback } from 'react';
import { classifyTask } from '../services/api';
import { loadTasks, saveTasks } from '../services/storage';

/**
 * Hook `useTasks`
 * Gestiona de forma centralizada el estado y la lógica de negocio de las tareas.
 */
function useTasks() {
    // Inicializa el estado de las tareas cargándolas desde el almacenamiento.
    const [tareas, setTareas] = useState(loadTasks);
    const [filtroCategoria, setFiltroCategoria] = useState('todas');
    const [filtroFecha, setFiltroFecha] = useState('none');

    // Guarda las tareas en el almacenamiento cada vez que el estado cambia.
    useEffect(() => {
        saveTasks(tareas);
    }, [tareas]);

    /**
     * Agrega una nueva tarea a la lista.
     * Si no se proporciona una categoría, la clasifica usando la API.
     */
    const agregarTarea = useCallback(async (texto, categoria) => {
        if (!texto || texto.trim() === '') return;

        const categoriaFinal = categoria || await classifyTask(texto);

        const nuevaTarea = {
            id: Date.now(),
            texto: texto.trim(),
            categoria: categoriaFinal,
            favorita: false,
            completada: false,
            createdAt: new Date().toISOString(),
        };

        setTareas(prevTareas => [...prevTareas, nuevaTarea]);
    }, []);

    /**
     * Función genérica para actualizar una tarea por su ID.
     * Utiliza useCallback para evitar recreaciones innecesarias.
     * @param {number} id - El ID de la tarea a actualizar.
     * @param {Function} updateFn - Una función que recibe la tarea y devuelve la tarea actualizada.
     */
    const actualizarTarea = useCallback((id, updateFn) => {
        setTareas(prevTareas =>
            prevTareas.map(tarea =>
                tarea.id === id ? updateFn(tarea) : tarea
            )
        );
    }, []);

    // Elimina una tarea de la lista.
    const eliminarTarea = useCallback((id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
            setTareas(prevTareas => prevTareas.filter(tarea => tarea.id !== id));
        }
    }, []);

    // Guarda los cambios en el texto de una tarea.
    const guardarCambios = useCallback((id, nuevoTexto) => {
        actualizarTarea(id, tarea => ({ ...tarea, texto: nuevoTexto }));
    }, [actualizarTarea]);

    // Alterna el estado de 'favorita' de una tarea.
    const toggleFavorita = useCallback((id) => {
        actualizarTarea(id, tarea => ({ ...tarea, favorita: !tarea.favorita }));
    }, [actualizarTarea]);

    // Alterna el estado de 'completada' de una tarea.
    const toggleCompletada = useCallback((id) => {
        actualizarTarea(id, tarea => ({ ...tarea, completada: !tarea.completada }));
    }, [actualizarTarea]);

    // Filtra las tareas basado en la categoría seleccionada y ordena por fecha.
    const tareasFiltradas = tareas
        .filter(tarea =>
            filtroCategoria === 'todas' || tarea.categoria === filtroCategoria
        )
        .sort((a, b) => {
            if (filtroFecha === 'newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (filtroFecha === 'oldest') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
            return 0;
        });

    // Retorna la API pública del hook.
    return {
        filteredTasks: tareasFiltradas,
        allTasks: tareas,
        agregarTarea,
        eliminarTarea,
        guardarCambios,
        toggleFavorita,
        toggleCompletada,
        setFiltroCategoria,
        filtroCategoria,
        setFiltroFecha,
        filtroFecha,
    };
}

export default useTasks;
