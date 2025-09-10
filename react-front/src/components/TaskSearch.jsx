/**
 * Componente `TaskSearch`
 * Un simple componente de input para buscar y filtrar tareas.
 * Recibe el valor actual de búsqueda y una función `onChange` para actualizarlo.
 */
function TaskSearch({ value, onChange }) {
  return (
    <div style={{ marginBottom: '1rem', position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Buscar tareas..." // Texto de marcador de posición para el input
        value={value} // El valor actual del input, controlado por el componente padre
        onChange={(e) => onChange(e.target.value)} // Llama a la función `onChange` del padre con el nuevo valor del input
        style={{ paddingRight: '2rem' }} // Añade espacio para el icono
      />
      {value && (
        <span
          onClick={() => onChange('')}
          style={{
            position: 'absolute',
            right: '0.5rem',
            cursor: 'pointer',
            color: '#888',
            fontSize: '0.8rem',
          }}
        >
          ✕
        </span>
      )}
    </div>
  );
}

export default TaskSearch;