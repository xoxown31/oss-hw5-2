import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ToastContainer from '../Toast/ToastContainer';
import './Form.css';
import '../common.css';

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = `https://6909a7b12d902d0651b49b1c.mockapi.io/students/${id}`;

  const [student, setStudent] = useState(null);
  const [changesCount, setChangesCount] = useState(0);
  const [toasts, setToasts] = useState([]);

  const nameInputRef = useRef(null);
  const ageInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const cityInputRef = useRef(null);

  const throttleTimeout = useRef(null);
  const latestStudentData = useRef(null);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'success') => {
    const newToast = { id: Date.now(), message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(newToast.id);
    }, 5000);
  }, [removeToast]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(apiUrl);
        if (res.ok) {
          const data = await res.json();
          setStudent(data);
          latestStudentData.current = data;
        } else {
          addToast('Failed to load student data.', 'error');
        }
      } catch (error) {
        addToast('Error occurred while fetching data.', 'error');
      }
    };
    fetchStudent();

    return () => {
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    }
  }, [id, apiUrl, addToast]);

  const throttledUpdate = useCallback(async () => {
    if (!latestStudentData.current) return;

    try {
      const res = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(latestStudentData.current),
      });
      if (res.ok) {
        setChangesCount((prev) => prev + 1);
      } else {
        addToast('Failed to update student.', 'error');
      }
    } catch (error) {
      addToast('Error occurred during update.', 'error');
    } finally {
      throttleTimeout.current = null;
    }
  }, [apiUrl, addToast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedStudent = { ...student, [name]: value };
    setStudent(updatedStudent);
    latestStudentData.current = updatedStudent;

    if (
      (name === 'name' && !value.trim()) ||
      (name === 'age' && !String(value).trim()) ||
      (name === 'email' && !value.trim()) ||
      (name === 'city' && !value.trim())
    ) {
      return;
    }

    if (!throttleTimeout.current) {
        throttleTimeout.current = setTimeout(() => {
            throttledUpdate();
        }, 500);
    }
  };

  if (!student) {
    return <div className="loading"><div className="spinner"></div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <h1>Edit Student</h1>
      <p>Total changes made: {changesCount}</p>
      <form className="student-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleInputChange}
            ref={nameInputRef}
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleInputChange}
            ref={ageInputRef}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleInputChange}
            ref={emailInputRef}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={student.city}
            onChange={handleInputChange}
            ref={cityInputRef}
          />
        </div>
      </form>
      <div className="form-button-container">
        <button className="btn btn-secondary" onClick={() => navigate('/list')}>Back to List</button>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default UpdatePage;
