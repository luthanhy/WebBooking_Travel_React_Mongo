
//AnhVu
import React from "react";
import { Container, Row, Col } from 'reactstrap';
import "../styles/about.css"
import tour_img10 from "../assets/images/tour-img10.jpg"
const About = () => {
    return <>
        <section>
            <Container>
                <Row>
                    <Col>
                        <div class="container">
                            <div class="row">
                                <div id="about">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h2>Unlock Extraordinary Journeys with TravelWorld</h2>
                                            <p>Welcome to TravelWorld, your gateway to unforgettable travel experiences. We are a team of passionate adventurers dedicated to crafting extraordinary journeys that inspire, enlighten, and create lasting memories.</p>

                                            <p>At TravelWorld, we believe that travel is not just about visiting destinations; it's about immersing yourself in the rich tapestry of cultures, traditions, and natural wonders that make our world so captivating. With a curated collection of over 10,000 tours and activities spanning across 100 countries, we offer an unparalleled opportunity to explore the hidden gems and iconic landmarks that define the essence of a place.</p>

                                            <p>Our commitment to excellence is reflected in every aspect of our operations. From meticulously vetting local operators to ensuring the highest standards of safety and sustainability, we leave no stone unturned in delivering exceptional experiences that exceed your expectations.</p>

                                            <p>Whether you're seeking adventure, cultural immersion, or simply a chance to escape the everyday, our team of experienced travel experts is dedicated to curating personalized itineraries that cater to your unique interests and preferences. We believe that every journey should be tailored to your desires, which is why we take the time to understand your travel style, budget, and aspirations.</p>
                                            
                                        </div>
                                        <div className="col-md-6">
                                            <img src={tour_img10} alt="TravelWorld Experience" className="img-fluid" />
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-md-4">
                                            <h3>Why Choose TravelWorld?</h3>
                                            <ul>
                                                <li>Authentic Experiences: Dive deep into the heart of local communities, interact with friendly locals, and uncover the authentic essence of your destinations.</li>
                                                <li>Tailor-Made Journeys: Our experts work closely with you to customize your itinerary, ensuring a seamless and personalized experience that aligns with your interests and preferences.</li>
                                                <li>Responsible Travel: We are committed to minimizing our environmental footprint and promoting responsible tourism practices that respect and preserve the cultural heritage of the places we visit.</li>
                                                <li>Exceptional Value: We offer competitive prices without compromising on quality, ensuring that you get the best value for your investment in unforgettable memories.</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-8">
                                            <h3>Join Us on an Extraordinary Adventure</h3>
                                            <p>Whether you're an intrepid solo traveler, a family seeking adventure, or a group of friends looking to create lasting bonds, TravelWorld is your trusted companion on the journey of a lifetime.</p>
                                            <p>Join us on an extraordinary adventure and let us turn your travel dreams into cherished realities.</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
}
export default About;