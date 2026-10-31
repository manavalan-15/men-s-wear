import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ShieldCheck, UserCheck, Lock, Mail, User, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, currentUser, setCurrentUser, showToast, setCurrentView } = useStore();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('roy.vikram@urbangent.com');
  const [name, setName] = useState('Vikramaditya Roy');
  const [password, setPassword] = useState('••••••••••');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'login') {
      setCurrentUser(prev => ({
        ...prev,
        email: email || prev.email,
        name: name || prev.name
      }));
      showToast(`Welcome back, ${currentUser.name.split(' ')[0]}`, 'success');
    } else {
      setCurrentUser({
        id: `usr-${Date.now()}`,
        name: name || 'Valued Client',
        email: email || 'client@urbangent.com',
        phone: '+91 99000 88771',
        role: 'customer',
        savedAddresses: []
      });
      showToast('Welcome to URBAN GENT Atelier', 'success');
    }
    setIsAuthModalOpen(false);
  };

  const handleQuickAdmin = () => {
    setCurrentUser(prev => ({ ...prev, role: 'admin' }));
    setIsAuthModalOpen(false);
    setCurrentView('admin');
    showToast('Logged in as Atelier Administrator', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#131316] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#d4af37] uppercase">Urban Gent</span>
            <h3 className="text-xl font-bold font-display-luxury text-white">
              {tab === 'login' ? 'Gentleman Account' : 'Join The Club'}
            </h3>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex bg-neutral-900 border border-neutral-800 rounded-xl p-1 mt-5 mb-6 text-xs font-semibold">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 rounded-lg transition-colors ${tab === 'login' ? 'bg-[#d4af37] text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-2 rounded-lg transition-colors ${tab === 'register' ? 'bg-[#d4af37] text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Vikramaditya Roy"
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="client@urbangent.com"
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-[#d4af37] hover:bg-[#c5a030] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#d4af37]/20 cursor-pointer"
          >
            {tab === 'login' ? 'Authenticate & Enter' : 'Complete Registration'}
          </button>
        </form>

        {/* Quick Admin bypass for testing */}
        <div className="mt-6 pt-5 border-t border-neutral-800">
          <button
            type="button"
            onClick={handleQuickAdmin}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-neutral-900/80 border border-neutral-700/80 hover:border-[#d4af37]/60 text-xs text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>Switch to Admin Panel (Store Management)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
