import React, { useState } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { RiUploadLine } from 'react-icons/ri';
import Modal from 'react-modal';
import logo from '../../assets/images/logo.png';
import './Header.css';
const nav_link = [
    {
        path: '/home',
        display: 'Home'
    },
    {
        path: '/about',
        display: 'About'
    },
    {
        path: '/tours',
        display: 'Tours'
    }
];

const Header = ({ onUploadContent }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tourInfo, setTourInfo] = useState({
        name: '',
        location: '',
        price: ''
    });

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTourInfo({ ...tourInfo, [name]: value });
    };

    const handleSubmit = (event) => {
        onUploadContent(tourInfo); 
        closeModal();
        
    };

    return (
        <header className='header'>
            <Container>
                <Row>
                    <div className='nav__wrapper d-flex align-items-center justify-content-between'>
                        <div className='logo'>
                            <a href='./home'>
                                <img src={logo} alt='' />
                            </a>
                        </div>

                        <div className='navigation'>
                            <ul className='menu d-flex align-items-center gap-5'>
                                {nav_link.map((item, index) => (
                                    <li className='nav_item' key={index}>
                                        <NavLink to={item.path} className={navClass=>navClass.isActive?"active_link":""}>
                                            {item.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='nav__right d-flex align-items-center gap-4'>
                            <Button className='btn upload__btn' onClick={openModal}>
                                <RiUploadLine /> Upload Content
                            </Button>

                            <div className='nav__btn'>
                                <Button className='btn secondary__btn'>
                                    <NavLink to='/login' className={navClass=>navClass.isActive?"active_link":""}>
                                        Login
                                    </NavLink>
                                </Button>
                                <Button className='btn primary__btn'>
                                    <NavLink to='/register' className={navClass=>navClass.isActive?"active_link":""}>
                                        Register
                                    </NavLink>
                                </Button>
                            </div>
                            <span className='mobile_menu'>
                                <i className='ri-menu-line'></i>
                            </span>
                        </div>
                    </div>
                </Row>
            </Container>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Enter Tour Information'
            >
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Enter Tour Information</h2>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='name'>Tour Name:</label>
                            <input type='text' id='name' name='name' value={tourInfo.name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor='location'>Location:</label>
                            <input type='text' id='location' name='location' value={tourInfo.location} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor='price'>Price:</label>
                            <input type='text' id='price' name='price' value={tourInfo.price} onChange={handleInputChange} />
                        </div>
                        <button type='submit'>Submit</button>
                    </form>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </Modal>
        </header>
    );
};

export default Header;
