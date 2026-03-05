import React, { useState, useEffect } from 'react';
import axios from 'axios';
import theme from '../../themes/theme.config.js';

const AdminMarketplace = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({ usuario: '', baseDatos: '', lenguaje: '' });

  useEffect(() => {
    fetchPublications();
  }, [page, filters]);

  const fetchPublications = async () => {
    try {
      const params = new URLSearchParams({ page, size: 10 });
      if (filters.usuario) params.append('usuario', filters.usuario);
      if (filters.baseDatos) params.append('baseDatos', filters.baseDatos);
      if (filters.lenguaje) params.append('lenguaje', filters.lenguaje);

      const response = await axios.get(`/admin/publications?${params}`);
      setPublications(response.data.content);
    } catch (error) {
      console.error('Error fetching publications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta publicación? Se notificará al usuario.')) {
      try {
        await axios.delete(`/admin/publications/${id}`);
        fetchPublications();
      } catch (error) {
        console.error('Error deleting publication:', error);
        alert('Error al eliminar publicación');
      }
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
      <h1 style={{ color: '#1F2937' }}>Moderación del Marketplace</h1>

      {/* Filtros */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
      }}>
        <input
          type="text"
          placeholder="Filtrar por usuario"
          value={filters.usuario}
          onChange={(e) => setFilters({ ...filters, usuario: e.target.value })}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #D1D5DB' }}
        />
        <input
          type="text"
          placeholder="Base de datos (MySQL, PostgreSQL, etc.)"
          value={filters.baseDatos}
          onChange={(e) => setFilters({ ...filters, baseDatos: e.target.value })}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #D1D5DB' }}
        />
        <input
          type="text"
          placeholder="Lenguaje (Java, Python, etc.)"
          value={filters.lenguaje}
          onChange={(e) => setFilters({ ...filters, lenguaje: e.target.value })}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #D1D5DB' }}
        />
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {publications.map(pub => (
            <div key={pub.id} style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ color: '#1F2937', marginTop: '0' }}>{pub.titulo}</h3>
              <p style={{ color: '#6B7280', marginBottom: '10px' }}>{pub.descripcion}</p>

              <div style={{ marginBottom: '15px' }}>
                <p style={{ margin: '5px 0', color: '#6B7280', fontSize: '14px' }}>
                  <strong>Autor:</strong> {pub.autor?.nombre} {pub.autor?.apellido}
                </p>
                <p style={{ margin: '5px 0', color: '#6B7280', fontSize: '14px' }}>
                  <strong>Precio:</strong> ${pub.precio}
                </p>
                <p style={{ margin: '5px 0', color: '#6B7280', fontSize: '14px' }}>
                  <strong>Base de datos:</strong> {pub.baseDatos}
                </p>
                <p style={{ margin: '5px 0', color: '#6B7280', fontSize: '14px' }}>
                  <strong>Lenguaje:</strong> {pub.lenguaje}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleDelete(pub.id)}
                  style={{
                    backgroundColor: '#EF4444',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMarketplace;
