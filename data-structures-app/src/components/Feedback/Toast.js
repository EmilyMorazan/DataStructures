import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import './Toast.css';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <FaCheckCircle className="toast-icon" />,
    error: <FaExclamationCircle className="toast-icon" />,
    info: <FaInfoCircle className="toast-icon" />
  };

  return (
    <div className={`toast toast-${type}`}>
      {icons[type]}
      <p className="toast-message">{message}</p>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast;