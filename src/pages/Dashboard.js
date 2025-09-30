import React from 'react';
import { Link } from 'react-router-dom';
import { useStudentContext } from '../context/StudentContext';
import { Users, UserPlus, GraduationCap, Calendar, Download, FileBarChart } from 'lucide-react';
import { generateDashboardPDF, generateStudentsPDF } from '../utils/pdfGenerator';

const Dashboard = () => {
  const { students } = useStudentContext();

  const stats = {
    totalStudents: students.length,
    maleStudents: students.filter(s => s.gender === 'Male').length,
    femaleStudents: students.filter(s => s.gender === 'Female').length,
    otherStudents: students.filter(s => s.gender === 'Others').length,
  };

  const recentStudents = students.slice(-5);

  const handleDashboardPDF = () => {
    generateDashboardPDF('dashboard-content', 'Dashboard Report');
  };

  const handleStudentsReportPDF = () => {
    generateStudentsPDF(students, 'Complete Students Report');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 animate-slide-in">
      <div className="container">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-black">
            Dashboard
          </h1>
          <div className="flex gap-3">
            <button
              onClick={handleDashboardPDF}
              className="pdf-download-btn"
              title="Download Dashboard as PDF"
            >
              <FileBarChart size={18} />
              📊 Dashboard PDF
            </button>
            <button
              onClick={handleStudentsReportPDF}
              className="excel-download-btn"
              title="Download Complete Report"
            >
              <Download size={18} />
              Full Report
            </button>
          </div>
        </div>
        <div id="dashboard-content">
        
        {/* Stats Cards */}
                <div className="grid grid-cols-1 grid-cols-2 grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 border-l-4 border-blue-500 animate-float">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">👥 Total Students</p>
                <p className="text-3xl font-bold neon-blue">{stats.totalStudents}</p>
              </div>
              <Users className="w-12 h-12 text-black glow-blue" />
            </div>
          </div>
          
          <div className="glass-card p-6 border-l-4 border-green-500 animate-float" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">👨 Male Students</p>
                <p className="text-3xl font-bold neon-green">{stats.maleStudents}</p>
              </div>
              <GraduationCap className="w-12 h-12 text-black glow-green" />
            </div>
          </div>
          
          <div className="glass-card p-6 border-l-4 border-pink-500 animate-float" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">👩 Female Students</p>
                <p className="text-3xl font-bold neon-purple">{stats.femaleStudents}</p>
              </div>
              <UserPlus className="w-12 h-12 text-black glow-red" />
            </div>
          </div>
          
          <div className="glass-card p-6 border-l-4 border-purple-500 animate-float" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">🌟 Other Students</p>
                <p className="text-3xl font-bold neon-purple">{stats.otherStudents}</p>
              </div>
              <Calendar className="w-12 h-12 text-purple-500 glow-blue" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-black mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/add-student"
                className="flex items-center gap-3 p-3 bg-green-50 text-black rounded-lg hover:bg-green-100 transition-colors glow-green"
              >
                <UserPlus size={20} />
                Add New Student
              </Link>
              <Link
                to="/students"
                className="flex items-center gap-3 p-3 bg-blue-50 text-black rounded-lg hover:bg-blue-100 transition-colors glow-blue"
              >
                <Users size={20} />
                View All Students
              </Link>
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-black mb-4 neon-green">📋 Recent Students</h2>
            <div className="space-y-3">
              {recentStudents.length > 0 ? (
                recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg animate-slide-in">
                    <div>
                      <p className="font-medium text-black">{student.name}</p>
                      <p className="text-sm text-black">{student.email}</p>
                    </div>
                    <span className="text-sm text-black neon-blue">{student.gender}</span>
                  </div>
                ))
              ) : (
                <p className="text-black">🔍 No students added yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Language Distribution */}
        <div className="mt-6 glass-card p-6">
          <h2 className="text-xl font-semibold text-black mb-4 neon-purple">🌍 Language Distribution</h2>
          <div className="grid grid-cols-2 grid-cols-4 gap-4">
            {['Tamil', 'English', 'Spanish', 'French'].map((language, index) => {
              const count = students.filter(s => s.language === language).length;
              const colors = ['neon-blue', 'neon-green', 'neon-purple', 'text-yellow-400'];
              const emojis = ['🇮🇳', '🇺🇸', '🇪🇸', '🇫🇷'];
              return (
                <div key={language} className="text-center p-4 bg-gray-100 rounded-lg glass-card animate-float" style={{animationDelay: `${index * 0.1}s`}}>
                  <p className={`text-2xl font-bold ${colors[index]}`}>{count}</p>
                  <p className="text-sm text-black">{emojis[index]} {language}</p>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;