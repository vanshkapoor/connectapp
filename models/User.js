const mongoose = require('mongoose');
const schema    = mongoose.Schema;


//define schema
const userschema = new schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	avatar:{
		type:String,
	},
	date:{
		type:Date,
		default:Date.now
	},

});

var User = mongoose.model('users',userschema);
module.exports = User;
