import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();
  const apiUrl = `https://6909a7b12d902d0651b49b1c.mockapi.io/students/${id}`;
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(apiUrl);
        if (res.ok) {
          const data = await res.json();
          setStudent(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudent();
  }, [id, apiUrl]);

  if (!student) {
    return <div className="loading"><div className="spinner"></div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Student Details</h1>
      <div className="student-details-full">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Age:</strong> {student.age}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>City:</strong> {student.city}</p>
      </div>
      <Link to="/list">
        <button>Back to List</button>
      </Link>
    </div>
  );
};

export default DetailPage;
