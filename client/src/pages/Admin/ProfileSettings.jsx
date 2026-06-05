import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, Shield, Loader, CheckCircle2, AlertCircle, Eye, EyeOff, Camera, Trash2 } from 'lucide-react';
import api from '../../utils/api';

const ProfileSettings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const fileInputRef = useRef(null);

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
      setProfilePhotoUrl(parsed.profilePhotoUrl || '');
    }
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Photo must be under 5MB.');
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Validate password fields if any are filled
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
      // Use FormData to support file upload alongside text fields
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (newPassword) {
        formData.append('password', newPassword);
        formData.append('currentPassword', currentPassword);
      }
      if (photoFile) {
        formData.append('profilePhoto', photoFile);
      }

      const response = await api.put('/auth/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Update localStorage with latest data including new photo URL
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const parsed = JSON.parse(userInfo);
        const updatedUser = {
          ...parsed,
          name: response.data.name,
          email: response.data.email,
          profilePhotoUrl: response.data.profilePhotoUrl || parsed.profilePhotoUrl,
          token: response.data.token || parsed.token,
        };
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        setProfilePhotoUrl(updatedUser.profilePhotoUrl);
      }

      setSuccessMessage('Profile updated successfully!');
      setPhotoFile(null);
      setPhotoPreview('');
      if (fileInputRef.current) fileInputRef.current.value = '';

      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Reload to refresh the header avatar
      setTimeout(() => window.location.reload(), 1500);

    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to update profile settings');
    } finally {
      setLoading(false);
    }
  };

  // Determine which image to show in the admin card
  const displayPhoto = photoPreview || profilePhotoUrl;
  const initials = name ? name.charAt(0).toUpperCase() : 'A';

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

            {/* Avatar with upload overlay */}
            <div className="relative mb-4 group">
              <div className="w-24 h-24 rounded-3xl overflow-hidden bg-accent/15 text-accent flex items-center justify-center font-bold text-4xl shadow-md">
                {displayPhoto ? (
                  <img
                    src={displayPhoto}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              {/* Hover overlay to trigger file picker */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 rounded-3xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer"
                title="Upload photo"
              >
                <Camera size={20} className="text-white" />
                <span className="text-white text-[10px] font-bold">Change</span>
              </button>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoChange}
              className="hidden"
              id="profile-photo-input"
            />

            {/* Show remove/change controls when a new file is staged */}
            {photoFile && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-gray-500 truncate max-w-[100px]">{photoFile.name}</span>
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Remove staged photo"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}

            {!photoFile && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-accent font-semibold hover:underline mb-3 cursor-pointer"
              >
                Upload Photo
              </button>
            )}

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

              {/* Profile Photo Upload Block */}
              <div>
                <h4 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <Camera size={18} className="text-accent" />
                  Profile Photo
                </h4>
                <div className="flex items-center gap-5 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-accent/15 text-accent flex items-center justify-center font-bold text-2xl shrink-0 shadow-sm">
                    {displayPhoto ? (
                      <img src={displayPhoto} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      {photoFile ? photoFile.name : (profilePhotoUrl ? 'Photo uploaded ✓' : 'No photo uploaded')}
                    </p>
                    <p className="text-xs text-gray-400 mb-3">JPG, PNG or WebP · Max 5MB</p>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs bg-accent text-white px-4 py-1.5 rounded-full font-semibold hover:bg-accent-hover transition-colors cursor-pointer"
                      >
                        {profilePhotoUrl ? 'Change Photo' : 'Upload Photo'}
                      </button>
                      {photoFile && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="text-xs text-red-500 font-semibold hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100"></div>

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
