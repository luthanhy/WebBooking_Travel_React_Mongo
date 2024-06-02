import express from "express";
import querystring from "querystring";
const route = express.Router();

const Client_ID = "AU6xMKViZm-yeoqtKJ06jYuMmX_8U9mwxTNNowtovv52W1aA2MP1BJHH7gjqwBCESxYkX7pF-WJEKzt7";
const secretkey = "EAyuWLg2X7ZpctAULTGQE2NYZcsawd8J1lyMGL90Uvuo2XT3jL-mAUCxnIyx_9PHQZNfBta7_-F98GhA";
const URL_POST = "https://api-m.sandbox.paypal.com/v1/oauth2/token";
var token;
route.post("/createAuth", async(req, res) => {
    const authHeader = Buffer.from(`${Client_ID}:${secretkey}`).toString('base64');
    const body = querystring.stringify({ grant_type: 'client_credentials' });
    try{
        req = await fetch(URL_POST,{
            method: "POST",
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': `Basic ${authHeader}`,
            },
            body: body
        });
        console.log("luthanhy");
        const result = await req.json();
        // token = result.ass;
        token = result.access_token
        res.status(200).json({message:"Create Token Success ",data:result});
    }catch(error){
        res.status(0).json({message:"create ID Author failed ",data:error.message});
    }
})
route.post("/paymentPayPal", async(req, res)=>{
    try{
        req = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify( {
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        items: [
                            {
                                name: 'Node.js Complete Course',
                                description: 'Node.js Complete Course with Express and MongoDB',
                                quantity: 1,
                                unit_amount: {
                                    currency_code: 'USD',
                                    value: '100.00'
                                }
                            }
                        ],
    
                        amount: {
                            currency_code: 'USD',
                            value: '100.00',
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: '100.00'
                                }
                            }
                        }
                    }
                ],
    
                application_context: {
                    return_url:'http://localhost:4000/completePayment',
                    cancel_url:'http://localhost:3000/cancel-order',
                    shipping_preference: 'NO_SHIPPING',
                    user_action: 'PAY_NOW',
                    brand_name: 'manfra.io'
                }
            }
              )
            })
        const result = await req.json();
        console.log("" ,result);
        res.status(200).json({message:"create payment success",data:result});
    }catch(error){
        res.status(400).json({message:"Create Payment failed" ,data:error.message});
    }
})
route.get("/completePayment",async(req,res)=>{
    const IdOrder = req.query.token;
    try{
        req = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${IdOrder}/capture`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const result = await req.json();
        console.log ("" ,result);
        res.status(200).json({message:"Payment PayPal Success", data:result});  
    }catch(error){
        res.status(400).json({message:"CapturePayment failed",data:error.message})
    }
})
export default route;