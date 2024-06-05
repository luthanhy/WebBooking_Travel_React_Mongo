import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import '../styles/admin.css';
import { BASE_URL } from '../utils/config';
import useFetch from '../hooks/useFetch';

function Dashboard() {
  const [totalTours, setTotalTours] = useState(0);
  const [totalUsers, setTotalUsers] = useState();
  const [totalOrder, setTotalOrder] = useState();
  const { data: tourData } = useFetch(`${BASE_URL}/tours/`);
  const { data: userData, error: userError  } = useFetch(`${BASE_URL}/users/`);
  const { data: orderData } = useFetch(`${BASE_URL}/booking/GetAllBooking`);

  useEffect(() => {
    if (tourData ) {
      setTotalTours(tourData.length);
      console.log('tour:',tourData.length);
    }
  }, [tourData]);

   useEffect(() => {
  
    if (orderData) {
      console.log('UserData:', orderData);
      setTotalOrder(orderData.length);
    }
  }, [orderData]);  

  // useEffect(() => {
  //   if (userData) {
  //     setTotalUsers(userData.accountType==="user"?userData.length:0);
  //   }
  // }, [userData]);
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <main className='admin-main-container'>
      <div className='admin-main-cards'>
        <div className='admin-card'>
          <div className='admin-card-inner'>
            <h3>TOURS</h3>
            <BsFillArchiveFill className='admin-card_icon' />
          </div>
          <h1>{totalTours}</h1>
        </div>
        <div className='admin-card'>
          <div className='admin-card-inner'>
            <h3>Order Booking</h3>
            <BsFillGrid3X3GapFill className='admin-card_icon' />
          </div>
          <h1>{totalOrder}</h1>
        </div>
        <div className='admin-card'>
          <div className='admin-card-inner'>
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className='admin-card_icon' />
          </div>
          <h1>{totalUsers}</h1>
        </div>
      </div>

      <div className='admin-charts'>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
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
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
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
  );
}

export default Dashboard;
