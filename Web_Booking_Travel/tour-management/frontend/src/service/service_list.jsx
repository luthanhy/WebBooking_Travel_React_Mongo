import React from 'react'

import ServiceCard from '../service/service_card'
import { Col } from 'reactstrap'

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const ServiceData =[
    {
        imgUrl: weatherImg,
        title : 1,
        desc : 1,
    },
    {
        imgUrl: guideImg,
        title : 2,
        desc : 2,
    },
    {
        imgUrl: customizationImg,
        title : 3,
        desc : 3,
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