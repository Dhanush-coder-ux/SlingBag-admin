import React, { useState, useContext } from 'react';
import { LoginContext } from '../Contexts/LoginContext';

const LoginModal = ({ isOpen, onClose }) => {
    const { sendOtp, verifyOtp } = useContext(LoginContext);
    
    const [step, setStep] = useState(1); // 1: Email, 2: OTP
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter a valid email address.");
            return;
        }
        setLoading(true);
        setError('');
        const success = await sendOtp(email);
        setLoading(false);
        
        if (success) {
            setStep(2);
        } else {
            setError("Failed to send OTP. Please try again.");
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp || otp.length < 6) {
            setError("Please enter the 6-digit OTP.");
            return;
        }
        setLoading(true);
        setError('');
        const result = await verifyOtp(email, otp);
        setLoading(false);

        if (result.success) {
            onClose(); // Close modal on success
            setStep(1);
            setEmail('');
            setOtp('');
        } else {
            setError(result.error || "Invalid or expired OTP.");
        }
    };

    const resetAndClose = () => {
        setStep(1);
        setEmail('');
        setOtp('');
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden animate-fadeIn">
                {/* Close button */}
                <button 
                    onClick={resetAndClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                    Admin Access
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    {step === 1 ? 'Enter your admin email to continue.' : 'Verify your identity.'}
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleSendOtp} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none transition"
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
                        >
                            {loading ? 'Sending OTP...' : 'Request Access'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-5">
                        <div className="text-center text-sm text-gray-600 mb-4">
                            OTP sent to <span className="font-semibold text-gray-900">{email}</span>
                            <button type="button" onClick={() => setStep(1)} className="ml-2 text-blue-600 hover:underline">Edit</button>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">6-Digit OTP</label>
                            <input 
                                type="text" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="123456"
                                maxLength={6}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black text-center text-lg tracking-widest outline-none transition"
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
                        >
                            {loading ? 'Verifying...' : 'Verify & Login'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginModal;
