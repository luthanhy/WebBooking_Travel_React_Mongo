import React from 'react'

const VerifyLoginSale = () => {
  return (
    <form style={{ paddingTop: '100px'}}>
        <input type="text" id='OTP' name='otp' placeholder='Enter OTP' required/>
        <button className=' btn btn-primary'>Verify</button>
    </form>
  )
}

export default VerifyLoginSale