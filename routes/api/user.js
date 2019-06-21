const express   = require('express');
const router    = express.Router();
const gravatar  = require('gravatar');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');
const passport  = require('passport');


const keys             = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//load user model database
const User = require('../../models/User');

// @route /api/user/test
router.get('/test',(req,res) => res.json({ msg:"users works" }));


//creating a register
// @route api/user/register
router.post('/register',(req,res) => {
	//take the server side validation errors
	const { errors, isValid } = validateRegisterInput(req.body);
	//check validation
	if(!isValid){
		return res.status(400).json(errors);
	}


	User.findOne({ email: req.body.email }).then(user => {
		if(user){
			errors.email = 'email already exists';
			return res.status(400).json(errors);
		}else
		{
			//avatar
			var avatar = gravatar.url(req.body.email, {
 			s: '200', //size
 			r: 'pg',  //rating
 			d: 'mm'   //default
 		});
		
			//make a new user
			const newuser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password
			});

			//encrypting password
			bcrypt.genSalt(10,(err,salt) => 
			{
				bcrypt.hash(newuser.password, salt, (err, hash)=>{
					if(err) throw err;
					newuser.password = hash;
					newuser.save()
					.then(user => res.json(user))
					.catch(err => console.log(err));
				})
			})
		}
	});
});


//creating a login
//@route get api/user/login
router.post('/login',(req,res) => {
	const email     = req.body.email;
	const password  = req.body.password;

	//take the server side validation errors
	const { errors, isValid } = validateLoginInput(req.body);
	//check validation
	if(!isValid){
		return res.status(400).json(errors);
	}

 
	//find the user
	User.findOne({email}).then(user => {

		//check user
		if(!user){
			errors.email='User not found';
			return res.status(404).json(errors);
		} 
		//check password
		bcrypt.compare(password, user.password)
		.then(isMatch => {
			if(isMatch){
				//user matched

				//creating a payload or the the content that 
				//is going to get delivered on the server with the token
				const payload = { id:user.id, name:user.name, avatar:user.avatar }				

				//sign token(the token)
				jwt.sign(payload,keys.secret,{ expiresIn: 3600 }, (err,token) => {
					res.json({
						success:true,
						token: 'Bearer ' + token
					});
				});
				//res.json({msg:'success'});
			}else{
				errors.password = 'password incorrect';
				return res.status(400).json(errors);
			}


		})
	})

});

//@route GET api/users/current
//@desc Return current user
//access Private
router.get('/current', passport.authenticate('jwt',{session:false}),
	(req,res) => {
		res.json({user: req.user});
	}
);


module.exports = router;

