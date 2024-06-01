import express from 'express';
import roomRouter from './routes/roomRouter.js';
import spentRouter from './routes/spentRouter.js';
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());

//Routes
app.use('/', roomRouter)
app.use('/', spentRouter)


// Undefined route managament
app.get('*', (req, res) => {
    res.send('<center><h1>This page does not exist...👻</h1></center>');
});

// Express server
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});