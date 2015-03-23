var express = require('express');
var router = express.Router();

module.exports = function(passport){
	router.route('/')
		.get(function(req, res, next) {
			if(req.isAuthenticated()){
				res.redirect('/profile');
			} else{
				res.render('index', { title: 'Passport and ACL demo' });
			}
			res.send("Op login pagina");
		});
	router.route('/login')
		.get(function(req, res){
			res.render('account/login', { title: 'Login', message: req.flash('loginMessage') }); 
		})
		.post(passport.authenticate('local-login', {
	        successRedirect : '/profile', // redirect to the secure profile section
	        failureRedirect : '/login', // redirect back to the signup page if there is an error
	        failureFlash : true // allow flash messages
	    }));

	router.route('/logout')
		.get(function(req, res){
			req.logout();
			res.redirect('/');
		});

	router.route('/signup')
		.get(function(req, res){
			res.render('account/signup', { title: 'Local Signup', message: req.flash('signup') }); 
		})
		.post(passport.authenticate('local-signup', {
	        successRedirect : '/profile', // redirect to the secure profile section
	        failureRedirect : '/signup', // redirect back to the signup page if there is an error
	        failureFlash : true // allow flash messages
	    }));

    router.route('/profile')
    	.get(function(req, res) {
		        res.render('account/profile', {
		        	title: 'Your profile', 
		            user : req.user // get the user out of session and pass to template
		        });
		    }
		);
	return router;
};
