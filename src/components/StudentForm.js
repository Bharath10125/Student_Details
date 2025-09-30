import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useStudentContext } from '../context/StudentContext';
import { Eye, EyeOff, ChevronLeft, Save, X } from 'lucide-react';

const StudentForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { addStudent, updateStudent, students } = useStudentContext();

  const [showPassword, setShowPassword] = useState({});
  const [showConfirmPassword, setShowConfirmPassword] = useState({});
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    language: '',
    gender: '',
    dob: ''
  });

  useEffect(() => {
    if (isEdit) {
      const student = location.state?.student || students.find(s => s.id === parseInt(id));
      if (student) {
        setFormData(student);
      } else {
        navigate('/students');
      }
    }
  }, [isEdit, id, location.state, students, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.language) newErrors.language = 'Language is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (isEdit) {
        updateStudent(parseInt(id), formData);
      } else {
        addStudent(formData);
      }
      navigate('/students');
    }
  };

  const handleCancel = () => {
    navigate('/students');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 animate-slide-in">
      <div className="container-md glass-card p-8 cyber-border">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors glow-blue"
          >
            <ChevronLeft size={20} />
            ◀️ RETURN TO DATABASE
          </button>
          <h1 className="text-3xl font-bold text-gray-800 neon-cyan animate-matrix-glow text-center">
            {isEdit ? '🔧 MODIFY ENTITY' : '🆕 CREATE NEW ENTITY'}
          </h1>
          <div className="w-32"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 neon-blue">
                👤 ENTITY NAME <span className="text-red-500 neon-pink">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="🔤 Enter entity designation..."
                className={`form-input ${
                  errors.name ? 'border-red-500' : 'cyber-border'
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1 neon-pink">⚠️ {errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2 neon-green">
                📧 NEURAL LINK <span className="text-red-500 neon-pink">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="📡 Enter communication channel..."
                className={`form-input ${
                  errors.email ? 'border-red-500' : 'cyber-border'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1 neon-pink">⚠️ {errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2 neon-purple">
                📱 SIGNAL FREQUENCY <span className="text-red-500 neon-pink">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="📞 Enter transmission code..."
                className={`form-input ${
                  errors.phone ? 'border-red-500' : 'cyber-border'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1 neon-pink">⚠️ {errors.phone}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-semibold mb-2 neon-cyan">
                🎂 INITIALIZATION DATE <span className="text-red-500 neon-pink">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className={`form-input ${
                  errors.dob ? 'border-red-500' : 'cyber-border'
                }`}
              />
              {errors.dob && <p className="text-red-500 text-sm mt-1 neon-pink">⚠️ {errors.dob}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2 neon-pink">
                🔐 SECURITY KEY <span className="text-red-500 neon-pink">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword.form ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="🔑 Enter encryption key..."
                  className={`form-input pr-12 ${
                    errors.password ? 'border-red-500' : 'cyber-border'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, form: !prev.form }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-cyan-400 glow-blue"
                >
                  {showPassword.form ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1 neon-pink">⚠️ {errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword.form ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-12 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(prev => ({ ...prev, form: !prev.form }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                >
                  {showConfirmPassword.form ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-semibold mb-2 neon-green">
                🌐 NEURAL PROTOCOL <span className="text-red-500 neon-pink">*</span>
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className={`form-select ${
                  errors.language ? 'border-red-500' : 'cyber-border'
                }`}
              >
                <option value="">-- SELECT PROTOCOL --</option>
                <option value="Tamil">🇮🇳 TAMIL</option>
                <option value="English">🇺🇸 ENGLISH</option>
                <option value="Spanish">🇪🇸 SPANISH</option>
                <option value="French">🇫🇷 FRENCH</option>
                <option value="German">🇩🇪 GERMAN</option>
                <option value="Hindi">🇮🇳 HINDI</option>
              </select>
              {errors.language && <p className="text-red-500 text-sm mt-1 neon-pink">⚠️ {errors.language}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold mb-2 neon-purple">
                ⚧ ENTITY TYPE <span className="text-red-500 neon-pink">*</span>
              </label>
              <div className="flex gap-6 pt-3 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="neon-blue">👨 MALE</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-pink-400 transition-colors">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-pink-600"
                  />
                  <span className="neon-pink">👩 FEMALE</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-purple-400 transition-colors">
                  <input
                    type="radio"
                    name="gender"
                    value="Others"
                    checked={formData.gender === 'Others'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="neon-purple">🌟 OTHER</span>
                </label>
              </div>
              {errors.gender && <p className="text-red-500 text-sm mt-1 neon-pink">⚠️ {errors.gender}</p>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 pt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 px-8 py-4 border cyber-border text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium glow-red"
            >
              <X size={18} />
              ❌ ABORT OPERATION
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium glow-blue cyber-border"
            >
              <Save size={18} />
              {isEdit ? '💾 SAVE MODIFICATIONS' : '✨ CREATE ENTITY'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;