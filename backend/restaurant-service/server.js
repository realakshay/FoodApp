const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const restaurantRoutes = require('./src/routes/restaurantRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/base', restaurantRoutes);
app.get('/health', (req, res)=>{
    res.json({status: "restaurant-service running"})
})

const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('DB Connected');
    app.listen(PORT, ()=>{
        console.log(`DB is connected at port ${PORT}`);
    })
}).catch((error)=>{
    console.log(error);
})