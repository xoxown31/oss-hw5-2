import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastContainer from '../Toast/ToastContainer';

const CreatePage = () => {
  const apiUrl = "https://6909a7b12d902d0651b49b1c.mockapi.io/students";
  const [formData, setFormData] = useState({ name: '', age: '', email: '', city: '' });
  const [toasts, setToasts] = useState([]);
  const navigate = useNavigate();

  const nameInputRef = useRef(null);
  const ageInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const cityInputRef = useRef(null);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      addToast('Please enter a name.', 'warning');
      nameInputRef.current.focus();
      return false;
    }
    if (!String(formData.age).trim()) {
      addToast('Please enter an age.', 'warning');
      ageInputRef.current.focus();
      return false;
    }
    if (!formData.email.trim()) {
      addToast('Please enter an email.', 'warning');
      emailInputRef.current.focus();
      return false;
    }
    if (!formData.city.trim()) {
      addToast('Please enter a city.', 'warning');
      cityInputRef.current.focus();
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ ...formData, age: parseInt(formData.age) }),
      });
      if (res.status === 201) {
        addToast('Student added successfully!', 'success');
        setTimeout(() => navigate('/list'), 1000);
      } else {
        addToast('Failed to add student.', 'error');
      }
    } catch (error) {
      addToast('Error occurred.', 'error');
    }
  };

  return (
    <div className="container">
      <h1>Add New Student</h1>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            ref={nameInputRef}
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            ref={ageInputRef}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            ref={emailInputRef}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            ref={cityInputRef}
          />
        </div>
        <button type="submit">Add Student</button>
      </form>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default CreatePage;
