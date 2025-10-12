const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const orderRoutes = require('./src/routes/orderRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/base', orderRoutes);

app.get('/health', (req, res) => {
    res.json({ status: "order-service running" })
})

const PORT = process.env.PORT || 5002;
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('DB Connected');
    app.listen(PORT, () => {
        console.log(`Order service running at port ${PORT}`);
    })

}).catch((error) => {
    console.log(error);
}
)