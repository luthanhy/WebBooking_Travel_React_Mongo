import React from 'react'
import { Container,Row,Col, Form , FormGroup, Button,Label} from 'reactstrap'
import "../styles/uploadcontent.css"
const UploadContent = () => {
  return (
    <>
      <Container>
        <Row>
            <Col lg='12' >
                <div className=' d-flex align-items-center justify-content-center'>
                    <h1> User UpLoad Content</h1>
                </div>
                <Form className = "uploadContent_form text-center">
                    <FormGroup >
                        <Label className="info_upload">Tour:</Label>
                        <input type="Name Tour" placeholder='Full Name' id='full_name'/>
                    </FormGroup>
                    <FormGroup >
                        <Label className="info_upload">Location:</Label>
                        <input type="Location " placeholder='Full Name' id='full_name'/>
                    </FormGroup>
                    <FormGroup >
                        <Label className="info_upload">Price :</Label>
                        <input type="Price" placeholder='Full Name' id='full_name'/>
                    </FormGroup>
                    <Button className="bnt  primary__btn w-25 mt-4"> Submit</Button>
                </Form>
            </Col>
            
        </Row>
      </Container>
    </>
  )
}

export default UploadContent