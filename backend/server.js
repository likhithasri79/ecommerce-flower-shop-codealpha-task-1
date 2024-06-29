const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const flowerRoutes = require('./routes/flowerRoutes');
const cartRoutes = require('./routes/cartRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    if (req.method !== 'GET' && req.body) {
        res.setHeader('Content-Type', 'application/json');
    }
    next();
});

app.use('/api/users', userRoutes);
app.use('/api/flowers', flowerRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
