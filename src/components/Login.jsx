import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../components/utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) return handleError('Email and password are required');

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name); // ✅ Store user name

                setTimeout(() => {
                    navigate('/'); // ✅ Redirects to Home Page after login
                    window.location.reload();
                }, 500);
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
                <h1 className="text-green-800 text-2xl font-bold mb-6 text-center">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={loginInfo.email}
                        onChange={handleChange}
                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginInfo.password}
                        onChange={handleChange}
                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                    <button type="submit" className="w-full bg-green-400 hover:bg-green-200 text-green-800 font-bold py-2 rounded-lg transition">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm font-semibold text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-green-800 hover:underline">Sign Up</Link>
                </p>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
