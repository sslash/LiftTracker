var mongoose = require('mongoose'),
User = mongoose.model('User'),
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