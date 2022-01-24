const express = require("express");
var user = require('./users_module');
const port = 8080;

const app = express();
app.use(express.json());

var cors = require('cors');
app.use(cors());

app.use('/user', user);

app.use(function(req, res, next) {
	res.status(404);
	res.send('404: File Not Found');
});

app.listen(process.env.PORT || port, () => {
	console.log("listening 8080...");
});


//server.listen(port,()=>{  // do not add localhost here if you are deploying it
//    console.log("server listening to port "+port);
//});


/*
const path = require("path");
const mongoose = require("mongoose");
const conn_str = "mongodb+srv://admin:admin@cluster0.cwsvi.mongodb.net/tcet?retryWrites=true&w=majority"

const port = 8080;
mongoose.connect(conn_str, { useNewUrlParser: true , useUnifiedTopology: true})
	.then( () => console.log("Connected successfully...") )
	.catch( (err) => console.log(err) );

const userSchema = new mongoose.Schema({
	name: String,
	city: String,
	age: Number
});

const user = new mongoose.model("user", userSchema);


const express = require("express");
const app = express();

app.get('/', (req, res)=>{res.sendFile(path.join(__dirname,"/landing.html"))})
//app.get('/welcome', (req, res)=>{res.sendFile(path.join(__dirname,"/landing.html"))})



app.use(express.json());
//app.use(cors()); 

app.route("/user")
.get(async (req, res) => {
	let data = await user.find();
	res.send(data);
})
.post(async (req, res) => {
	req_data = req.body;
   // console.log(req.query);
	let obj = new user(req.query)
    let result = await obj.save();
    console.log(result);
	res.send(result);
})
.put(async (req, res) => {
	req_data = req.body;
	console.log(req_data.id);
	let result = await user.updateOne({_id: req_data.id}, {$set : {city: req_data.city}})
	 res.send(result);
	// res.send(req_data);
})
.delete(async (req, res) => {
	let result = await user.deleteOne({_id: req.body.id})
	res.send(result);
})

app.listen(process.env.PORT || port, () => {
	console.log("listening 8080...");
}); */
