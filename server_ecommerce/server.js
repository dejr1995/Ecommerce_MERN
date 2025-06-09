const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const path = require('path');
const register = require('./routes/register');
const login = require('./routes/login');
const stripe = require('./routes/stripe');
const productsRoute = require('./routes/products');
const bannersRoute = require('./routes/banners');
const users = require('./routes/users');
const orders = require('./routes/orders');

const products =  require('./products');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/api/register', register);
app.use('/api/login', login);
//stripe
app.use('/api/stripe', stripe);
//stripe

//cloudinary
app.use('/api/products', productsRoute);
app.use('/api/banners', bannersRoute);
//cloudinary

//Panel
app.use('/api/users', users);
app.use('/api/orders', orders);
//Panel

app.get('/', (req, res) => {
    res.send('Welcome to our online shop API...');
});
app.get('/products', (req, res) => {
    res.send(products);
});

const port = process.env.PORT || 3001;
const uri = process.env.DB_URI


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongDB connection successful...'))
.catch((err) => console.log('MongoDB connection failed',err.message));

/*const privateKey = fs.readFileSync('/etc/letsencrypt/live/ecommerce.devernlei.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/ecommerce.devernlei.com/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);*/

app.listen(port, console.log(`Server running on port ${port}`));

//CLIENT_URL = https://ecommerce.devernlei.com:3001