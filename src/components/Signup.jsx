import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../components/utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) return handleError('All fields are required');

        try {
            // Updated URL to point to local API instead of the deployed one.
            const response = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => navigate('/login'), 1000);
            } else {
                handleError(error?.details?.[0]?.message || message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-green-500">
            <div className="bg-gradient-to-r from-green-200 to-green-500 p-8 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-green-800 text-2xl font-bold mb-6 text-center">Sign Up</h1>
                <form onSubmit={handleSignup} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={signupInfo.name}
                        onChange={handleChange}
                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={signupInfo.email}
                        onChange={handleChange}
                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={signupInfo.password}
                        onChange={handleChange}
                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                    <button type="submit" className="w-full bg-green-400 hover:bg-green-200 text-white font-bold py-2 rounded-lg transition">
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-sm font-semibold text-gray-600">
                    Already have an account? <Link to="/login" className="text-green-800 hover:underline">Login</Link>
                </p>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Signup;
