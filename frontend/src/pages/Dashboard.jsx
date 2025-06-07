import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { gsap } from 'gsap';

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cardListRef = useRef(null);

  useEffect(() => {
    fetchMissions();
  }, []);

  useEffect(() => {
    if (missions.length && cardListRef.current) {
      gsap.fromTo(
        cardListRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [missions]);

  const fetchMissions = async () => {
    const res = await axios.get(`${API_URL}/api/missions`, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    setMissions(res.data);
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      setLoading(true);
      const isComplete = currentStatus === 'complete' || currentStatus === 'inactive';
      const newStatus = currentStatus === 'active' ? 'complete' : 'active';
      await axios.patch(`${API_URL}/api/missions/${id}/status`, 
        { status: newStatus },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      toast.success(`Status set to ${newStatus}`);
      await fetchMissions();
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out!');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-purple-100 py-10 px-2">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h2 className="text-4xl font-extrabold text-green-800 drop-shadow-lg">Mission Dashboard</h2>
          <div className="flex gap-3">
            <Link
              to="/create"
              className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
            >
              + New Mission
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition"
            >
              + New Admin
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
        {loading && <div className="text-center text-green-700 font-semibold mb-4">Updating status...</div>}
        <div ref={cardListRef} className="grid gap-6 sm:grid-cols-2">
          {missions.map((mission) => (
            <div
              key={mission._id}
              className="bg-white border-2 border-green-200 rounded-xl shadow-lg p-6 flex flex-col gap-2 hover:shadow-2xl transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-700">{mission.name}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${mission.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {mission.status === 'inactive' ? 'complete' : mission.status}
                </span>
              </div>
              <div className="text-gray-600">{mission.description}</div>
              <div className="flex flex-wrap gap-2 mt-2 text-sm">
                <span className="bg-green-50 px-2 py-1 rounded text-green-700 font-medium">
                  Priority: {mission.priority}
                </span>
                <span className="bg-gray-50 px-2 py-1 rounded text-gray-700">
                  Start: {mission.startDate ? new Date(mission.startDate).toLocaleString() : 'N/A'}
                </span>
                {mission.eta && (
                  <span className="bg-yellow-50 px-2 py-1 rounded text-yellow-700">
                    ETA: {new Date(mission.eta).toLocaleString()}
                  </span>
                )}
                <span className="bg-purple-50 px-2 py-1 rounded text-purple-700">
                  Location: {mission.location}
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => navigate(`/mission/${mission._id}`)}
                  className="px-4 py-2 rounded-lg font-semibold shadow transition bg-green-500 hover:bg-green-600 text-white"
                >
                  View
                </button>
                <button
                  disabled={loading}
                  onClick={() => toggleStatus(mission._id, mission.status)}
                  className={`px-4 py-2 rounded-lg font-semibold shadow transition
                    ${mission.status === 'active'
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                    }
                    ${loading ? 'opacity-60 cursor-not-allowed' : ''}
                  `}
                >
                  Set {mission.status === 'active' ? 'Complete' : 'Active'}
                </button>
              </div>
            </div>
          ))}
        </div>
        {missions.length === 0 && (
          <div className="text-center text-gray-500 mt-16 text-lg">No missions found.</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;