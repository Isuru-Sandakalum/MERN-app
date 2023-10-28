import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js"
import cookieParser from "cookie-parser";


dotenv.config();

//checking connection and set the connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
//allow jason
app.use(express.json());

app.use(cookieParser());

//set port number
app.listen(3000,
  () => {
    console.log("Server is runing on port 3000");
  });

//test API
app.use("/api/user", userRouter);

//Auth API
app.use("/api/auth", authRouter);
//listing route
app.use('/api/listing', listingRouter);

//test path api route
// app.get('/test',(req,res)=>{
//  res.send('Hello');
// });



//middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

//sw2Ru4TGRRSI43df
