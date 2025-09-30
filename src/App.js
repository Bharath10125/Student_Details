import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import StudentsList from './pages/StudentsList';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import './styles.css';

function App() {
  return (
    <StudentProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentsList />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/edit-student/:id" element={<EditStudent />} />
          </Routes>
        </div>
      </Router>
    </StudentProvider>
  );
}

export default App;
