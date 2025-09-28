const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json())

app.get('/api/health', (req, res)=>{
    res.json({status: "auth-service running"})
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('DB Connected');
    app.listen(PORT, ()=>{
        console.log(`DB is connected at port ${PORT}`)
    })

}).catch((error)=>{
    console.log(error);
})