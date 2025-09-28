const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json())

app.get('/api/health', (req, res)=>{
    res.json({status: "API Gateway running"})
})

// Proxy setup
app.use('/auth', createProxyMiddleware({
    target: `http://localhost:5000`,
    changeOrigin: true,
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`API Gateway running at port ${PORT}`)
})
