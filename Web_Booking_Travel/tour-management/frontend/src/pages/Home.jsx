import React from 'react'
import {Container,Row,Col} from 'reactstrap'
import Subtitle from "../shared/Subtitle"
import SearchBar from '../shared/SearchBar'
import "../styles/home.css"
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import wordImg from "../assets/images/world.png"
const Home = () => {
  return <>
    {/* hero section start*/}
      <section>
      <Container>
        <Row>
          <Col lg='6'> 
             <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You Go"}/>
                  <img src={wordImg} alt=''></img>
                </div>
                <h1>
                  Traveling opens the door to creating {" "}
                  <span className='highlight'>memories</span>
                </h1>
                <p>
                  open
                </p>
             </div>
          </Col>
          <Col lg='2'>
            <div className='Hero_img_box'>
              <img src={heroImg} alt='' ></img>
            </div>
          </Col>
          <Col lg='2'>
            <div className='Hero_img_box mt-4'>
              <video src={heroVideo} alt=''  autoPlay loop muted playsInline></video>
            </div>
          </Col>
          <Col lg='2'>
            <div className='Hero_img_box mt-5'>
              <img src={heroImg02} alt='' ></img>
            </div>
          </Col>
          <SearchBar/>
        </Row>
      </Container>
    </section>

  </>
}

export default Home