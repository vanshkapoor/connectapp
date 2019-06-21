const express     = require('express');
const mongoose    = require('mongoose');
const database    = require('./config/keys').mongoURI;
const bodyParser  = require('body-parser');
const passport    = require('passport');
 const path=require('path');
//api routes
const user      = require('./routes/api/user');
const profile   = require('./routes/api/profile');
const posts     = require('./routes/api/posts');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//mlab connection
mongoose.connect(database,{ useNewUrlParser: true },function(err){
	if(err){
		console.log(err);
	}else{
		console.log("connected to database");
	}
});

app.get('/',(req,res)=>{
	res.send('check!!');
});

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//use routes
app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// server static assets if in production
// if(process.env.NODE_ENV === 'production' ){
// 	//set static folder
// 	app.use(express.static('client/build'));

// 	app.get('*',(req,res)=>{
// 		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
// 	});
// }
	

//serving
const port = process.env.PORT || 5000;
app.listen(port ,(err)=>{
	if(err){
		console.log(err);
	}else
	{
		console.log('server running on port 5000');
	}
})
