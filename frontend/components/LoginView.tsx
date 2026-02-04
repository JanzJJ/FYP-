import React, { useState } from 'react';
import { auth, googleProvider } from '../services/firebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { View } from '../types';

interface LoginViewProps {
    onNavigate: (view: View) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithPopup(auth, googleProvider);
            onNavigate('report');
        } catch (err: any) {
            console.error(err);
            setError("Failed to sign in with Google. Please check your configuration.");
        } finally {
            setLoading(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            onNavigate('report');
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/invalid-credential') {
                setError("Invalid email or password.");
            } else {
                setError("Failed to sign in. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pt30">
            <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                        <span className="material-symbols-outlined text-3xl">lock</span>
                    </div>
                    <h1 className="text-3xl font-display font-bold mb-3">Welcome Back</h1>
                    <p className="text-slate-500">Sign in to manage your reports and adoptions.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-xl text-sm font-bold border border-rose-100 dark:border-rose-900/30 flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">error</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleEmailLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
                    <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white dark:bg-surface-dark px-4 text-slate-400">Or continue with</span></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors active:scale-[0.98]"
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
                    Sign in with Google
                </button>

                <p className="text-center mt-8 text-sm text-slate-500">
                    Don't have an account? <span className="font-bold text-primary cursor-pointer hover:underline" onClick={() => alert("Registration is currently invite-only. Please contact the administrator.")}>Contact Admin</span>
                </p>
            </div>
        </div>
    );
};

export default LoginView;
