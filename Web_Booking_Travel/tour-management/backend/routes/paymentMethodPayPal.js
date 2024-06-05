import express from "express";

const route = express.Router();


route.post("paymentPaypal", (req, res) => {
    res.send("payment paypal");
})

export default route;