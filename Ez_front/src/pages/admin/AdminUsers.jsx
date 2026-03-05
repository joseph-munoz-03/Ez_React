import React, { useState, useEffect } from 'react';
import axios from 'axios';
import theme from '../../themes/theme.config.js';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/admin/users?page=${page}&size=10`);
      setUsers(response.data.content);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditData({
      nombre: user.nombre,
      apellido: user.apellido,
      genero: user.genero,
      role: user.role,
      password: '',
      estado: user.estado
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`/admin/users/${id}`, editData);
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro?')) {
      try {
        await axios.delete(`/admin/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleBan = async (id) => {
    if (window.confirm('¿Banear este usuario?')) {
      try {
        await axios.put(`/admin/users/${id}/ban`);
        fetchUsers();
      } catch (error) {
        console.error('Error banning user:', error);
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/admin/users/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Usuarios cargados exitosamente');
      fetchUsers();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error al cargar usuarios');
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await axios.get('/admin/users/template', {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'template_usuarios.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);
    } catch (error) {
      console.error('Error downloading template:', error);
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: theme.colors.primary.grisSoft, minHeight: '100vh' }}>
      <h1 style={{ color: theme.colors.primary.negro, marginBottom: '20px' }}>Gestión de Usuarios</h1>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.colors.accent.azul,
          color: theme.colors.primary.blanco,
          padding: '10px 15px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600'
        }}>
          Subir Excel
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
        <button
          onClick={downloadTemplate}
          style={{
            backgroundColor: theme.colors.accent.verde,
            color: theme.colors.primary.blanco,
            border: 'none',
            padding: '10px 15px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Descargar Plantilla
        </button>
      </div>

      {loading ? (
        <p style={{ color: theme.colors.primary.gris }}>Cargando...</p>
      ) : (
        <div style={{ backgroundColor: theme.colors.primary.blanco, borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: theme.colors.primary.negro, borderBottom: `2px solid ${theme.colors.accent.grisSecundario}` }}>
              <tr>
                <th style={{ padding: '12px', textAlign: 'left', color: theme.colors.primary.blanco, fontWeight: '600' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: theme.colors.primary.blanco, fontWeight: '600' }}>Nombre</th>
                <th style={{ padding: '12px', textAlign: 'left', color: theme.colors.primary.blanco, fontWeight: '600' }}>Apellido</th>
                <th style={{ padding: '12px', textAlign: 'left', color: theme.colors.primary.blanco, fontWeight: '600' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', color: theme.colors.primary.blanco, fontWeight: '600' }}>Rol</th>
                <th style={{ padding: '12px', textAlign: 'left', color: theme.colors.primary.blanco, fontWeight: '600' }}>Estado</th>
                <th style={{ padding: '12px', textAlign: 'center', color: theme.colors.primary.blanco, fontWeight: '600' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id} style={{ 
                  borderBottom: `1px solid ${theme.colors.accent.grisSecundario}`,
                  backgroundColor: idx % 2 === 0 ? theme.colors.primary.blanco : theme.colors.primary.grisSoft
                }}>
                  <td style={{ padding: '12px', color: theme.colors.primary.gris }}>{user.id}</td>
                  <td style={{ padding: '12px', color: theme.colors.primary.negro }}>
                    {editingId === user.id ? (
                      <input
                        type="text"
                        value={editData.nombre}
                        onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
                        style={{ padding: '5px', width: '100%', border: `1px solid ${theme.colors.accent.grisSecundario}`, borderRadius: '4px' }}
                      />
                    ) : (
                      user.nombre
                    )}
                  </td>
                  <td style={{ padding: '12px', color: theme.colors.primary.negro }}>
                    {editingId === user.id ? (
                      <input
                        type="text"
                        value={editData.apellido}
                        onChange={(e) => setEditData({ ...editData, apellido: e.target.value })}
                        style={{ padding: '5px', width: '100%', border: `1px solid ${theme.colors.accent.grisSecundario}`, borderRadius: '4px' }}
                      />
                    ) : (
                      user.apellido
                    )}
                  </td>
                  <td style={{ padding: '12px', color: theme.colors.primary.gris }}>{user.email}</td>
                  <td style={{ padding: '12px', color: theme.colors.primary.negro }}>
                    {editingId === user.id ? (
                      <select
                        value={editData.role}
                        onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                        style={{ padding: '5px', width: '100%', border: `1px solid ${theme.colors.accent.grisSecundario}`, borderRadius: '4px' }}
                      >
                        <option>ADMIN</option>
                        <option>INGENIERO</option>
                        <option>CLIENTE</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td style={{ padding: '12px', color: theme.colors.primary.negro }}>
                    {editingId === user.id ? (
                      <select
                        value={editData.estado}
                        onChange={(e) => setEditData({ ...editData, estado: e.target.value })}
                        style={{ padding: '5px', width: '100%', border: `1px solid ${theme.colors.accent.grisSecundario}`, borderRadius: '4px' }}
                      >
                        <option>ACTIVO</option>
                        <option>INACTIVE</option>
                        <option>BANNED</option>
                      </select>
                    ) : (
                      user.estado
                    )}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    {editingId === user.id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(user.id)}
                          style={{
                            backgroundColor: theme.colors.accent.verde,
                            color: theme.colors.primary.blanco,
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginRight: '5px',
                            fontWeight: '600'
                          }}
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          style={{
                            backgroundColor: theme.colors.primary.gris,
                            color: theme.colors.primary.blanco,
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(user)}
                          style={{
                            backgroundColor: theme.colors.accent.azul,
                            color: theme.colors.primary.blanco,
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginRight: '5px',
                            fontWeight: '600'
                          }}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          style={{
                            backgroundColor: theme.colors.accent.rojo,
                            color: theme.colors.primary.blanco,
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginRight: '5px',
                            fontWeight: '600'
                          }}
                        >
                          Eliminar
                        </button>
                        <button
                          onClick={() => handleBan(user.id)}
                          style={{
                            backgroundColor: theme.colors.accent.morado,
                            color: theme.colors.primary.blanco,
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          Banear
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
