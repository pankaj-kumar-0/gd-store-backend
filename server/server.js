const express = require('express');
const app = express();
const connet_DB = require('./Config/mongodb.js');
require('dotenv').config();

const errorMiddleware = require('./Middlewares/errorMiddleware.js');
const cookieParser = require('cookie-parser');


const product_route = require('./Routes/productRoute.js');
const user_route = require('./Routes/userRoutes.js');
const order_route = require('./Routes/orderRoute.js');

const port = process.env.PORT ;
const DB_URL = process.env.DB_URL;

connet_DB(DB_URL);

app.use(express.json());
app.use(cookieParser());




app.get('/api', (req,res)=>{
    res.status(200).json({
        success: true,
        message: "Server is Listening..."
    })
});

// routes 
app.use("/api", product_route);
app.use("/api", user_route);
app.use("/api", order_route);



// error middleware 
app.use(errorMiddleware);



app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
});



