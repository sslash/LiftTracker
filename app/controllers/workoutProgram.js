var mongoose = require('mongoose'),
User = mongoose.model('User'),
Q = require('Q'),
WorkoutProgram = mongoose.model('WorkoutProgram');


exports.post = function(req, res){
	var programData = req.body;
	var owner = User.findOne({ _id: programData.owner.id },
		function(err,owner){

			if ( !err ){
				programData.owner = owner;
				var wp = new WorkoutProgram(programData);
				wp.save(
					function(wpErr, doc){
						if (wpErr){
							err = wpErr; 
						}else{
							return res.send(doc);
						}
					});
			}

			return res.send(err, 400);
		});
};

exports.getById = function(id){
	var dfr = Q.defer();
	WorkoutProgram.findOne({ _id : id }, function(err,doc){
		if (err){
			return  dfr.reject(err);
		}else{
			return dfr.resolve(doc);
		}
	});
	return dfr.promise;
}


exports.getWPsByOwnerId = function(req, res){
	var userId = req.params.id;
	WorkoutProgram.find({owner : userId}, function(err, doc){
		if(err){
			return res.send(err.errors, 400);
		}else{
			return res.send(doc);
		}
	});
};