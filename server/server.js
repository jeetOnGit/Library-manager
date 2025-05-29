import express from 'express'
import connectdb from './config/mongoDB.js'
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';

dotenv.config();

const app = express()
const port = process.env.PORT || 4000


app.use(express.json())
app.use('/api/user', userRouter)

app.get('/', (req, res) =>{
    res.send("App is running")
})
connectdb().then(()=>{

    app.listen(port, ()=> console.log("server started at", port))
})