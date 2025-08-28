import express from 'express'
import dotenv from 'dotenv';
import connectdb from './config/mongoDB.js'
import cors from 'cors'
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
// const bookRoutes = require("./routes/bookRoutes")
import bookRoutes from './routes/BookRoute.js'


dotenv.config();
const app = express()
const port = process.env.PORT || 4000


app.use(express.json())
app.use(cors({
  origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://easyibrary.netlify.app"
    ], 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,                // allow cookies / auth headers
}));


app.use('/api/admin', adminRouter)
app.use('/api/users', userRouter)
app.use("/api/books", bookRoutes);

app.get('/', (req, res) =>{
    res.send("App is running")
    
})
connectdb().then(()=>{

    app.listen(port, ()=> console.log("server started at", port))
})