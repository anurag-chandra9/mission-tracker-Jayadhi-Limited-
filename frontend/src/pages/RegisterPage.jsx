import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { gsap } from 'gsap';

const API_URL = import.meta.env.VITE_API_URL;

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, { opacity: 1, y: 40, duration: 0.8, ease: "power2.out" });
  }, []);

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/api/admin/register`, { email, password });
      toast.success('Admin created! You can now login.');
      navigate('/login');
    } catch (err) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 px-2">
      <div
        ref={cardRef}
        className="bg-white border-2 border-purple-400 shadow-xl rounded-2xl p-10 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-700">Create New Admin</h2>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
          />
          <button
            onClick={handleRegister}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition shadow"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
