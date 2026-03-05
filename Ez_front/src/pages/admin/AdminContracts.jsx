import React, { useState, useEffect } from 'react';
import axios from 'axios';
import theme from '../../themes/theme.config.js';

const AdminContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedContract, setSelectedContract] = useState(null);

  useEffect(() => {
    fetchContracts();
  }, [page]);

  const fetchContracts = async () => {
    try {
      const response = await axios.get(`/admin/contracts?page=${page}&size=10`);
      setContracts(response.data.content);
    } catch (error) {
      console.error('Error fetching contracts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectContract = async (id) => {
    try {
      const response = await axios.get(`/admin/contracts/${id}`);
      setSelectedContract(response.data);
    } catch (error) {
      console.error('Error fetching contract details:', error);
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
      <h1 style={{ color: '#1F2937' }}>Gestión de Contratos</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Lista de contratos */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '20px', maxHeight: '700px', overflowY: 'auto' }}>
          <h2 style={{ color: '#1F2937', marginTop: '0' }}>Contratos</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            contracts.map(contract => (
              <div
                key={contract.id}
                onClick={() => handleSelectContract(contract.id)}
                style={{
                  padding: '12px',
                  marginBottom: '10px',
                  backgroundColor: selectedContract?.id === contract.id ? '#F3F4F6' : '#FFFFFF',
                  borderLeft: '4px solid #3B82F6',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedContract?.id === contract.id ? '#F3F4F6' : '#FFFFFF'}
              >
                <p style={{ margin: '0 0 5px 0', color: '#1F2937', fontWeight: '600' }}>
                  {contract.titulo}
                </p>
                <p style={{ margin: '0', color: '#6B7280', fontSize: '12px' }}>
                  Estado: {contract.estado}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Detalles del contrato seleccionado */}
        {selectedContract && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '20px' }}>
            <h2 style={{ color: '#1F2937', marginTop: '0' }}>{selectedContract.titulo}</h2>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ margin: '10px 0', color: '#6B7280' }}>
                <strong style={{ color: '#1F2937' }}>Descripción:</strong> {selectedContract.descripcion}
              </p>
              <p style={{ margin: '10px 0', color: '#6B7280' }}>
                <strong style={{ color: '#1F2937' }}>Cliente:</strong> {selectedContract.cliente?.nombre} {selectedContract.cliente?.apellido}
              </p>
              <p style={{ margin: '10px 0', color: '#6B7280' }}>
                <strong style={{ color: '#1F2937' }}>Ingeniero:</strong> {selectedContract.ingeniero?.nombre} {selectedContract.ingeniero?.apellido}
              </p>
              <p style={{ margin: '10px 0', color: '#6B7280' }}>
                <strong style={{ color: '#1F2937' }}>Presupuesto:</strong> ${selectedContract.presupuesto}
              </p>
              <p style={{ margin: '10px 0', color: '#6B7280' }}>
                <strong style={{ color: '#1F2937' }}>Estado:</strong> {selectedContract.estado}
              </p>
              <p style={{ margin: '10px 0', color: '#6B7280' }}>
                <strong style={{ color: '#1F2937' }}>Vigencia:</strong> {selectedContract.vigenciaDias} días
              </p>
              <p style={{ margin: '10px 0', color: '#6B7280' }}>
                <strong style={{ color: '#1F2937' }}>Número de pagos:</strong> {selectedContract.numPagos}
              </p>
              <p style={{ margin: '10px 0', color: '#6B7280' }}>
                <strong style={{ color: '#1F2937' }}>Fecha de inicio:</strong> {new Date(selectedContract.fechaInicio).toLocaleDateString()}
              </p>
              <p style={{ margin: '10px 0', color: '#6B7280' }}>
                <strong style={{ color: '#1F2937' }}>Fecha de fin:</strong> {new Date(selectedContract.fechaFin).toLocaleDateString()}
              </p>
            </div>

            {selectedContract.entregas && selectedContract.entregas.length > 0 && (
              <div>
                <h3 style={{ color: '#1F2937' }}>Entregas</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: '#F3F4F6' }}>
                    <tr>
                      <th style={{ padding: '8px', textAlign: 'left', color: '#1F2937' }}>Entrega</th>
                      <th style={{ padding: '8px', textAlign: 'left', color: '#1F2937' }}>Monto</th>
                      <th style={{ padding: '8px', textAlign: 'left', color: '#1F2937' }}>Fecha</th>
                      <th style={{ padding: '8px', textAlign: 'left', color: '#1F2937' }}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedContract.entregas.map(entrega => (
                      <tr key={entrega.id} style={{ borderBottom: '1px solid #D1D5DB' }}>
                        <td style={{ padding: '8px' }}>{entrega.numeroEntrega}</td>
                        <td style={{ padding: '8px' }}>${entrega.monto}</td>
                        <td style={{ padding: '8px' }}>{new Date(entrega.fechaPagoProgramada).toLocaleDateString()}</td>
                        <td style={{ padding: '8px' }}>{entrega.estado}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContracts;
