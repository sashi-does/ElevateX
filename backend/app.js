import express from 'express'
import BookingRouter from './routes/BookingRoute.js';
import EmailRouter from './routes/EmailRoute.js';
import cors from 'cors';

const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api', BookingRouter);
app.use("/api", EmailRouter);

app.listen(3000,() => {
    console.log("Server is running at port: " + port);
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})



