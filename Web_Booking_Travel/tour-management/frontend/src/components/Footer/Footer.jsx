import React from 'react'
import { Row,Col, ListGroup, ListGroupItem, Container} from 'reactstrap'
import { Link } from 'react-router-dom'
import "./Footer.css"
import Logo from '../../assets/images/logo.png'
const quick_link = [
  {
      path : '/home',
      display:'Home'
  },
  {
      path : '/about',
      display:'About'
  },
  {
      path : '/tours',
      display:'Tours'
  }
]
const quick_link_second = [
  {
      path : '/gallery',
      display:'Gallery'
  },
  {
      path : '/login',
      display:'Login'
  },
  {
      path : '/Register',
      display:'Register'
  }
]
const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className='footer'>
        <Container>
        <Row>
          <Col lg='3'>
            <div className='logo'>
                <img src={Logo} alt="" />
                <p>
                  luthanyhy4
                </p>
                <div className="social_links d-flex align-items-center gap-4">
                  <span>
                    <Link to='#'><i className='ri-youtube-line'></i></Link>
                  </span>
                  <span>
                    <Link to='#'><i className='ri-github-fill'></i></Link>
                  </span>
                  <span>
                    <Link to='#'><i className=' ri-facebook-circle-line'></i></Link>
                  </span>
                  <span>
                    <Link to='#'><i className='ri-instagram-line'></i></Link>
                  </span>

                </div>
            </div>
          </Col>
          <Col lg='3'>
              <h5 className='footer_link_title'>Discover</h5>
              <ListGroup className='footer_quick_link'>
                {
                  quick_link.map((item,index)=>(
                    <ListGroupItem key={index} className=' ps-0 border-0'>
                      <Link to={item.path}>{item.display}</Link>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
          </Col>
          <Col lg='3'>
              <h5 className='footer_link_title_second'>Quick Link</h5>
              <ListGroup className='footer_quick_link_second'>
                {
                  quick_link_second.map((item,index)=>(
                    <ListGroupItem key={index} className=' ps-0 border-0'>
                      <Link to={item.path}>{item.display}</Link>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
          </Col>
          <Col lg='3'>
             <h5 className='footer_link_title'>Contact</h5>
             <ListGroup className='footer_quick_link'>
              <ListGroupItem className=" ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className=' mb-0 d-flex align-items-center gap-2'>
                  <span> <i className='ri-map-line'></i>
                  </span>Address:
                </h6>
                <p className=' mb-0'>Binh Thanh , Viet Nam</p>
              </ListGroupItem>
             </ListGroup>
             <ListGroup className='footer_quick_link'>
              <ListGroupItem className=" ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className=' mb-0 d-flex align-items-center gap-2'>
                  <span> <i className='ri-mail-line'></i></span>
                  Email:
                </h6>
                <p className=' mb-0'>luthanhy1@gmail.com</p>
              </ListGroupItem>
             </ListGroup>
             <ListGroup className='footer_quick_link'>
              <ListGroupItem className=" ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className=' mb-0 d-flex align-items-center gap-2'>
                  <span> <i className=' ri-phone-fill'></i></span>
                  Phone:
                </h6>
                <p className=' mb-0'>0348953900</p>
              </ListGroupItem>
             </ListGroup>
          </Col>
          <Col lg='12'className=' text-center pt-5'>
            <p className='copyright'>Copyright{year}</p>
          </Col>
        </Row>
        </Container>
    </footer>
  )
}

export default Footer