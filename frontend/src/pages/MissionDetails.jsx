import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { gsap } from 'gsap';

const API_URL = import.meta.env.VITE_API_URL;

const MissionDetails = () => {
  const { id } = useParams();
  const [mission, setMission] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchMission = async () => {
      const res = await axios.get(`${API_URL}/api/missions/${id}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setMission(res.data);
    };
    fetchMission();
  }, [id]);

  useEffect(() => {
    if (mission && cardRef.current) {
      gsap.from(cardRef.current, { opacity: 1, y: 40, duration: 0.8, ease: 'power2.out' });
    }
  }, [mission]);

  if (!mission) return <p className="text-center mt-10 text-blue-700">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-purple-100 px-2">
      <div
        ref={cardRef}
        className="bg-white border-2 border-green-200 shadow-xl rounded-2xl p-10 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-4 text-green-700">{mission.name}</h2>
        <p className="mb-2 text-gray-700">{mission.description}</p>
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          <span className="bg-green-50 px-2 py-1 rounded text-green-700 font-medium">
            Status: {mission.status}
          </span>
          <span className="bg-purple-50 px-2 py-1 rounded text-purple-700">
            Priority: {mission.priority}
          </span>
        </div>
        <div className="mb-2 text-gray-600">
          <span className="font-semibold">Start Date:</span> {new Date(mission.startDate).toLocaleString()}
        </div>
        {mission.eta && (
          <div className="mb-2 text-gray-600">
            <span className="font-semibold">ETA:</span> {new Date(mission.eta).toLocaleString()}
          </div>
        )}
        <div className="mb-2 text-gray-600">
          <span className="font-semibold">Location:</span> {mission.location}
        </div>
      </div>
    </div>
  );
};

export default MissionDetails;