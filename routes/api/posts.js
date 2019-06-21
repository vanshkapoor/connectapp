const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load databases
const Post = require('../../models/post');
const profile = require('../../models/profile');

//load post validation
const  validatePostInput = require('../../validation/post');

router.get('/test',(req,res) => res.json({ msg:"posts" }));


//@route GET api/posts
//@desc get all posts
//@access public
router.get('/',(req,res) => {
	Post.find()
	.sort({ date:-1 })
	.then(posts => res.json(posts))
	.catch(err => res.status(404).json({noposts: 'No posts at the moment'}));
});

//@route GET api/posts/:id
//@desc GET all posts by id
//@access public
router.get('/:id',(req,res) => {
	Post.findById(req.params.id)
	.then(post => res.json(post))
	.catch(err => res.status(404).json({nopost:"No post for this user"}));
});


//@route POST api/posts
//@desc create post
//@access private
router.post('/', passport.authenticate('jwt', { session: false }),
	(req,res) => {
		
		//validation
		const {errors, isValid} = validatePostInput(req.body);
		if(!isValid){
			return res.status(400).json(errors);
		}

		const newpost = {
			text:req.body.text,
			name:req.body.name,
			avatar:req.body.avatar,
			user:req.user.id
		};
		new Post(newpost).save().then(post => res.json(post));
});

//@route DELETE api/posts/:id
//@access private
router.delete('/:id',passport.authenticate('jwt',{session:false}),
	(req,res)=>{
		Profile.findOne({user:req.user.id})
		.then(profile => {
			Post.findById(req.params.id)
			.then(post =>{
				if(post.user.toString() !== req.user.id ){
					return res.status(401).json({notauthorised:"user not authorised"});
				}
				//delete
				post.remove().then(() => res.status({ status: true}));
			})
			.catch(err => res.status(404).json({postnotfound:"post not found"}));
		}) 
});

//likes
//@route api/posts/like/:id(post id)
router.post('/like/:id',passport.authenticate('jwt',{session:false}),
	(req,res)=>{
		Profile.findOne({user:req.user.id})
		.then(profile => {
			Post.findById(req.params.id)
			.then(post =>{
				if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
					return res.status(404).json({alreadyliked:'User has already liked'})
				}
				post.likes.push({user:req.user.id});

				post.save(post).then(post => res.json(post));

			})
			.catch(err => res.status(404).json({postnotfound:"post not found"}));
		}) 
});


//unlikes
//@route api/posts/unlike/:id(post id)
router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),
	(req,res)=>{
		Profile.findOne({user:req.user.id})
		.then(profile => {
			Post.findById(req.params.id)
			.then(post =>{
				if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0)
				{
					return res.status(404).json({notliked:'you have not yet liked this post'});
				}

			const removeIndex = post.likes.map( item => item.user.toString())
			.indexOf(req.user.id);

			post.likes.splice(removeIndex,1); 

			post.save(post).then(post => res.json(post));



			})
			.catch(err => res.status(404).json({postnotfound:"post not found"}));
		}) 
});

//COMMENTS


//@route POST api/posts/comment/:id
//add comment
//PRIVATE
router.post('/comment/:id',passport.authenticate('jwt',{session:false}),
	(req,res)=>{

		//validation
		const {errors, isValid} = validatePostInput(req.body);
		if(!isValid){
			return res.status(400).json(errors);
		}

		Post.findById(req.params.id).then(post => {
			const newcomment = {
				text:req.body.text,
				name:req.body.name,
				avatar:req.body.avatar,
				user:req.user.id
			}

			//add to comments array
			post.comments.unshift(newcomment);
			post.save(post).then(post => res.json(post));
		})
		.catch(err => res.status(404).json({postnotfound:"No post found"}));

});

//@route DELETE api/posts/comment/:id/:comment_id
//@desc delete comment
//@access PRIVATE

router.post('/comment/:id/:comment_id', 
	passport.authenticate('jwt',{session:false}),
	(req,res)=>{
		Post.findById(req.params.id)
		.then(post => {

			if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length > 0)
			{

	 			const removeIndex = post.comments.map( item => item._id.toString())
				.indexOf(req.params.comment_id);

				post.comments.splice(removeIndex,1); 

				post.save(post).then(post => res.json(post));

			}
			res.status(404).json({nocomment:'comment does not exist'});
			
		})
		.catch(err => res.status(404).json({postnotfound:"No post found"}));

	})








module.exports = router;

