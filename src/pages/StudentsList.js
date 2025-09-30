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
  UserPlus
} from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/add-student')}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <UserPlus size={18} />
                New Student
              </button>
              <button
                onClick={handleDeleteSelected}
                disabled={selectedIds.length === 0}
                className="flex items-center gap-2 bg-red-400 text-white px-6 py-3 rounded-lg hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                <Trash2 size={18} />
                Delete Selected ({selectedIds.length})
              </button>
            </div>
            <div className="flex gap-3">
              <button className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center hover:bg-yellow-500 transition-colors">
                📄
              </button>
              <button className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                📄
              </button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-700">Students List</h2>
            <div className="flex gap-3">
              <button 
                onClick={() => setSearchTerm('')}
                className="flex items-center gap-2 border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Filter size={18} />
                Clear
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Keyword Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-64"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">E-mail</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Language</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Gender</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Date of Birth</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Actions</th>
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
                      <td className="p-3 text-gray-700 font-medium">{student.name}</td>
                      <td className="p-3 text-gray-700">{student.email}</td>
                      <td className="p-3 text-gray-700">{student.phone}</td>
                      <td className="p-3 text-gray-700">{student.language}</td>
                      <td className="p-3 text-gray-700">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.gender === 'Male' ? 'bg-blue-100 text-blue-800' :
                          student.gender === 'Female' ? 'bg-pink-100 text-pink-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {student.gender}
                        </span>
                      </td>
                      <td className="p-3 text-gray-700">{student.dob}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(student)}
                            className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                            title="Edit Student"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
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
                    <td colSpan="8" className="p-8 text-center text-gray-500">
                      No students found
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
                className="p-2 text-gray-500 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronsLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded font-medium">
                {currentPage}
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages || 1, prev + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages || 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronsRight size={18} />
              </button>
            </div>
            
            <span className="text-gray-600">
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