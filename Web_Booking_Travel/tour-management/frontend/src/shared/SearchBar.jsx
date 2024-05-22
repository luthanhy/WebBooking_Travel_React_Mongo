import React,{useRef,useState} from 'react'
import '../styles/searchbar.css'
import {useNavigate} from 'react-router-dom'
import { Col, Form, FormGroup } from 'reactstrap'
import { BASE_URL } from '../utils/config'
//import tourData from '../assets/data/tours' có thể k xài
const SearchBar = () => {
    const locationRef = useRef('')
    const distanceRef = useRef(0)
    const maxGroupSizeRef = useRef(0)
    const navigate = useNavigate()
    
    const SearchHandle = async() => {

        const location = locationRef.current.value
        const distance = distanceRef.current.value
        const maxGroupSize = maxGroupSizeRef.current.value

        if(location === '' || distance ==='' || maxGroupSize ===''){
            return alert("Fail searching")
        }else{
            const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)
            const result = await res.json()
            if(!res.ok){
                alert("!Something went wrong")
            }
            console.log(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)
            console.log(result.data)
              navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,{state:result.data});
        
     }
    }
    return (
    <Col lg="12">
        <div className="search_bar">
            <Form className=" d-flex align-items-center gap-4">
                <FormGroup className=" d-flex gap-3 form__group form__group_fast">
                    <span>
                        <i className=' ri-map-pin-line'></i>
                    </span>
                    <div>
                        <h6>Location</h6>
                        <input input="text" placeholder="Where are you going" ref={locationRef}></input>
                    </div>
                </FormGroup>
                <FormGroup className=" d-flex gap-3 form__group form__group_fast">
                    <span>
                        <i className='ri-map-pin-time-line'></i>
                    </span>
                    <div>
                        <h6>Distance</h6>
                        <input input="number" placeholder="Distance K/m" ref={distanceRef}></input>
                    </div>
                </FormGroup>
                <FormGroup className="d-flex gap-3 form__group form__group_last">
                    <span>
                        <i className=' ri-group-line'></i>
                    </span>
                    <div>
                        <h6>Max People</h6>
                        <input input="number" placeholder="Where are you going" ref={maxGroupSizeRef}></input>
                    </div>
                </FormGroup>
                <span className='search_icon' type="submit" onClick={SearchHandle}>
                    
                    <i className='ri-search-line'></i>
                </span>
                </Form> 
        </div>
    </Col>
)
}

export default SearchBar