import React, { useState } from 'react';

function Tarea({ tarea, eliminarTarea, guardarCambios, toggleFavorita, toggleCompletada }) {
  const [estaEditando, setEstaEditando] = useState(false);
  const [textoEditado, setTextoEditado] = useState(tarea.texto);

  const manejarEliminar = () => {
    eliminarTarea(tarea.id);
  };

  const manejarEdicion = () => {
    setEstaEditando(true);
  };

  const manejarCambio = (e) => {
    setTextoEditado(e.target.value);
  };

  const manejarGuardar = () => {
    if (textoEditado.trim()) {
      guardarCambios(tarea.id, textoEditado);
      setEstaEditando(false);
    }
  };

  const manejarToggleFavorita = () => {
    toggleFavorita(tarea.id);
  };

  const manejarToggleCompletada = () => {
    toggleCompletada(tarea.id);
  };

  const modoEdicion = (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-2">
      <input
        type="text"
        value={textoEditado}
        onChange={manejarCambio}
        className="flex-grow p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <button
        onClick={manejarGuardar}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Guardar
      </button>
    </div>
  );

  const modoLectura = (
    <div className="bg-gray-800 p-4 rounded-lg flex items-start gap-4 transition-colors hover:bg-gray-700">
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={manejarToggleCompletada}
        className="mt-1 form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
      />
      <div className="flex-grow">
        <p className={`text-lg ${tarea.completada ? 'line-through text-gray-500' : ''}`}>
          {tarea.texto}
        </p>
        <div className="text-sm text-gray-400 mt-1">
          {tarea.createdAt && <span>{new Date(tarea.createdAt).toLocaleString()}</span>}
          {tarea.categoria && (
            <span className="ml-2 inline-block bg-gray-600 text-gray-300 px-2 py-1 rounded-full text-xs font-semibold">
              {tarea.categoria}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={manejarToggleFavorita} className="text-2xl">
          {tarea.favorita ? '★' : '☆'}
        </button>
        <button
          onClick={manejarEdicion}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded transition-colors text-sm"
        >
          Editar
        </button>
        <button
          onClick={manejarEliminar}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition-colors text-sm"
        >
          X
        </button>
      </div>
    </div>
  );

  return estaEditando ? modoEdicion : modoLectura;
}

export default Tarea;