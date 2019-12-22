var express = require("express");
var cors = require("cors");
var path = require("path");
var bodyParser = require("body-parser");
var expressJwt = require("express-jwt");
var route = require("./routes/userauth.route");
var app = express();


//connecting to mongodb 
//database connection setup
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/JWTAuth",{ useNewUrlParser: true ,useUnifiedTopology:true})
.then(() => console.log('Connected to MongoDB!!'))
.catch((err) => console.log(err));


//middlewares used
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//routes
app.use("/",route);

app.get('/home',function(req,res){
    res.json({'JWT':"Welcome to Json Web Token Tutorial"});
})


app.listen(7070,function(req,res){
    console.log("You are listening to port 7070")
})