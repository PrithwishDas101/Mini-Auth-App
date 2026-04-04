const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');

const authRouter = require('./routers/authRouter');
const postsRouter = require('./routers/postsRouter');
const storyRouter = require('./routers/storyRouter');


const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
}).then(() => {
    console.log("mongodb connected");
}).catch(err => {
    console.log("MongoDB Connection Error:", err.message);
    console.log("Retrying in 5 seconds...");
    setTimeout(() => {
        mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });
    }, 5000);
})

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/stories', storyRouter);

app.get('/', (req, res) => {
    res.json({ message: "hello from the server" });
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});