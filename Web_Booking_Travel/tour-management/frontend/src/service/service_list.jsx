import React from 'react'

import ServiceCard from '../service/service_card'
import { Col } from 'reactstrap'

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const ServiceData =[
    {
        imgUrl: weatherImg,
        title : "Local walking tours ",
        desc : "Many cities offer excellent guided walking tours that provide an in-depth look at the history, architecture, and culture of the area. ",
    },
    {
        imgUrl: guideImg,
        title : "Day trips and excursions ",
        desc : "Day trips to nearby attractions, natural wonders, or neighboring towns/cities can be a convenient and immersive way to explore more of a region. ",
    },
    {
        imgUrl: customizationImg,
        title : "Multi-day group tours ",
        desc : "For a more comprehensive experience, multi-day group tours can take you to multiple destinations within a country or region.",
    }
]
const service_list = () => {

  return (
    <>
    {ServiceData.map((item,index)=>(
        <Col lg="3" key={index}>
            <ServiceCard item={item}/>
        </Col>
    ))}
    </>
)
}

export default service_list