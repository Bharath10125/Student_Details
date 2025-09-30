import React, { createContext, useContext, useState } from 'react';

const StudentContext = createContext();

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'prakash',
      email: 'praksh@gmail.com',
      phone: '6789078989',
      password: '#Prakash@1',
      confirmPassword: '#Prakash@1',
      language: 'Tamil',
      gender: 'Male',
      dob: '1111-11-11'
    },
    {
      id: 2,
      name: 'tamil',
      email: 'limat@gmail.in',
      phone: '9999999999',
      password: '#Tamil@123',
      confirmPassword: '#Tamil@123',
      language: 'Spanish',
      gender: 'Male',
      dob: '2001-11-26'
    }
  ]);

  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: Date.now()
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = (id, studentData) => {
    setStudents(prev => prev.map(student => 
      student.id === id ? { ...studentData, id } : student
    ));
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
    setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
  };

  const deleteSelectedStudents = () => {
    setStudents(prev => prev.filter(student => !selectedIds.includes(student.id)));
    setSelectedIds([]);
  };

  const getFilteredStudents = () => {
    return students.filter(student =>
      Object.values(student).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const value = {
    students,
    selectedIds,
    setSelectedIds,
    searchTerm,
    setSearchTerm,
    addStudent,
    updateStudent,
    deleteStudent,
    deleteSelectedStudents,
    getFilteredStudents
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};