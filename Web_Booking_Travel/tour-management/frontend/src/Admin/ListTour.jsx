import React from 'react';
import { BsFillPersonFill, BsFillEnvelopeFill, BsFillPhoneFill } from 'react-icons/bs';
import '../styles/customer.css';
import ADTour from '../AdminComponent/ADTour';


const ListTour = () =>{
   
    return (
        <div className="customer-container">
        <div className="row">
          <ADTour>
          </ADTour>
        </div>
      </div>
    );
  }
  
  export default ListTour;