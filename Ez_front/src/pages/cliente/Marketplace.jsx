import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import theme from '../../themes/theme.config';

/**
 * Marketplace Cliente - Búsqueda de servicios
 * Permite visualizar y filtrar publicaciones de ingenieros
 * NO permite crear, editar ni eliminar publicaciones
 */
const MarketplaceCliente = () => {
  const [userName, setUserName] = useState('Cliente');
  const [activeSection, setActiveSection] = useState('marketplace');
  const [hoveredPublicationId, setHoveredPublicationId] = useState(null);
  const [publications, setPublications] = useState([
    {
      id: 1,
      titulo: 'Desarrollo de API REST con Spring Boot',
      descripcion: 'Servicio completo de desarrollo de APIs REST usando Spring Boot, incluye documentación y pruebas.',
      tecnologias: ['Java', 'Spring Boot', 'MySQL', 'Postman'],
      baseDatos: 'MySQL',
      lenguaje: 'Java',
      precio: 1500,
      autor: 'Carlos García',
      fechaCreacion: '2025-02-15',
      estado: 'ACTIVO',
      calificacion: 4.8,
      reviews: 24,
    },
    {
      id: 2,
      titulo: 'Aplicación React con Redux',
      descripcion: 'Desarrollo de componentes React reutilizables con gestión de estado con Redux.',
      tecnologias: ['React', 'Redux', 'CSS', 'JavaScript'],
      baseDatos: 'MongoDB',
      lenguaje: 'JavaScript',
      precio: 1200,
      autor: 'María García',
      fechaCreacion: '2025-02-10',
      estado: 'ACTIVO',
      calificacion: 4.9,
      reviews: 18,
    },
    {
      id: 3,
      titulo: 'Sistema de Facturación Completo',
      descripcion: 'Sistema integral de facturación con reportes, autenticación y panel administrativo.',
      tecnologias: ['Java', 'React', 'Spring Boot', 'PostgreSQL'],
      baseDatos: 'PostgreSQL',
      lenguaje: 'Java',
      precio: 2500,
      autor: 'Juan Pérez',
      fechaCreacion: '2025-01-20',
      estado: 'ACTIVO',
      calificacion: 5.0,
      reviews: 12,
    },
    {
      id: 4,
      titulo: 'Chat en Tiempo Real con Socket.io',
      descripcion: 'Implementación de chat con socket.io, salas privadas y notificaciones.',
      tecnologias: ['Node.js', 'Socket.io', 'React', 'MongoDB'],
      baseDatos: 'MongoDB',
      lenguaje: 'JavaScript',
      precio: 950,
      autor: 'Ana López',
      fechaCreacion: '2025-01-15',
      estado: 'ACTIVO',
      calificacion: 4.7,
      reviews: 9,
    },
  ]);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [filters, setFilters] = useState({
    usuario: '',
    baseDatos: '',
    lenguaje: '',
    searchText: '',
  });

  const containerStyle = {
    marginLeft: '250px',
    minHeight: '100vh',
    backgroundColor: theme.colors.primary.grisSoft,
    paddingTop: '80px',
  };

  const contentStyle = {
    padding: `${theme.spacing[6]} ${theme.spacing[8]}`,
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const pageHeaderStyle = {
    marginBottom: theme.spacing[8],
  };

  const pageTitleStyle = {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[2],
  };

  const pageSubtitleStyle = {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.primary.gris,
  };

  const filtersContainerStyle = {
    backgroundColor: theme.colors.primary.blanco,
    padding: theme.spacing[6],
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
    marginBottom: theme.spacing[8],
  };

  const filtersGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing[4],
  };

  const filterGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const filterLabelStyle = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[2],
  };

  const filterInputStyle = {
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    fontSize: theme.typography.fontSize.base,
    border: `1px solid ${theme.colors.primary.grisSecundario}`,
    borderRadius: theme.borderRadius.md,
  };

  const publicationsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: theme.spacing[6],
    marginBottom: theme.spacing[8],
  };

  const publicationCardStyle = (isSelected) => ({
    backgroundColor: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
    padding: theme.spacing[6],
    display: 'flex',
    flexDirection: 'column',
    transition: `transform ${theme.transitions.duration[200]}, box-shadow ${theme.transitions.duration[200]}, border ${theme.transitions.duration[200]}`,
    cursor: 'pointer',
    border: isSelected ? `2px solid ${theme.colors.accent.azul}` : '2px solid transparent',
  });

  const publicationCardHoverStyle = {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows.lg,
  };

  const publicationHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: theme.spacing[3],
  };

  const publicationTitleStyle = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    flex: 1,
  };

  const ratingStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[1],
    fontSize: theme.typography.fontSize.sm,
    color: '#F59E0B',
  };

  const publicationDescriptionStyle = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary.gris,
    marginBottom: theme.spacing[3],
    flex: 1,
  };

  const techTagsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing[2],
    marginBottom: theme.spacing[3],
  };

  const tagStyle = {
    padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
    backgroundColor: theme.colors.accent.azul,
    color: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.full,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
  };

  const publicationFooterStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing[4],
    borderTop: `1px solid ${theme.colors.primary.grisSoft}`,
  };

  const authorStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary.gris,
  };

  const priceStyle = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.accent.azul,
  };

  const contactButtonStyle = {
    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
    backgroundColor: theme.colors.accent.azul,
    color: theme.colors.primary.blanco,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    marginTop: theme.spacing[3],
    width: '100%',
  };

  const detailsModalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const detailsCardStyle = {
    backgroundColor: theme.colors.primary.blanco,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[8],
    maxWidth: '700px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: theme.shadows.lg,
  };

  const detailsTitleStyle = {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
    marginBottom: theme.spacing[4],
  };

  const detailsInfoStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing[4],
    marginBottom: theme.spacing[6],
  };

  const detailsItemStyle = {
    padding: theme.spacing[3],
    backgroundColor: theme.colors.primary.grisSoft,
    borderRadius: theme.borderRadius.md,
  };

  const detailsItemLabelStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary.gris,
    marginBottom: theme.spacing[1],
    textTransform: 'uppercase',
  };

  const detailsItemValueStyle = {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.negro,
  };

  const closeButtonStyle = {
    float: 'right',
    background: 'none',
    border: 'none',
    fontSize: theme.typography.fontSize['2xl'],
    cursor: 'pointer',
    color: theme.colors.primary.gris,
  };

  const actionButtonsStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing[3],
    marginTop: theme.spacing[6],
  };

  const buttonStyle = (isPrimary) => ({
    padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
    backgroundColor: isPrimary ? theme.colors.accent.azul : theme.colors.primary.grisSoft,
    color: isPrimary ? theme.colors.primary.blanco : theme.colors.primary.negro,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
  });

  // Handlers
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredPublications = publications.filter((pub) => {
    return (
      (!filters.usuario || pub.autor.toLowerCase().includes(filters.usuario.toLowerCase())) &&
      (!filters.baseDatos || pub.baseDatos === filters.baseDatos) &&
      (!filters.lenguaje || pub.lenguaje === filters.lenguaje) &&
      (!filters.searchText || pub.titulo.toLowerCase().includes(filters.searchText.toLowerCase()))
    );
  });

  const handleNavigate = (path) => {
    console.log(`Navegando a: ${path}`);
  };

  const handleLogout = () => {
    console.log('Cerrando sesión...');
  };

  const handleContact = (pub) => {
    // Aquí se iniciaría un chat con el ingeniero
    console.log('Iniciando contacto con:', pub.autor);
    handleNavigate('/chats');
  };

  const bases = ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'SQL Server'];
  const lenguajes = ['Java', 'Python', 'JavaScript', 'C#', 'PHP', 'Ruby', 'Go'];

  return (
    <div>
      <Header
        userRole="CLIENTE"
        userName={userName}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
      <div style={{ marginLeft: '250px', minHeight: '100vh', backgroundColor: theme.colors.primary.grisSoft, paddingTop: '80px' }}>
        <Sidebar
          userRole="CLIENTE"
          onNavigate={handleNavigate}
          activeSection={activeSection}
        />
        <div style={contentStyle}>
          {/* Encabezado */}
          <div style={pageHeaderStyle}>
            <h1 style={pageTitleStyle}>🔍 Marketplace de Servicios</h1>
            <p style={pageSubtitleStyle}>
              Encuentra los mejores ingenieros para tu proyecto
            </p>
          </div>

          {/* Filtros */}
          <div style={filtersContainerStyle}>
            <div style={filtersGridStyle}>
              <div style={filterGroupStyle}>
                <label style={filterLabelStyle}>Buscar</label>
                <input
                  type="text"
                  name="searchText"
                  value={filters.searchText}
                  onChange={handleFilterChange}
                  placeholder="Busca por título..."
                  style={filterInputStyle}
                />
              </div>
              <div style={filterGroupStyle}>
                <label style={filterLabelStyle}>Por Ingeniero</label>
                <input
                  type="text"
                  name="usuario"
                  value={filters.usuario}
                  onChange={handleFilterChange}
                  placeholder="Nombre del ingeniero..."
                  style={filterInputStyle}
                />
              </div>
              <div style={filterGroupStyle}>
                <label style={filterLabelStyle}>Base de Datos</label>
                <select
                  name="baseDatos"
                  value={filters.baseDatos}
                  onChange={handleFilterChange}
                  style={filterInputStyle}
                >
                  <option value="">Todas</option>
                  {bases.map((base) => (
                    <option key={base} value={base}>
                      {base}
                    </option>
                  ))}
                </select>
              </div>
              <div style={filterGroupStyle}>
                <label style={filterLabelStyle}>Lenguaje</label>
                <select
                  name="lenguaje"
                  value={filters.lenguaje}
                  onChange={handleFilterChange}
                  style={filterInputStyle}
                >
                  <option value="">Todos</option>
                  {lenguajes.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Grid de Publicaciones */}
          <div style={publicationsGridStyle}>
            {filteredPublications.length > 0 ? (
              filteredPublications.map((pub) => {
                const isSelected = selectedPublication?.id === pub.id;
                const isHovered = hoveredPublicationId === pub.id;
                return (
                  <div
                    key={pub.id}
                    style={{
                      ...publicationCardStyle(isSelected),
                      ...(isHovered ? publicationCardHoverStyle : {}),
                    }}
                    onMouseEnter={() => setHoveredPublicationId(pub.id)}
                    onMouseLeave={() => setHoveredPublicationId(null)}
                    onClick={() => setSelectedPublication(pub)}
                  >
                    <div style={publicationHeaderStyle}>
                      <h3 style={publicationTitleStyle}>{pub.titulo}</h3>
                      <div style={ratingStyle}>
                        ⭐ {pub.calificacion}
                      </div>
                    </div>
                    <p style={publicationDescriptionStyle}>{pub.descripcion}</p>
                    <div style={techTagsStyle}>
                      {pub.tecnologias.map((tech) => (
                        <span key={tech} style={tagStyle}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div style={publicationFooterStyle}>
                      <span style={authorStyle}>Por: {pub.autor}</span>
                      <span style={priceStyle}>${pub.precio}</span>
                    </div>
                    <button
                      style={contactButtonStyle}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContact(pub);
                      }}
                    >
                      💬 Contactar
                    </button>
                  </div>
                );
              })
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: theme.spacing[8] }}>
                <p style={{ fontSize: theme.typography.fontSize.lg, color: theme.colors.primary.gris }}>
                  No se encontraron publicaciones
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Detalles */}
      {selectedPublication && (
        <div
          style={detailsModalStyle}
          onClick={() => setSelectedPublication(null)}
        >
          <div
            style={detailsCardStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={closeButtonStyle}
              onClick={() => setSelectedPublication(null)}
            >
              ✕
            </button>

            <h2 style={detailsTitleStyle}>{selectedPublication.titulo}</h2>

            <p style={{ color: theme.colors.primary.negro, lineHeight: '1.6', marginBottom: theme.spacing[4] }}>
              {selectedPublication.descripcion}
            </p>

            <div style={detailsInfoStyle}>
              <div style={detailsItemStyle}>
                <div style={detailsItemLabelStyle}>Ingeniero</div>
                <div style={detailsItemValueStyle}>{selectedPublication.autor}</div>
              </div>
              <div style={detailsItemStyle}>
                <div style={detailsItemLabelStyle}>Precio</div>
                <div style={detailsItemValueStyle}>${selectedPublication.precio}</div>
              </div>
              <div style={detailsItemStyle}>
                <div style={detailsItemLabelStyle}>Calificación</div>
                <div style={detailsItemValueStyle}>⭐ {selectedPublication.calificacion} ({selectedPublication.reviews} reseñas)</div>
              </div>
              <div style={detailsItemStyle}>
                <div style={detailsItemLabelStyle}>Base de Datos</div>
                <div style={detailsItemValueStyle}>{selectedPublication.baseDatos}</div>
              </div>
              <div style={detailsItemStyle}>
                <div style={detailsItemLabelStyle}>Lenguaje</div>
                <div style={detailsItemValueStyle}>{selectedPublication.lenguaje}</div>
              </div>
              <div style={detailsItemStyle}>
                <div style={detailsItemLabelStyle}>Publicado</div>
                <div style={detailsItemValueStyle}>
                  {new Date(selectedPublication.fechaCreacion).toLocaleDateString('es-ES')}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: theme.spacing[6] }}>
              <h3 style={{ fontSize: theme.typography.fontSize.base, fontWeight: 'bold', color: theme.colors.primary.negro, marginBottom: theme.spacing[2] }}>
                Tecnologías
              </h3>
              <div style={techTagsStyle}>
                {selectedPublication.tecnologias.map((tech) => (
                  <span key={tech} style={tagStyle}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div style={actionButtonsStyle}>
              <button
                style={buttonStyle(true)}
                onClick={() => {
                  handleContact(selectedPublication);
                  setSelectedPublication(null);
                }}
              >
                💬 Contactar
              </button>
              <button
                style={buttonStyle(false)}
                onClick={() => setSelectedPublication(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceCliente;
