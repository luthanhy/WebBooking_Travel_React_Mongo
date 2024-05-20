import React from 'react'
import {Container,Row,Col} from 'reactstrap'
import Subtitle from "../shared/Subtitle"
import SearchBar from '../shared/SearchBar'
import ServiceList from '../service/service_list'
import FeatureList from '../components/FeaturedTour/FeatureList'
import "../styles/home.css"
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import wordImg from "../assets/images/world.png"
import experienceImg from '../assets/images/experience.png'
import MasonryImagesGalley from '../components/ImgGallery/MasonryImagesGalley'
import Testimonial from '../components/Testimonial/Testimonial'
import Newsletter from '../shared/Newsletter'
const Home = () => <>
  {/* hero section start*/}
  <section>
    <Container>
      <Row>
        <Col lg='6'>
          <div className="hero__content">
            <div className="hero__subtitle d-flex align-items-center">
              <Subtitle subtitle={"Know Before You Go"} />
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
            <img src={heroImg} alt=''></img>
          </div>
        </Col>
        <Col lg='2'>
          <div className='Hero_img_box mt-4'>
            <video src={heroVideo} alt='' autoPlay loop muted playsInline></video>
          </div>
        </Col>
        <Col lg='2'>
          <div className='Hero_img_box mt-5'>
            <img src={heroImg02} alt=''></img>
          </div>
        </Col>
        <SearchBar />
      </Row>
    </Container>
  </section>
  {/* new hero section */}
  <section>
  <Container>
    <Row>
      <Col lg='3'>
        <h5 className='service__subtitle'>What We Serve</h5>
        <h2 className='service__title'> What offer our best services</h2>
      </Col>
      <ServiceList></ServiceList>
    </Row>
  </Container>
  </section>

  {/* feature tour section  */}
  <section>
    <Container>
      <Row>
          <Col lg='12' className="mb-5">
              <Subtitle subtitle={'Explore'}></Subtitle>
              <h2 className='featured__tour_title'> Our feature tours</h2>
          </Col>
          <FeatureList></FeatureList>
      </Row>
    </Container>
  </section>
  {/* experience section  */}
  <section>
    <Container>
      <Row>
        <Col lg='6'>
          <div className='experience__content'>
            <Subtitle subtitle={"Experience"}></Subtitle>
            <h2>With out all experience <br/> we will serve you <br/> well beyond expectations </h2>
            
          </div>
          <div className=' counter_wrapper d-flex align-items-center gap-5'>
            <div className='counter_box'>
              <span>12k+</span>
              <h6>Successful Trip</h6>
            </div>
            <div className='counter_box'>
              <span>2k+</span>
              <h6>Regular clients</h6>
            </div>
            <div className='counter_box'>
              <span>5</span>
              <h6>Year experience</h6>
            </div>
            
          </div>
        </Col>
        <Col lg='6'>
          <div className='experience_img'> 
              <img src={experienceImg} alt="" />
          </div>
        </Col>
      </Row>
    </Container>
  </section>

  {/* gallery section  */}
  <section>
    <Container>
      <Row>
        <Col lg='12'>
          <Subtitle subtitle={"Gallery"}></Subtitle>
          <h2 className='gallery_title'>Visit our customer tour gallery</h2>
        </Col>
        <Col lg='12'>
          <MasonryImagesGalley></MasonryImagesGalley>  
        </Col>
      </Row>
    </Container>
  </section>
  {/* testimonial section */}
  <section>
    <Container>
      <Row>
        <Col lg='12'>
            <Subtitle subtitle={'Fan Love'}></Subtitle>
            <h2 className='testimonial_title'>What out fan say about</h2>
        </Col>
        <Col lg='12'>
          <Testimonial/>
        </Col>
      </Row>
    </Container>
  </section>
  <Newsletter></Newsletter>
</>

export default Home