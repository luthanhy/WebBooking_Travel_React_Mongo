import express from 'express'
import crypto from 'crypto'
import dotenv from 'dotenv';

const route = express.Router();

// ACCESSKEY = "F8BBA842ECF85";
// SECRETKEY = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
dotenv.config();
var accessKey = process.env.ACCESSKEY || "";
var secretkey = process.env.SECRETKEY || "";


// var accessKey = process.env.ACCESSKEY || "";
// var secretkey = process.env.SECRETKEY || "";
route.post("/paymentmmo",async(req, res) => {
    var partnerCode = "MOMO";
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var orderInfo = "pay with MoMo";
    var redirectUrl = "http://localhost:3000/thank-you";
    var ipnUrl = "https://bd3a-1-53-51-224.ngrok-free.app/callback";
    var amount = "1000";
    var requestType = "captureWallet"
    var extraData = ""; //pass empty value if your merchant does not have stores

    var rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)
    //signature'
    var signature = crypto.createHmac('sha256', secretkey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)
    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode : partnerCode,
        accessKey : accessKey,
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        redirectUrl : redirectUrl,
        ipnUrl : ipnUrl,
        extraData : extraData,
        requestType : requestType,
        signature : signature,
        lang: 'vi'
    });
    //Create the HTTPS objects
    const options = {
        hostname: '',
        port: 443,
        path: '',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }

    try{
        req =  await fetch('https:test-payment.momo.vn/v2/gateway/api/create',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            },
            body:requestBody
        });
        const result = await req.json();
        console.log(result);
        res.status(200).json({message: "Create Link Payment Success",data:result});
    }catch(error){
        res.status(400).json({message: error.message});
        console.log(error.message);
    }
});
route.post("/callback",async(req, res) => {
    try{
    console.log("callback");
    console.log(req.body);

    res.status(200).json({message: "callback success" ,data:req.body});
    }catch(error){

        res.status(400).json({message: "callback failed" ,data:req.body});
    }
})
route.post("/InitiateTransaction",async(req, res) => {
    const {orderId} = req.body;
    const newSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`
    const signature = crypto
        .createHmac("sha256", secretkey)
        .update(newSignature)
        .digest("hex")
    const requestBody = JSON.stringify({
        partnerCode:"MOMO",
        requestId: orderId,
        orderId,
        signature,
        lang:'vi'
    })
    try{
        req = await fetch("https:test-payment.momo.vn/v2/gateway/api/query",{
            method : "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body : requestBody
        })
        const result = await req.json();
        console.log(result);
        res.status(200).json({message:"Open Check Transaction success ",data:result});
    }catch(error){
        res.status(400).json({message:error.message});
    }
})
route.post("/refund",async(req, res) => {
    try{

    }catch(error){

    }
})

export default route