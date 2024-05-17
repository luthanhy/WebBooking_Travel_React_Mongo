import React ,{useState,useEffect} from 'react'
import CommonSection from '../shared/CommonSection'
import { Container,Row,Col } from 'reactstrap'
import SearchBar from '../shared/SearchBar'
import TourCard from '../shared/TourCard'
import '../styles/tours.css'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'

const Tours = () => {

  const {data:TourData,error,loading} = useFetch(`${BASE_URL}/tours/`)

  console.log(TourData)
  const [CountPage,SetPageCount] = useState(0);
  const [Page,SetPage] = useState(0);
  

  useEffect(()=>{
    const pages = Math.ceil(5/4)
    SetPageCount(pages)
  },[Page])
  return (
    <>
       <CommonSection title = {'All Tour'}></CommonSection>
       <section>
          <Container>
            <Row>
              <Col lg='12'>
                <SearchBar></SearchBar>
              </Col>
            </Row>
          </Container>
       </section>
       <section>
          <Container>
            <Row>
              {
                TourData?.map(tours=><Col lg='3'key={tours.id}><TourCard tour={tours}/></Col>)
              }
              <Col lg='12'>
                  <div className=' pagination d-flex align-items-center justify-content-center mt-4 gap-3'>
                    {
                      [...Array(CountPage).keys()].map(number =>(
                        <span key={number} onClick={()=>SetPage(number)} className={Page === number ? 'active__page':""}>
                            {number+1}
                        </span>
                      ))
                    }
                  </div>
              </Col>
            </Row>
          </Container>
       </section>
    </>
  )
}

export default Tours