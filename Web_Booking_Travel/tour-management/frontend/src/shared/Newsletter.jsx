import React, { useState } from 'react';
import './Newsletter.css';
import { Container, Row, Col } from 'reactstrap';
import maleTourist_Img from '../assets/images/male-tourist.png';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [submittedEmail, setSubmittedEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/sendMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setSubmittedEmail(email);
                setMessage('Email sent successfully');
                setTimeout(() => {
                    setSubmittedEmail('');
                    setMessage('');
                    setEmail(''); // Reset lại input field
                }, 2000); // Ẩn thông báo sau 2 giây và reset form
            } else {
                setMessage('Failed to send email');
                setTimeout(() => {
                    setMessage('');
                }, 2000); // Ẩn thông báo sau 2 giây
            }
        } catch (error) {
            setMessage('Failed to send email');
            setTimeout(() => {
                setMessage('');
            }, 2000); // Ẩn thông báo sau 2 giây
        }
    };

    return (
        <section className='newsletters'>
            <Container>
                <Row>
                    <Col lg='6'>
                        <div className='newsletters__content'>
                            <h2>Subscribe now to get useful traveling information</h2>
                            <form className='newsletters__input' onSubmit={handleSubmit}>
                                <input 
                                    type='email' 
                                    placeholder='Enter your email' 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type='submit' className='btn Newsletters__btn'>Subscribe</button>
                            </form>
                            {submittedEmail && (
                                <p className='submitted-email'>You have entered: {submittedEmail}</p>
                            )}
                            {message && (
                                <p className='message'>{message}</p>
                            )}
                        </div>
                    </Col>
                    <Col lg='6'>
                        <div className='newsletter_img'>
                            <img src={maleTourist_Img} alt="Male Tourist" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Newsletter;
