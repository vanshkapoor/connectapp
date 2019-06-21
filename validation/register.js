const validator = require('validator');
const isempty   = require('./is-empty');

module.exports = function validateRegisterInput(data){
	let errors = {};

	//creating empty strings for each for isEmpty to work
	data.name = !isempty(data.name) ? data.name : ' ';
	data.email = !isempty(data.email) ? data.email : ' ';
	data.password = !isempty(data.password) ? data.password : ' ';
	data.password2 = !isempty(data.password2) ? data.password2 : ' ';




	//name
	if(validator.isEmpty(data.name)){
		errors.name = 'Name is required';
	}
	//email
	if(validator.isEmpty(data.email)){
		errors.email = 'Email is required';
	}
	//email valid
	if(!validator.isEmail(data.email)){
		errors.email = 'Email is invalid';
	}
	//password
	if(validator.isEmpty(data.password)){
		errors.password = 'password is required';
	}
	//confirmation password
	if(validator.isEmpty(data.password2)){
		errors.password2 = 'Confirm Password field is empty';
	}
	//checking length of password
	if(!validator.isLength(data.password,{min:6, max:30})){
		errors.password = 'Password  must be 6 characters long';
	}
	//comparing password
	if(!validator.equals(data.password,data.password2)){
		errors.password2 = 'passwords must match';
	}
	if(!validator.isLength(data.name, { min: 2, max: 30 })){
	errors.name = 'Name must be between 2 and 30 characters';
	}



	//returning the errors
	return {
		errors,
		isValid: isempty(errors)
	};

};