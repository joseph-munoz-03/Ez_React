import React, { useState, useEffect } from 'react';
import axios from 'axios';
import theme from '../../themes/theme.config.js';

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, [page]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`/admin/reports?page=${page}&size=10`);
      setReports(response.data.content);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectReport = (report) => {
    setSelectedReport(report);
  };

  const handleResolve = async (id) => {
    try {
      const response = await axios.put(`/admin/reports/${id}/resolve`);
      setSelectedReport(response.data);
      fetchReports();
    } catch (error) {
      console.error('Error resolving report:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.put(`/admin/reports/${id}/reject`);
      setSelectedReport(response.data);
      fetchReports();
    } catch (error) {
      console.error('Error rejecting report:', error);
    }
  };

  const getReasonLabel = (reason) => {
    const reasons = {
      NO_PAYMENT: 'No Pago',
      CONTRACT_BREACH: 'Incumplimiento de Contrato',
      SEXUAL_CONTENT: 'Contenido Sexual',
      SCAM: 'Estafa',
      OTHER: 'Otro'
    };
    return reasons[reason] || reason;
  };

  const getStatusColor = (status) => {
    const colors = {
      OPEN: '#EF4444',
      REVIEWING: '#F59E0B',
      RESOLVED: '#10B981',
      REJECTED: '#6B7280'
    };
    return colors[status] || '#6B7280';
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
      <h1 style={{ color: '#1F2937' }}>Gestión de Reportes</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Lista de reportes */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '20px', maxHeight: '700px', overflowY: 'auto' }}>
          <h2 style={{ color: '#1F2937', marginTop: '0' }}>Reportes</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            reports.map(report => (
              <div
                key={report.id}
                onClick={() => handleSelectReport(report)}
                style={{
                  padding: '12px',
                  marginBottom: '10px',
                  backgroundColor: selectedReport?.id === report.id ? '#F3F4F6' : '#FFFFFF',
                  borderLeft: `4px solid ${getStatusColor(report.status)}`,
                  cursor: 'pointer',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedReport?.id === report.id ? '#F3F4F6' : '#FFFFFF'}
              >
                <p style={{ margin: '0 0 5px 0', color: '#1F2937', fontWeight: '600' }}>
                  Reporte #{report.id}
                </p>
                <p style={{ margin: '0 0 5px 0', color: '#6B7280', fontSize: '12px' }}>
                  {getReasonLabel(report.reason)}
                </p>
                <span style={{
                  backgroundColor: getStatusColor(report.status),
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}>
                  {report.status}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Detalles del reporte seleccionado */}
        {selectedReport && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '20px' }}>
            <h2 style={{ color: '#1F2937', marginTop: '0' }}>Reporte #{selectedReport.id}</h2>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ margin: '10px 0', color: '#6B7280' }}>
                <strong style={{ color: '#1F2937' }}>Reportado por:</strong> {selectedReport.reporterUser?.nombre} {selectedReport.reporterUser?.apellido}
              </p>
              <p style={{ margin: '10px 0', color: '#6B7280' }}>
                <strong style={{ color: '#1F2937' }}>Email reportante:</strong> {selectedReport.reporterUser?.email}
              </p>

              {selectedReport.reportedUser && (
                <p style={{ margin: '10px 0', color: '#6B7280' }}>
                  <strong style={{ color: '#1F2937' }}>Usuario reportado:</strong> {selectedReport.reportedUser.nombre} {selectedReport.reportedUser.apellido}
                </p>
              )}

              <p style={{ margin: '10px 0', color: '#6B7280' }}>
                <strong style={{ color: '#1F2937' }}>Motivo:</strong> {getReasonLabel(selectedReport.reason)}
              </p>

              <p style={{ margin: '10px 0', color: '#6B7280' }}>
                <strong style={{ color: '#1F2937' }}>Descripción:</strong> {selectedReport.description || 'Sin descripción'}
              </p>

              {selectedReport.imageUrl && (
                <div style={{ margin: '10px 0' }}>
                  <strong style={{ color: '#1F2937' }}>Imagen:</strong>
                  <img
                    src={selectedReport.imageUrl}
                    alt="Prueba"
                    style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px', borderRadius: '4px' }}
                  />
                </div>
              )}

              <p style={{ margin: '10px 0', color: '#6B7280' }}>
                <strong style={{ color: '#1F2937' }}>Fecha del reporte:</strong> {new Date(selectedReport.createdAt).toLocaleString()}
              </p>

              <p style={{ margin: '10px 0' }}>
                <strong style={{ color: '#1F2937' }}>Estado:</strong>
                <span style={{
                  backgroundColor: getStatusColor(selectedReport.status),
                  color: '#FFFFFF',
                  padding: '4px 12px',
                  borderRadius: '3px',
                  marginLeft: '10px'
                }}>
                  {selectedReport.status}
                </span>
              </p>
            </div>

            {selectedReport.status === 'OPEN' && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleResolve(selectedReport.id)}
                  style={{
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Resolver
                </button>
                <button
                  onClick={() => handleReject(selectedReport.id)}
                  style={{
                    backgroundColor: '#6B7280',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Rechazar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
