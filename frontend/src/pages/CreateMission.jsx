import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { gsap } from 'gsap';

const API_URL = import.meta.env.VITE_API_URL;

const CreateMission = () => {
  const [form, setForm] = useState({ name: '', description: '', priority: '', startDate: '', eta: '', location: '' });
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, { opacity: 1, y: 40, duration: 0.8, ease: "power2.out" });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/api/missions`, form, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      toast.success('Mission created!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to create mission');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-purple-100 px-2">
      <div
        ref={cardRef}
        className="bg-white border-2 border-green-200 shadow-xl rounded-2xl p-10 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Create Mission</h2>
        <div className="flex flex-col gap-4">
          <input name="name" placeholder="Name" value={form.name} required onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
          />
          <input name="description" placeholder="Description" value={form.description} required onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
          />
          <input name="priority" placeholder="Priority" value={form.priority} required onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
          />
          <input name="startDate" type="datetime-local" value={form.startDate} required onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
          />
          <input name="eta" type="datetime-local" value={form.eta} onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
          />
          <input name="location" placeholder="Location" value={form.location} required onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
          />
          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition shadow"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMission;