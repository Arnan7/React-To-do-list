import { API_URL } from '../constants';

/**
 * Llama a la API para clasificar una tarea y obtener una categoría.
 * @param {string} taskName - El nombre de la tarea a clasificar.
 * @returns {Promise<string>} La categoría sugerida por la API o 'General' en caso de error.
 */
export const classifyTask = async (taskName) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre_tarea: taskName }),
        });

        if (!response.ok) {
            console.error('Error al clasificar la tarea, el servidor respondió con estado:', response.status);
            return 'General'; // Categoría por defecto en caso de error del servidor
        }

        const data = await response.json();
        // Aseguramos que la respuesta de la API tenga la propiedad 'categoria'
        return data.categoria || 'General';
    } catch (error) {
        console.error('No se pudo conectar con la API de clasificación:', error);
        return 'General'; // Categoría por defecto si la API no es accesible
    }
};
