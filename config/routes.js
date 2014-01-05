var async = require('async');
var auth = require('./middlewares/authorization');

/**
 * Route middlewares
 */
 var userController		= require('../app/controllers/userController');
 var workoutProgram = require('../app/controllers/workoutProgram');

 var liftTrackerAuth = [auth.requiresLogin, auth.workoutProgram.hasAuthorization]

module.exports = function(app, passport){	
	
	app.get('/', userController.index);
	
	/* Workout programs */
	app.post('/workoutProgram', auth.requiresLogin, workoutProgram.post);
	app.get('/workoutPrograms/users/:id', workoutProgram.getWPsByOwnerId);

	/* Users */
	app.post('/users/', userController.register);
	app.put('/users', auth.requiresLogin, userController.updateUser);
	app.post('/users/:uid/workoutProgram/setCurrent/:id', userController.setCurrentWorkoutProgram);
	app.post('/users/:uid/logDay', userController.logDay);
	app.post('/users/:uid/logStatsEntry', userController.logStatsEntry);

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
	app.param('userId', userController.user)
};
