import express from 'express';
import paymentRouter from './middleware/payment_router.js';

const app= express();
app.use(express.json());

app.use("/payments",paymentRouter);

app.get("/",(req,res)=>{
    res.send({"hey":"working"});
})

app.listen(8123)