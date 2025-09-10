import React from 'react';
import { CATEGORIES } from '../constants';

function CategoryFilter({ setFiltroCategoria, filtroCategoria, setFiltroFecha, filtroFecha }) {
    const categorias = ['todas', ...CATEGORIES];

    return (
        <div className="category-filter">
            <label htmlFor="category-select">Filtrar por categoría: </label>
            <select
                id="category-select"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
            >
                {categorias.map(categoria => (
                    <option key={categoria} value={categoria}>
                        {categoria}
                    </option>
                ))}
            </select>

            <label htmlFor="date-sort">Ordenar por fecha: </label>
            <select
                id="date-sort"
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
            >
                <option value="none">Sin ordenar</option>
                <option value="newest">Más reciente</option>
                <option value="oldest">Más antiguo</option>
            </select>
        </div>
    );
}

export default CategoryFilter;
