import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentContext } from '../context/StudentContext';
import { 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  Search, 
  Filter,
  UserPlus,
  Download,
  FileText,
  Table
} from 'lucide-react';
import { generateStudentsPDF, generateExcelData, generateStudentDetailsPDF } from '../utils/pdfGenerator';

const StudentsList = () => {
  const navigate = useNavigate();
  const {
    selectedIds,
    setSelectedIds,
    searchTerm,
    setSearchTerm,
    deleteStudent,
    deleteSelectedStudents,
    getFilteredStudents
  } = useStudentContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredStudents = getFilteredStudents();
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredStudents.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleEdit = (student) => {
    navigate(`/edit-student/${student.id}`, { state: { student } });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(id);
    }
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected students?`)) {
      deleteSelectedStudents();
    }
  };

  const handleDownloadPDF = () => {
    generateStudentsPDF(filteredStudents, 'Students Report');
  };

  const handleDownloadSelectedPDF = () => {
    const selectedStudents = filteredStudents.filter(student => selectedIds.includes(student.id));
    if (selectedStudents.length > 0) {
      generateStudentsPDF(selectedStudents, 'Selected Students Report');
    }
  };

  const handleDownloadExcel = () => {
    generateExcelData(filteredStudents);
  };

  const handleDownloadStudentPDF = (student) => {
    generateStudentDetailsPDF(student);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 animate-slide-in">
      <div className="container">
        {/* Header Actions */}
        <div className="glass-card p-6 mb-6 cyber-border">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => navigate('/add-student')}
                className="flex items-center gap-2 bg-green-600 text-black px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium glow-green"
              >
                <UserPlus size={18} />
                ➕ New Student
              </button>
              <button
                onClick={handleDeleteSelected}
                disabled={selectedIds.length === 0}
                className="flex items-center gap-2 bg-red-400 text-black px-6 py-3 rounded-lg hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium glow-red"
              >
                <Trash2 size={18} />
                🗑️ Delete Selected ({selectedIds.length})
              </button>
              {selectedIds.length > 0 && (
                <button
                  onClick={handleDownloadSelectedPDF}
                  className="flex items-center gap-2 pdf-download-btn"
                >
                  <FileText size={18} />
                  📄 Download Selected PDF
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleDownloadPDF}
                className="pdf-download-btn"
                title="Download All Students as PDF"
              >
                <Download size={18} />
                📄 PDF Report
              </button>
              <button 
                onClick={handleDownloadExcel}
                className="excel-download-btn"
                title="Download as CSV"
              >
                <Table size={18} />
                � CSV Export
              </button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="glass-card p-6 holographic">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-3xl font-bold text-black neon-cyan animate-matrix-glow">
              🤖 Students Database
            </h2>
            <div className="flex gap-3 flex-wrap">
              <button 
                onClick={() => setSearchTerm('')}
                className="flex items-center gap-2 border border-blue-500 text-black px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors glow-blue"
              >
                <Filter size={18} />
                🔄 Clear Filter
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10 pr-4 py-2 w-64"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={18} />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th className="p-3 text-left text-sm font-semibold neon-blue">👤 Name</th>
                  <th className="p-3 text-left text-sm font-semibold neon-green">📧 E-mail</th>
                  <th className="p-3 text-left text-sm font-semibold neon-purple">📱 Phone</th>
                  <th className="p-3 text-left text-sm font-semibold neon-cyan">🌐 Language</th>
                  <th className="p-3 text-left text-sm font-semibold neon-pink">⚧ Gender</th>
                  <th className="p-3 text-left text-sm font-semibold neon-blue">🎂 Date of Birth</th>
                  <th className="p-3 text-left text-sm font-semibold text-black">⚡ Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(student.id)}
                          onChange={() => handleSelectOne(student.id)}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </td>
                      <td className="p-3 text-black font-medium">{student.name}</td>
                      <td className="p-3 text-black">{student.email}</td>
                      <td className="p-3 text-black">{student.phone}</td>
                      <td className="p-3 text-black">{student.language}</td>
                      <td className="p-3 text-black">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.gender === 'Male' ? 'bg-blue-100 text-black' :
                          student.gender === 'Female' ? 'bg-pink-100 text-black' :
                          'bg-gray-100 text-black'
                        }`}>
                          {student.gender}
                        </span>
                      </td>
                      <td className="p-3 text-black">{student.dob}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(student)}
                            className="w-10 h-10 rounded-full bg-blue-500 text-black flex items-center justify-center hover:bg-blue-600 transition-colors glow-blue"
                            title="Edit Student"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDownloadStudentPDF(student)}
                            className="w-10 h-10 rounded-full bg-purple-500 text-black flex items-center justify-center hover:bg-purple-600 transition-colors glow-blue"
                            title="Download PDF"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="w-10 h-10 rounded-full bg-red-500 text-black flex items-center justify-center hover:bg-red-600 transition-colors glow-red"
                            title="Delete Student"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-black neon-purple">
                      🤖 No students found in the database
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 text-black hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronsLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 text-black hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button className="px-4 py-2 bg-blue-100 text-black rounded font-medium">
                {currentPage}
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages || 1, prev + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 text-black hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages || 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 text-black hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronsRight size={18} />
              </button>
            </div>
            
            <span className="text-black">
              Showing {filteredStudents.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
            </span>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsList;