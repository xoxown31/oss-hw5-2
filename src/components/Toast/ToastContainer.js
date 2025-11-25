import React from "react";
import "./Toast.css";

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div id="toastContainer" className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type} show`}>
          <div className="toast-content">
            <span className="toast-message">{toast.message}</span>
          </div>
          <button 
            className="toast-close" 
            onClick={() => removeToast(toast.id)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;