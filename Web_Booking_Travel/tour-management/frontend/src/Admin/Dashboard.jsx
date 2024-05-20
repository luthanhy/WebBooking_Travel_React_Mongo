import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsPeopleFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import axios from 'axios';
import '../styles/admin.css'; // Ensure you have corresponding styles
import { BASE_URL } from '../utils/config';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [tourCount, setTourCount] = useState(0);
  const [data, setData] = useState([
    // Dữ liệu mẫu cho biểu đồ
  ]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userRes = await axios.get(`${BASE_URL}/dashboard/userCount`);
        setUserCount(userRes.data.count);
        const tourRes = await axios.get(`${BASE_URL}/dashboard/tourCount`);
        setTourCount(tourRes.data.count);
      } catch (err) {
        console.error('Error fetching counts:', err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <main className='admin-main-container'>
        <div className='admin-main-cards'>
          <div className='admin-card'>
            <div className='admin-card-inner'>
              <h3>USERS</h3>
              <BsPeopleFill className='admin-card_icon' />
            </div>
            <h1>{userCount}</h1>
          </div>
          <div className='admin-card'>
            <div className='admin-card-inner'>
              <h3>TOURS</h3>
              <BsFillArchiveFill className='admin-card_icon' />
            </div>
            <h1>{tourCount}</h1>
          </div>
        </div>

        <div className='admin-charts'>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
