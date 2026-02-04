
import React from 'react';
import { View } from '../types';
import { auth } from '../services/firebaseConfig';
import { signOut, User } from 'firebase/auth';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, user }) => {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !isDark;
    setIsDark(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onNavigate('home');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const navItemClass = (view: View) => `
    px-4 py-2 rounded-full font-medium transition-all duration-200
    ${currentView === view
      ? 'bg-primary text-white'
      : 'text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary'}
  `;

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined">pets</span>
          </div>
          <span className="text-2xl font-display font-bold text-primary">StayCare</span>
        </div>

        <nav className="hidden lg:flex items-center gap-2">
          <button onClick={() => onNavigate('home')} className={navItemClass('home')}>Home</button>
          <button onClick={() => onNavigate('report')} className={navItemClass('report')}>Report Stray</button>
          <button onClick={() => onNavigate('disease')} className={navItemClass('disease')}>Disease Detection</button>
          <button onClick={() => onNavigate('adopt')} className={navItemClass('adopt')}>Adopt</button>
          <button onClick={() => onNavigate('info')} className={navItemClass('info')}>Info Centre</button>
        </nav>

        <div className="flex items-center gap-4">
          <button
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            onClick={toggleDarkMode}
          >
            <span className="material-symbols-outlined dark:hidden">dark_mode</span>
            <span className="material-symbols-outlined hidden dark:block">light_mode</span>
          </button>

          {user ? (
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{user.displayName || 'User'}</p>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider cursor-pointer hover:text-rose-500" onClick={handleLogout}>Log Out</p>
              </div>
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border-2 border-slate-100 dark:border-slate-700" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                  {user.email?.[0].toUpperCase() || 'U'}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className={`bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-transform active:scale-95 whitespace-nowrap shadow-lg shadow-slate-900/10 ${currentView === 'login' ? 'opacity-0 pointer-events-none' : ''}`}
            >
              <span className="material-symbols-outlined text-[20px]">login</span>
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
