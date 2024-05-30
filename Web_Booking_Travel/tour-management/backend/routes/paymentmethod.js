import express from 'express'
import cors from 'cors';
import crypto from 'crypto'

var partnerCode = "MOMO";
var accessKey = "F8BBA842ECF85";
var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
var requestId = partnerCode + new Date().getTime();
var orderId = requestId;
var orderInfo = "pay with MoMo";
var redirectUrl = "https://momo.vn/return";
var ipnUrl = "https://callback.url/notify";
var amount = "50000";
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

const app = express();

const port = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:5000', 
    credentials: true, 
};


app.use(express.json());
app.use(cors(corsOptions)); // Use the correct CORS options here
app.get("/", (req, res) => {
});
app.listen(port, () => {
    console.log("api success");
})
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
    lang: 'en'
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

app.post("/",async(req, res) => {
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
