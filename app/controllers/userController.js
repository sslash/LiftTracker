var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	utils = require('../../lib/utils');


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

var login = function (req, res) {
  // if (req.session.returnTo) {

  //   res.send(req.session.returnTo)
  //   console.log("delete and return");
  //   delete req.session.returnTo
  //   return;
  // }
  res.send({
  	username : req.user.username,
  	id : req.user._id
  });
}


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