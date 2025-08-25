import express from 'express'
import connectdb from './config/mongoDB.js'
import dotenv from 'dotenv';
import cors from 'cors'
import userRouter from './routes/userRoute.js';
// const bookRoutes = require("./routes/bookRoutes")
import bookRoutes from './routes/BookRoute.js'


dotenv.config();

const app = express()
const port = process.env.PORT || 4000


app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",  // your React frontend URL
  credentials: true,                // allow cookies / auth headers
}));


app.use('/api/users', userRouter)
app.use("/api/books", bookRoutes);

app.get('/', (req, res) =>{
    res.send("App is running")
})
connectdb().then(()=>{

    app.listen(port, ()=> console.log("server started at", port))
})