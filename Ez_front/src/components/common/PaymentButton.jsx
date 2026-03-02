import React, { useState } from 'react';
import theme from '../../themes/theme.config';

/**
 * PaymentButton Component - Botón para procesamiento de pagos
 * Integra con Mercado Pago y maneja diferentes tipos de transacciones
 */
const PaymentButton = ({
  amount,
  currency = '$',
  paymentType = 'deposit', // deposit, withdrawal, contract
  description,
  onPaymentSuccess,
  onPaymentError,
  disabled = false,
  loading = false,
  variant = 'primary', // primary, secondary, danger
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Estilos del botón según variante
  const getButtonStyle = (isHovered = false) => {
    const baseStyle = {
      ...theme.components.button[variant],
      padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing[2],
      minWidth: '150px',
      position: 'relative',
      overflow: 'hidden',
    };

    if (loading || isProcessing) {
      return {
        ...baseStyle,
        opacity: 0.7,
        cursor: 'not-allowed',
      };
    }

    if (disabled) {
      return {
        ...baseStyle,
        opacity: 0.5,
        cursor: 'not-allowed',
      };
    }

    return baseStyle;
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  };

  const modalStyle = {
    ...theme.components.modal,
    maxWidth: '400px',
    width: '90%',
    animation: `slideIn ${theme.transitions.duration[300]}`,
  };

  const modalHeaderStyle = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing[4],
    color: theme.colors.primary.negro,
    borderBottom: `2px solid ${theme.colors.accent.verde}`,
    paddingBottom: theme.spacing[3],
  };

  const detailsStyle = {
    marginBottom: theme.spacing[4],
    padding: theme.spacing[3],
    backgroundColor: theme.colors.grayscale[50],
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.grayscale[200]}`,
  };

  const detailRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[2],
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary.negro,
  };

  const amountDisplayStyle = {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.accent.verde,
    textAlign: 'center',
    marginBottom: theme.spacing[4],
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: theme.spacing[3],
    justifyContent: 'flex-end',
  };

  const confirmBtnStyle = {
    ...theme.components.button.primary,
    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
    flex: 1,
  };

  const cancelBtnStyle = {
    ...theme.components.button.secondary,
    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
    flex: 1,
  };

  const spinnerStyle = {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: theme.colors.primary.blanco,
    animation: 'spin 0.8s linear infinite',
  };

  const warningBoxStyle = {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    padding: theme.spacing[3],
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing[3],
    fontSize: theme.typography.fontSize.sm,
    border: `1px solid #FCD34D`,
  };

  const getPaymentIcon = () => {
    switch (paymentType) {
      case 'deposit':
        return '💰';
      case 'withdrawal':
        return '🏦';
      case 'contract':
        return '📋';
      default:
        return '💳';
    }
  };

  const getPaymentLabel = () => {
    switch (paymentType) {
      case 'deposit':
        return 'Recargar Saldo';
      case 'withdrawal':
        return 'Retirar Fondos';
      case 'contract':
        return 'Pagar Contrato';
      default:
        return 'Procesar Pago';
    }
  };

  const handlePaymentClick = async () => {
    if (disabled || loading || isProcessing) return;
    setShowConfirmation(true);
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    try {
      // Simular procesamiento de pago
      // En producción, aquí se llamaría a la API de Mercado Pago
      await new Promise(resolve => setTimeout(resolve, 2000));

      setShowConfirmation(false);
      setIsProcessing(false);

      if (onPaymentSuccess) {
        onPaymentSuccess({
          amount,
          paymentType,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      setIsProcessing(false);
      if (onPaymentError) {
        onPaymentError(error.message);
      }
    }
  };

  return (
    <>
      {/* Payment Button */}
      <button
        style={getButtonStyle()}
        onClick={handlePaymentClick}
        disabled={disabled || loading || isProcessing}
        title={disabled ? 'Pago deshabilitado' : getPaymentLabel()}
        onMouseEnter={(e) => {
          if (!disabled && !loading && !isProcessing) {
            e.target.style.backgroundColor = 
              variant === 'primary' ? '#1D4ED8' : 
              variant === 'danger' ? '#DC2626' : 'transparent';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !loading && !isProcessing) {
            e.target.style.backgroundColor = 
              variant === 'primary' ? theme.colors.accent.azul :
              variant === 'danger' ? theme.colors.accent.rojo : 'transparent';
          }
        }}
      >
        {isProcessing ? (
          <>
            <div style={spinnerStyle} />
            Procesando...
          </>
        ) : (
          <>
            <span>{getPaymentIcon()}</span>
            <span>{getPaymentLabel()}</span>
            {amount && <span>({currency} {amount.toFixed(2)})</span>}
          </>
        )}
      </button>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div style={modalOverlayStyle} onClick={() => setShowConfirmation(false)}>
          <div
            style={modalStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={modalHeaderStyle}>
              🔒 Confirmar {getPaymentLabel()}
            </div>

            {/* Si es retiro, mostrar advertencia */}
            {paymentType === 'withdrawal' && (
              <div style={warningBoxStyle}>
                ⚠️ Los retiros se procesarán en 1-2 días hábiles a tu cuenta bancaria
              </div>
            )}

            {/* Amount Display */}
            <div style={amountDisplayStyle}>
              {currency} {amount?.toFixed(2) || '0.00'}
            </div>

            {/* Details */}
            <div style={detailsStyle}>
              <div style={detailRowStyle}>
                <span>Tipo de Transacción:</span>
                <strong>{getPaymentLabel()}</strong>
              </div>
              {description && (
                <div style={detailRowStyle}>
                  <span>Descripción:</span>
                  <strong>{description}</strong>
                </div>
              )}
              <div style={detailRowStyle}>
                <span>Fecha:</span>
                <strong>{new Date().toLocaleDateString('es-ES')}</strong>
              </div>
            </div>

            {/* Info Box */}
            <div style={{
              backgroundColor: '#EFF6FF',
              padding: theme.spacing[3],
              borderRadius: theme.borderRadius.md,
              marginBottom: theme.spacing[4],
              fontSize: theme.typography.fontSize.sm,
              color: '#0369A1',
              border: `1px solid #BAE6FD`,
            }}>
              ℹ️ Esta transacción será procesada de forma segura a través de Mercado Pago
            </div>

            {/* Action Buttons */}
            <div style={buttonGroupStyle}>
              <button
                style={cancelBtnStyle}
                onClick={() => setShowConfirmation(false)}
                disabled={isProcessing}
              >
                Cancelar
              </button>
              <button
                style={confirmBtnStyle}
                onClick={handleConfirmPayment}
                disabled={isProcessing}
              >
                {isProcessing ? 'Procesando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default PaymentButton;
