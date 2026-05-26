import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Shield, Loader, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import api from '../../utils/api';

const ProfileSettings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status states
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      setName(parsed.name || '');
      setEmail(parsed.email || '');
    }
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // If new password is provided, validate matches
    if (newPassword || confirmPassword || currentPassword) {
      if (!currentPassword) {
        setErrorMessage('Current password is required to change password.');
        setLoading(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMessage('New passwords do not match.');
        setLoading(false);
        return;
      }
      if (newPassword.length < 6) {
        setErrorMessage('New password must be at least 6 characters.');
        setLoading(false);
        return;
      }
    }

    try {
      const payload = { name, email };
      if (newPassword) {
        payload.password = newPassword;
        payload.currentPassword = currentPassword;
      }

      const response = await api.put('/auth/profile', payload);
      
      // Update local storage
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const parsed = JSON.parse(userInfo);
        const updatedUser = {
          ...parsed,
          name: response.data.name,
          email: response.data.email,
          token: response.data.token || parsed.token
        };
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      }

      setSuccessMessage('Profile and settings updated successfully!');
      
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Reload window after 1.5 seconds to refresh layout header
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to update profile settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 font-body max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary">Profile & Settings</h1>
        <p className="text-gray-500">Manage your B5 administrator credentials and settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Admin Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-3xl bg-accent/15 text-accent flex items-center justify-center font-bold text-4xl shadow-md mb-4">
              {name ? name.charAt(0).toUpperCase() : 'A'}
            </div>
            <h3 className="text-xl font-heading font-bold text-primary">{name || 'Admin User'}</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Super Administrator</p>
            <div className="w-full border-t border-gray-100 my-5"></div>
            <div className="w-full text-left space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <Mail size={16} className="text-accent" />
                <span className="truncate">{email || 'admin@b5.com'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <Shield size={16} className="text-accent" />
                <span>Full System Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Forms */}
        <div className="lg:col-span-2">
          <form onSubmit={handleUpdateProfile} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 space-y-6">
              
              {/* Alert Messages */}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm animate-fadeIn">
                  <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                  <span className="font-semibold">{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm animate-fadeIn">
                  <AlertCircle size={20} className="text-red-500 shrink-0" />
                  <span className="font-semibold">{errorMessage}</span>
                </div>
              )}

              {/* Profile Details Block */}
              <div>
                <h4 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <User size={18} className="text-accent" />
                  Profile Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input 
                        type="text" 
                        required
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-semibold text-gray-800"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input 
                        type="email" 
                        required
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-semibold text-gray-800"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 my-6"></div>

              {/* Security Block (Change Password) */}
              <div>
                <h4 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <Lock size={18} className="text-accent" />
                  Security Settings
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 ml-1">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input 
                        type={showCurrentPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-semibold text-gray-800"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer animate-fadeIn"
                      >
                        {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 ml-1">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                          type={showNewPassword ? "text" : "password"} 
                          placeholder="At least 6 characters"
                          className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-semibold text-gray-800"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer animate-fadeIn"
                        >
                          {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 ml-1">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="Repeat new password"
                          className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-semibold text-gray-800"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer animate-fadeIn"
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer with Actions */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button 
                type="submit" 
                disabled={loading}
                className="btn bg-accent text-white hover:bg-accent-hover flex items-center gap-2 cursor-pointer shadow-md rounded-full px-8 py-3 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? <Loader className="animate-spin" size={18} /> : 'Save Changes'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfileSettings;
