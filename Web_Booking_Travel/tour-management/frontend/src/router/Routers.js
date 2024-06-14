import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Tours from '../pages/Tours.jsx';
import ToursDetails from '../pages/ToursDetails.jsx';
import SearchResultList from '../pages/SearchResultList.jsx';
import About from '../pages/About.jsx';
import PageError from '../pages/PageError.jsx';
import UploadContent from '../pages/UploadContent.jsx';
import ThankYou from '../pages/ThanksYou.jsx'
import LoginAdmin from '../Admin/LoginAdmin.jsx';
import VerifyLoginSale from '../shared/VerifyLoginSale.jsx';
import ChoseMethodPayment from '../pages/ChoseMethodPayment.jsx';
import Detail from '../pages/Detail.jsx';
const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='*' element={<PageError />} />
        <Route path='/home' element={<Home />} />
        <Route path='/admin' element={<LoginAdmin />} />
        <Route path='/tours' element={<Tours />} />
        <Route path='/tours/:id' element={<ToursDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verifyAccount'element = {<VerifyLoginSale/>}></Route>
        <Route path='/tours/search' element={<SearchResultList />} />
        <Route path='/about' element={<About />} />
        <Route path='/choseMethodPayment' element={<ChoseMethodPayment />} />
        <Route path='/thank-you' element = {<ThankYou/>}/>
        <Route path='/uploadTour' element={<UploadContent />} />
        <Route path="/notifications/:id" element={<Detail />}/>
      </Routes>
    </div>
  );
};

export default Routers;
