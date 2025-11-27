import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../Modals/ConfirmModal";
import ToastContainer from "../Toast/ToastContainer";
import './ListPage.css';
import '../common.css';

const ListPage = () => {
  const apiUrl = "https://6909a7b12d902d0651b49b1c.mockapi.io/students";

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, [removeToast]);

  const getStudents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (error) {
      console.error(error);
      addToast("Failed to load data", "error");
    }
    setLoading(false);
  }, [apiUrl, addToast]);

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  const deleteData = async () => {
    try {
      const res = await fetch(`${apiUrl}/${selectedId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        addToast("Student deleted successfully.", "success");
        closeConfirmModalFn();
        getStudents();
      } else {
        addToast("Failed to delete student.", "error");
      }
    } catch (error) {
      addToast("Error occurred.", "error");
    }
  };

  const openConfirmModalFn = (id) => {
    setSelectedId(id);
    setShowConfirmModal(true);
  };

  const closeConfirmModalFn = () => {
    setShowConfirmModal(false);
    setSelectedId(null);
  };

  return (
    <div className="list-page-container">
        <h1>Student List</h1>
        {loading ? (
            <div className="loading"><div className="spinner"></div>Loading...</div>
        ) : (
            <ul className="student-list">
                {students.map((student) => (
                <li key={student.id} className="student-card">
                    <div className="student-details">
                        <div className="student-name">
                            <Link to={`/detail/${student.id}`}>{student.name}</Link> ({student.age} years old)
                        </div>
                        <div className="student-info">
                            {student.email} | {student.city}
                        </div>
                    </div>
                    <div className="button-container">
                        <Link to={`/update/${student.id}`}>
                          <button className="btn btn-edit">Edit</button>
                        </Link>
                        <button className="btn btn-delete" onClick={() => openConfirmModalFn(student.id)}>Delete</button>
                    </div>
                </li>
                ))}
            </ul>
        )}

      <ConfirmModal 
        isOpen={showConfirmModal} 
        close={closeConfirmModalFn} 
        onConfirm={deleteData} 
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default ListPage;
