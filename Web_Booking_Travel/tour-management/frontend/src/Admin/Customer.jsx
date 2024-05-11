import React, { useState } from 'react';
import { BsFillPersonFill, BsFillEnvelopeFill, BsFillPhoneFill, BsDash, BsPencil } from 'react-icons/bs';
import '../styles/customer.css';

function Customer() {
  const [customers, setCustomers] = useState([
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
  ]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const deleteCustomer = (customerId) => {
    const newCustomers = customers.filter(customer => customer.id !== customerId);
    setCustomers(newCustomers);
  };

  const editCustomer = (customerId) => {
    const customerToEdit = customers.find(customer => customer.id === customerId);
    setEditingCustomer(customerToEdit);
  };

  const saveChanges = () => {
    setEditingCustomer(null);
  };

  const cancelEditing = () => {
    setEditingCustomer(null); 
  };

  return (
    <div className="customer-container">
      <div className="customer-list">
        {customers.map((customer) => (
          <div className="customer-card" key={customer.id}>
            <div className="customer-actions">  
              <BsPencil className="customer-action" onClick={() => editCustomer(customer.id)} />
              <BsDash className="customer-action"  style={{ fontSize: '24px' }}  onClick={() => deleteCustomer(customer.id)} />
            </div>
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
      {editingCustomer && (
        <div className="edit-customer-form">
          <h2>Edit Customer</h2>
          <input type="text" value={editingCustomer.name} onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })} />
          <input type="text" value={editingCustomer.email} onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })} />
          <input type="text" value={editingCustomer.phone} onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })} />
          <button onClick={saveChanges}>Save</button>
          <button onClick={cancelEditing}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Customer;
