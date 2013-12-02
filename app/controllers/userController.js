var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Q	= require('q'),
	utils = require('../../lib/utils');
	WorkoutProgram = require('./WorkoutProgram');


exports.register = function(req, res){
	console.log("register: " + JSON.stringify(req.body));
	var user = new User(req.body)
	user.provider = 'local'
	user.save(function (err, usrData) {
		if (err) {
			console.log("ERROR: " +JSON.stringify(err) + "::" + utils.errors(err.errors));
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
	console.log("ID: " + id);

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
  res.send({
  	username : req.user.username,
  	id : req.user._id
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