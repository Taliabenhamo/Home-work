const express=require('express');
const server=express();
const port=3000;
const carsRouter = require("./routres/carsRouter");
const  cors = require('cors');
require("./dal/dal");


server.use(express.json());
server.use(cors());
server.use("/api/cars", carsRouter); // Router for Cars



server.listen(port,()=>{
    console.log(`you listning to ${port}`);
}
)