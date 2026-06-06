import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import logo from '../../assets/B5_logo.png';
import api from '../../utils/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-dark flex items-center justify-center p-6 font-body relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-accent rounded-full blur-[120px] opacity-10"></div>

      <div className="w-full max-w-md relative">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/50 hover:text-accent transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Website</span>
        </Link>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-20 w-20 mx-auto rounded-2xl mb-6 shadow-xl border border-white/20 p-1 bg-white" 
            />
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-white/50 text-sm">Please sign in to manage your events</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/70 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  placeholder="admin@b5eventory.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/70 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent transition-colors" size={20} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-4 rounded-2xl shadow-lg shadow-accent/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-white/30">
              Authorized access only. All activities are logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
