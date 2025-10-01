import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navigation">
      <div className="container flex justify-between items-center">
        <h1 className="text-2xl font-bold neon-cyan animate-matrix-glow">
          🤖 NEURAL STUDENT MATRIX
        </h1>
        <div className="flex space-x-6">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            ⚡ COMMAND CENTER
          </Link>
          <Link
            to="/students"
            className={`nav-link ${isActive('/students') ? 'active' : ''}`}
          >
            �️ DATABASE
          </Link>
          <Link
            to="/add-student"
            className={`nav-link ${isActive('/add-student') ? 'active' : ''}`}
          >
            🆕 NEW ENTITY
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;