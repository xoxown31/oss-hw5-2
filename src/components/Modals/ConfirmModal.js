import React from "react";
import './Modal.css';
import '../common.css';

const ConfirmModal = ({ isOpen, close, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
        </div>
        <div className="modal-body">
            <p>Are you sure you want to delete this student? This action cannot be undone.</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={close}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;