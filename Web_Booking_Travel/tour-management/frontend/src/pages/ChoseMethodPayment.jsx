import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container,Col,Row} from 'reactstrap'
import { URL_DOMAIN } from '../utils/config'
const ChoseMethodPayment = () => {
    const [credentials] = useState({
        partnerCode: "",
        payUrl: "",
    })
    const navigate = useNavigate();
    const GetMethod = async(e) => {
        try{
            const res = await fetch(`${URL_DOMAIN}/paymentmmo`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(credentials)
            });
            if(!res.ok){
                console.log("error");
            }else{
                const result = await res.json();
                window.location.href = result.data.payUrl;
            }
        }catch(eer){

        }
    }
    return (
    <Container>
        <Row>
            <Col lg = '12' style={{ paddingTop: '100px'}} className='d-flex align-items-center '>
            <div>Chose Method Payment</div>
            <button className='btn btn-primary'onClick={GetMethod}>
                <Link to="/choseMethodPayment"> Momo
                </Link>
            </button>
            </Col>
        </Row>
    </Container>
    
  )
}

export default ChoseMethodPayment