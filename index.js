const express = require("express");
const app = express();

require("dotenv").config();

const DbConnection = require("./connection"); 
const urlRouter = require("./Routes/url_routes"); 

const dbUrl = process.env.DB_URL;
const port = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));



//DB Connection
DbConnection(dbUrl);

app.use("/",urlRouter);

app.listen(port,()=>{
    console.log(`Server Started`);    
});