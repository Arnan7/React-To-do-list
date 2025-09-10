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
    guardarCambios(tarea.id, textoEditado);
    setEstaEditando(false);
  };

  const manejarToggleFavorita = () => {
    toggleFavorita(tarea.id);
  };

  const manejarToggleCompletada = () => {
    toggleCompletada(tarea.id);
  };

  const categoryStyle = {
    display: 'inline-block',
    marginLeft: '8px',
    padding: '2px 6px',
    backgroundColor: '#e0e0e0',
    borderRadius: '12px',
    fontSize: '0.8em',
    fontWeight: 'bold',
  };

  const modoEdicion = (
    <>
      <li>
        <input type="text" value={textoEditado} onChange={manejarCambio} />
        <button onClick={manejarGuardar}>Guardar</button>
      </li>
      <hr />
    </>
  );

  const modoLectura = (
    <>
      <li>
        <input
          type="checkbox"
          checked={tarea.completada}
          onChange={manejarToggleCompletada}
        />
        <span style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
          {tarea.texto}
        </span>
        {tarea.categoria && <span style={categoryStyle}>{tarea.categoria}</span>}
        <br />
        {tarea.createdAt && <small>Created At: {new Date(tarea.createdAt).toLocaleString()}</small>}
        <br />
        <button onClick={manejarEdicion}>Editar</button>
        <button onClick={manejarEliminar}>X</button>
        <button onClick={manejarToggleFavorita}>
          {tarea.favorita ? '★ Favorita' : '☆ Marcar Favorita'}
        </button>
      </li>
      <hr />
    </>
  );

  return estaEditando ? modoEdicion : modoLectura;
}

export default Tarea;
