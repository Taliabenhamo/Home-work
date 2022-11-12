const express=require("express")
const app=express();
const port=3000
const mysql=require("mysql");
const{join}=require("path")
app.listen(port,()=>{
    console.log(`listning on port ${port}`);
})
const { render } = require("ejs");
app.set("views",join(__dirname,"views"));
app.set("view engien","ejs");
let connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"models"
});



let myCars=[
    {
        name:"toyota",
        type:"corola",
        price:65000,
        engine_power:1300
    },
    {
        name:"seat" ,
        type:"ibiza",
        price:60000 ,
        engine_power:1200
    },
    { name:"skoda" ,
    type:"superb",
    price:120000 ,
    engine_power:1500

    },
    { name:"kia" ,
    type:"picanto",
    price:30200 ,
    engine_power:1000

    },
    { name:"mercedes" ,
    type:"S-class",
    price:800000 ,
    engine_power:2500

    },
    {
        name:"suzuki" ,
        type:"alto",
        price:25000 ,
        engine_power:1100
    }
 
];

let inserIntro = `INSERT INTO cars(\`name\`,\`type\`,\`price\`,\`engine_power\`)
VALUES`;

let msg = "";

myCars.forEach((car, index) => {
  let sign = index === myCars.length - 1 ? ";" : ",";
  msg += `("${car.name}","${car.type}", ${car.price},${car.engine_power})${sign}`;
});
let builtQuer = inserIntro + msg;
console.log(builtQuer);

let insertCars=()=>{
    connection.query(builtQuer,(err,result)=>{
        if (err) console.log(err);
        console.log(result);
    })
}
insertCars();