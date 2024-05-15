import React from 'react'
import TourCard from '../../shared/TourCard'
import TourData from '../../assets/data/tours'
import { Col } from 'reactstrap'
import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config'
const FeatureList = () => {
  // const {data:featuredTour} = useFetch(&{BASE_URL}\search)
  return <>
    
{
    TourData?.map(tour=>(
        <Col lg="3" className="mb-4" key={tour.id}>
            <TourCard tour={tour}></TourCard>
        </Col>
    ))
}
  
  </>
}

export default FeatureList