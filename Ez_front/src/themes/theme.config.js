/**
 * CONFIGURACIÓN DEL TEMA - EZ REACT
 * 
 * Colores principales: Blanco, Gris, Negro
 * Colores acompañantes: Verde, Morado, Azul, Rojo, Gris Secundario
 * 
 * Uso:
 * import theme from './themes/theme.config';
 * <div style={{ backgroundColor: theme.colors.primary.blanco }}>
 */

const theme = {
  // ========================================
  // COLORES PRINCIPALES
  // ========================================
  colors: {
    primary: {
      blanco: '#FFFFFF',
      gris: '#6B7280',
      grisSoft: '#F3F4F6',
      negro: '#1F2937',
      negroLight: '#111827',
    },

    // ========================================
    // COLORES ACOMPAÑANTES
    // ========================================
    accent: {
      verde: '#10B981',
      morado: '#A855F7',
      azul: '#3B82F6',
      rojo: '#EF4444',
      grisSecundario: '#D1D5DB',
    },

    // ========================================
    // PALETAS PREDEFINIDAS
    // ========================================
    palettes: {
      // Paleta Blanco + Verde
      blancoVerde: {
        primary: '#FFFFFF',
        secondary: '#10B981',
        contrast: '#1F2937',
        light: '#F3F4F6',
      },
      // Paleta Blanco + Morado
      blancoMorado: {
        primary: '#FFFFFF',
        secondary: '#A855F7',
        contrast: '#1F2937',
        light: '#F3F4F6',
      },
      // Paleta Blanco + Azul
      blancoAzul: {
        primary: '#FFFFFF',
        secondary: '#3B82F6',
        contrast: '#1F2937',
        light: '#F3F4F6',
      },
      // Paleta Blanco + Rojo
      blancoRojo: {
        primary: '#FFFFFF',
        secondary: '#EF4444',
        contrast: '#1F2937',
        light: '#F3F4F6',
      },
      // Paleta Gris + Verde
      grisVerde: {
        primary: '#6B7280',
        secondary: '#10B981',
        contrast: '#FFFFFF',
        light: '#F3F4F6',
      },
      // Paleta Gris + Morado
      grisMorado: {
        primary: '#6B7280',
        secondary: '#A855F7',
        contrast: '#FFFFFF',
        light: '#F3F4F6',
      },
      // Paleta Gris + Azul
      grisAzul: {
        primary: '#6B7280',
        secondary: '#3B82F6',
        contrast: '#FFFFFF',
        light: '#F3F4F6',
      },
      // Paleta Negro + Verde
      negroVerde: {
        primary: '#1F2937',
        secondary: '#10B981',
        contrast: '#FFFFFF',
        light: '#F3F4F6',
      },
      // Paleta Negro + Azul
      negroAzul: {
        primary: '#1F2937',
        secondary: '#3B82F6',
        contrast: '#FFFFFF',
        light: '#F3F4F6',
      },
      // Paleta Negro + Morado
      negroMorado: {
        primary: '#1F2937',
        secondary: '#A855F7',
        contrast: '#FFFFFF',
        light: '#F3F4F6',
      },
    },

    // ========================================
    // ESTADOS
    // ========================================
    states: {
      success: '#10B981',    // Verde
      warning: '#F59E0B',    // Naranja
      error: '#EF4444',      // Rojo
      info: '#3B82F6',       // Azul
    },

    // ========================================
    // ESCALA DE GRISES
    // ========================================
    grayscale: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },

  // ========================================
  // TAMAÑOS DE FUENTE
  // ========================================
  typography: {
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },

  // ========================================
  // ESPACIADO (Margen/Padding)
  // ========================================
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },

  // ========================================
  // BORDES
  // ========================================
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },

  borderWidth: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },

  // ========================================
  // SOMBRAS
  // ========================================
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // ========================================
  // PUNTOS DE QUIEBRE (Responsive)
  // ========================================
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // ========================================
  // TRANSICIONES
  // ========================================
  transitions: {
    duration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    timing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // ========================================
  // COMPONENTES PRECONSTRUIDOS
  // ========================================
  components: {
    // Botón primario
    button: {
      primary: {
        backgroundColor: '#3B82F6',  // Azul por defecto
        color: '#FFFFFF',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        border: 'none',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 300ms ease-in-out',
        '&:hover': {
          backgroundColor: '#1D4ED8',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      },
      secondary: {
        backgroundColor: 'transparent',
        color: '#3B82F6',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        border: '2px solid #3B82F6',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 300ms ease-in-out',
        '&:hover': {
          backgroundColor: '#F0F9FF',
        },
      },
      danger: {
        backgroundColor: '#EF4444',  // Rojo
        color: '#FFFFFF',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        border: 'none',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 300ms ease-in-out',
        '&:hover': {
          backgroundColor: '#DC2626',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      },
    },

    // Card
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #E5E7EB',
      transition: 'all 200ms ease-in-out',
    },

    // Input
    input: {
      backgroundColor: '#FFFFFF',
      borderRadius: '0.375rem',
      padding: '0.5rem 0.75rem',
      fontSize: '1rem',
      border: '1px solid #D1D5DB',
      transition: 'all 200ms ease-in-out',
      '&:focus': {
        borderColor: '#3B82F6',
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
      },
    },

    // Header
    header: {
      backgroundColor: '#1F2937',  // Negro
      color: '#FFFFFF',
      padding: '1rem 1.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    // Sidebar
    sidebar: {
      backgroundColor: '#6B7280',  // Gris
      color: '#FFFFFF',
      width: '250px',
      padding: '1.5rem',
      minHeight: '100vh',
      boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
    },

    // Modal
    modal: {
      backgroundColor: '#FFFFFF',
      borderRadius: '0.5rem',
      padding: '2rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      border: '1px solid #E5E7EB',
    },
  },

  // ========================================
  // FUNCIONES HELPER
  // ========================================
  /**
   * Obtiene el color según el contexto
   * @param {string} context - Contexto (success, error, warning, info, primary, secondary)
   * @returns {string} - Código de color
   */
  getColor: function(context) {
    if (this.colors.states[context]) return this.colors.states[context];
    if (this.colors.accent[context]) return this.colors.accent[context];
    if (this.colors.primary[context]) return this.colors.primary[context];
    return this.colors.primary.blanco;
  },

  /**
   * Obtiene una paleta según el color acompañante
   * @param {string} mainColor - Color principal (blanco, gris, negro)
   * @param {string} accentColor - Color acompañante (verde, morado, azul, rojo)
   * @returns {object} - Objeto con la paleta
   */
  getPalette: function(mainColor, accentColor) {
    const paletteKey = `${mainColor}${accentColor.charAt(0).toUpperCase() + accentColor.slice(1)}`;
    return this.colors.palettes[paletteKey] || this.colors.palettes.blancoVerde;
  },
};

export default theme;
