import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { gsap } from 'gsap';

const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    gsap.set(formRef.current, { opacity: 0, x: 500,y:20 });
    gsap.to(formRef.current, {
      delay: 1,
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out"
    });
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/admin/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful!');
      navigate('/dashboard');
      window.location.reload();
    } catch (err) {
      toast.error('Login failed!');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 px-4">
      <div
        ref={formRef}
        className="bg-white border-2 border-green-700 rounded-2xl p-10 w-full max-w-md shadow-xl flex flex-col justify-center"
      >
        <h2 className="text-4xl font-extrabold mb-10 text-center text-green-800 drop-shadow-lg">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-5 px-4 py-3 border-2 border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600 bg-white font-medium text-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-7 px-4 py-3 border-2 border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600 bg-white font-medium text-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded transition shadow-lg text-lg"
        >
          Login
        </button>
        <div className="mt-10 text-center">
          <span className="text-gray-700 font-medium">Don't have an admin account? </span>
          <Link to="/register" className="text-green-700 hover:underline font-bold">Create New Admin</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;