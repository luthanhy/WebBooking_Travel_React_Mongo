import React from 'react';
import { BsFillPersonFill, BsFillEnvelopeFill, BsFillPhoneFill } from 'react-icons/bs';
import '../styles/customer.css';

function Customer() {
  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '987-654-3210',
    },
    // Add more customer data as needed
  ];

  return (
    <div className="customer-container">
      <h2 className="customer-heading">Customer Management</h2>

      <div className="customer-list">
        {customers.map((customer) => (
          <div className="customer-card" key={customer.id}>
            <div className="customer-details">
              <BsFillPersonFill className="customer-icon" />
              <h3 className="customer-name">{customer.name}</h3>
            </div>
            <div className="customer-info">
              <div className="customer-item">
                <BsFillEnvelopeFill className="customer-info-icon" />
                <span className="customer-info-text">{customer.email}</span>
              </div>
              <div className="customer-item">
                <BsFillPhoneFill className="customer-info-icon" />
                <span className="customer-info-text">{customer.phone}</span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customer;