function TaskSearch({ value, onChange }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Buscar tareas..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default TaskSearch;
