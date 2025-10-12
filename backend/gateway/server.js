const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
app.use(cors());


// Proxy setup
app.use('/auth', createProxyMiddleware({
    target: `http://localhost:5000`,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        if (req.body && Object.keys(req.body).length) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    }
}));


app.use('/restaurants', createProxyMiddleware({
    target: `http://localhost:5001`,
    changeOrigin: true,
    pathRewrite: { '^/restaurants': '' }, 
    onProxyReq: (proxyReq, req, res) => {
        if (req.body && Object.keys(req.body).length) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    }
}));

app.use('/orders', createProxyMiddleware({
    target: `http://localhost:5002`,
    changeOrigin: true,
    pathRewrite: { '^/orders': '' },
    onProxyReq: (proxyReq, req, res) => {
        if (req.body && Object.keys(req.body).length) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    }
}))

app.use(express.json());

app.get('/api/health', (req, res)=>{
    res.json({status: "API Gateway running"})
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`API Gateway running at port ${PORT}`);
});
