import React from 'react'
import "./Newsletter.css"
import {Container,Row,Col} from 'reactstrap'
import maleTourist_Img from '../assets/images/male-tourist.png'
const Newsletter = () => {
    return <section className='newsletters'>
        <Container>
            <Row>
                <Col lg='6'>
                    <div className='newsletters__content'>
                        <h2> Subscribe now to get useful traveling information</h2>
                        <div className='newsletters__input'>
                            <input type='email' placeholder='Enter your email'></input>
                            <button className='btn Newsletters__btn'>Subscribe</button>
                        </div>
                        <p>luthanhy1</p>
                    </div>
                </Col>
                <Col lg='6'>
                    <div className='newsletter_img'>
                        <img src={maleTourist_Img} alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
}

export default Newsletter