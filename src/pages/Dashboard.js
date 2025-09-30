import React from 'react';
import { Link } from 'react-router-dom';
import { useStudentContext } from '../context/StudentContext';
import { Users, UserPlus, GraduationCap, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { students } = useStudentContext();

  const stats = {
    totalStudents: students.length,
    maleStudents: students.filter(s => s.gender === 'Male').length,
    femaleStudents: students.filter(s => s.gender === 'Female').length,
    otherStudents: students.filter(s => s.gender === 'Others').length,
  };

  const recentStudents = students.slice(-5);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
              <Users className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Male Students</p>
                <p className="text-3xl font-bold text-gray-900">{stats.maleStudents}</p>
              </div>
              <GraduationCap className="w-12 h-12 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Female Students</p>
                <p className="text-3xl font-bold text-gray-900">{stats.femaleStudents}</p>
              </div>
              <UserPlus className="w-12 h-12 text-pink-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Other Students</p>
                <p className="text-3xl font-bold text-gray-900">{stats.otherStudents}</p>
              </div>
              <Calendar className="w-12 h-12 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/add-student"
                className="flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
              >
                <UserPlus size={20} />
                Add New Student
              </Link>
              <Link
                to="/students"
                className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Users size={20} />
                View All Students
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Students</h2>
            <div className="space-y-3">
              {recentStudents.length > 0 ? (
                recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                    <span className="text-sm text-gray-400">{student.gender}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No students added yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Language Distribution */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Language Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Tamil', 'English', 'Spanish', 'French'].map(language => {
              const count = students.filter(s => s.language === language).length;
              return (
                <div key={language} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-800">{count}</p>
                  <p className="text-sm text-gray-500">{language}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;