import React from 'react';
import { CATEGORIES } from '../constants';

function CategoryFilter({ setFiltroCategoria, filtroCategoria, setFiltroFecha, filtroFecha }) {
    const categorias = ['todas', ...CATEGORIES];

    return (
        <div className="flex gap-4 my-4">
            <div className="flex-1">
                <label htmlFor="category-select" className="block text-sm font-medium text-gray-400 mb-1">
                    Filtrar por categoría
                </label>
                <select
                    id="category-select"
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {categorias.map(categoria => (
                        <option key={categoria} value={categoria}>
                            {categoria}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex-1">
                <label htmlFor="date-sort" className="block text-sm font-medium text-gray-400 mb-1">
                    Ordenar por fecha
                </label>
                <select
                    id="date-sort"
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="none">Sin ordenar</option>
                    <option value="newest">Más reciente</option>
                    <option value="oldest">Más antiguo</option>
                </select>
            </div>
        </div>
    );
}

export default CategoryFilter;