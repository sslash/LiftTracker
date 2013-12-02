var async = require('async');
var auth = require('./middlewares/authorization');

/**
 * Route middlewares
 */

 var userController		= require('../app/controllers/userController');
 var workoutProgram = require('../app/controllers/workoutProgram');

 var liftTrackerAuth = [auth.requiresLogin, auth.workoutProgram.hasAuthorization]

module.exports = function(app, passport){	
	
	/* Workout programs */
	app.post('/workoutProgram', workoutProgram.post);
	app.get('/workoutPrograms/users/:id', workoutProgram.getWPsByOwnerId);

	/* Users */
	app.post('/users/', userController.register);
	app.post('/users/:uid/workoutProgram/setCurrent/:id', userController.setCurrentWorkoutProgram);

	app.get('/login', userController.login);
	app.get('/signup', userController.signup);
	app.get('/logout', userController.logout);
	app.post('/users', userController.register);
	app.post('/users/session',
		passport.authenticate('local', {
			//failureRedirect: '/login',
			//failureFlash: 'Invalid email or password.'
		}), userController.session)
	app.get('/users/:userId', userController.show)
	app.get('/auth/facebook',
		passport.authenticate('facebook', {
			scope: [ 'email', 'user_about_me'],
			failureRedirect: '/login'
		}), userController.signin)
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			failureRedirect: '/login'
		}), userController.authCallback)
	app.get('/auth/github',
		passport.authenticate('github', {
			failureRedirect: '/login'
		}), userController.signin)
	app.get('/auth/github/callback',
		passport.authenticate('github', {
			failureRedirect: '/login'
		}), userController.authCallback)
	app.get('/auth/twitter',
		passport.authenticate('twitter', {
			failureRedirect: '/login'
		}), userController.signin)
	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			failureRedirect: '/login'
		}), userController.authCallback)
	app.get('/auth/google',
		passport.authenticate('google', {
			failureRedirect: '/login',
			scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
			]
		}), userController.signin)
	app.get('/auth/google/callback',
		passport.authenticate('google', {
			failureRedirect: '/login'
		}), userController.authCallback)
	app.get('/auth/linkedin',
		passport.authenticate('linkedin', {
			failureRedirect: '/login',
			scope: [ 
			'r_emailaddress'
			]
		}), userController.signin)
	app.get('/auth/linkedin/callback',
		passport.authenticate('linkedin', {
			failureRedirect: '/login'
		}), userController.authCallback)

	app.param('userId', userController.user)
};
