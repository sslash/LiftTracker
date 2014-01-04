var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	q = require('q'),
	WorkoutProgram = require('./workoutProgram');


exports.index = function(req, res) {
	res.render('index');
};

exports.logDay = function(req, res) {
	if (!req.session.passport.user) {res.send({err : 'User not logged in'}, 401);}

	var userId = req.session.passport.user;
	exports.getById(userId)
	.then(function(user){
		var log = req.body.log;
		var newEntry = log.days[log.days.length-1];
		newEntry.timestamp = new Date();

		user.log = log;

		user.save(function(err) {
			if (err) {
				res.send(err, 400);
			}else{
				res.send(log, 200);
			}
		});
	});
};

exports.logStatsEntry = function(req, res) {
	if (!req.session.passport.user) {
		res.send({err : 'User not logged in'}, 401);
	}

	var userId = req.session.passport.user;
	exports.getById(userId)
	.then(function(user){
		var statsLog = req.body.statsLog;
		var newEntry = statsLog.entries[statsLog.entries.length-1];
		newEntry.timestamp = new Date();
		user.statsLog = statsLog;

		user.save(function(err) {
			if (err) {
				res.send(err, 400);
			}else{
				res.send(statsLog, 200);
			}
		});
	});
};

exports.register = function(req, res){
	console.log("register: " + JSON.stringify(req.body));
	var user = new User(req.body)
	user.provider = 'local'
	user.save(function (err, usrData) {
		if (err) {
			return res.send(err, 401);
		}else{
			res.send({
			  	username : usrData.username,
			  	id : usrData._id
			  });
		}
		// manually login the user once successfully signed up
		// req.logIn(user, function(err) {
		// 	if (err) return next(err)
		// 		return res.redirect('/')
		// });
	});
};

exports.getById = function(id){
	var dfr = Q.defer();

	User.findOne({ _id : id }, function(err,doc){
		if (err){
			return  dfr.reject(err);
		}else{
			return dfr.resolve(doc);
		}
	});
	return dfr.promise;
};

var login = function (req, res) {
	WorkoutProgram.getById(req.user.currentWorkoutProgram)
	.then(function(WorkoutProgram){

		res.send({
			username : req.user.username,
			id : req.user._id,
			currentWorkoutProgram : WorkoutProgram,
			log : req.user.log,
			statsLog : req.user.statsLog
		});
	});
};

exports.setCurrentWorkoutProgram = function(req,res){
	var userId = req.params.uid;
	var id = req.params.id;
	exports.getById(userId)
	.then(function(user){

		WorkoutProgram.getById(id)
		.then(function(workoutProgram){
			user.currentWorkoutProgram = workoutProgram._id;
			user.save();
			return res.send(user);
		})
		.fail(function(err){
			return res.send(err, 400);
		})
	})
	.fail(function(err){
		console.log("sAP000:");
		return res.send(err, 400);
	});
},


exports.login = function(req,res){

}

exports.logout = function(req,res){
	
}

exports.signup = function(req,res){
	
}

exports.show = function(req,res){
	
}

/**
 * Session
 */
exports.session = login;

exports.signin = function(req,res){
	
}

exports.authCallback = function(req,res){
	
}

exports.user = function(req,res){
	
}