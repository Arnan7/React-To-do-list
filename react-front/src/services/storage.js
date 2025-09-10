import { STORAGE_KEY } from '../constants';

const defaultTasks = [
    { id: 1, texto: 'Aprender React', favorita: false, completada: false, categoria: 'Estudios' },
    { id: 2, texto: 'Construir un componente', favorita: false, completada: false, categoria: 'Trabajo' },
    { id: 3, texto: 'Practicar con useState', favorita: false, completada: false, categoria: 'Estudios' }
];

/**
 * Carga las tareas desde el localStorage.
 * Si no hay tareas guardadas, devuelve una lista por defecto.
 * @returns {Array<Object>} La lista de tareas.
 */
export const loadTasks = () => {
    try {
        const tareasGuardadas = localStorage.getItem(STORAGE_KEY);
        if (tareasGuardadas) {
            // Asegura que las tareas cargadas tengan las propiedades necesarias
            return JSON.parse(tareasGuardadas).map(tarea => ({
                ...tarea,
                completada: tarea.completada || false,
                categoria: tarea.categoria || 'General'
            }));
        }
        return defaultTasks;
    } catch (error) {
        console.error("Error al cargar las tareas del localStorage:", error);
        return defaultTasks;
    }
};

/**
 * Guarda la lista de tareas en el localStorage.
 * @param {Array<Object>} tasks - La lista de tareas a guardar.
 */
export const saveTasks = (tasks) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("Error al guardar las tareas en el localStorage:", error);
    }
};
