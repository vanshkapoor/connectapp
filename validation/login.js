const validator = require('validator');
const isempty   = require('./is-empty');

module.exports = function validateLoginInput(data){
	let errors = {};

	//creating empty strings for each for isEmpty to work
	data.email = !isempty(data.email) ? data.email : ' ';
	data.password = !isempty(data.password) ? data.password : ' ';


	//password
	if(validator.isEmpty(data.password)){
		errors.password = 'password is required';
	}

	//email
	if(validator.isEmpty(data.email)){
		errors.email = 'Email is required';
	}
	//email valid
	if(!validator.isEmail(data.email)){
		errors.email = 'Email is invalid';
	}
	//checking length of password
	if(!validator.isLength(data.password,{min:6, max:30})){
		errors.password = 'Password  must be 6 characters long';
	}


	//returning the errors
	return {
		errors,
		isValid: isempty(errors)
	};

};