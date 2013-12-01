
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var WorkoutProgramSchema = Schema({
  programTitle: String,
  programDays: [],
  updated: { type: Date, default: Date.now },
  owner : [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

WorkoutProgramSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('WorkoutProgram', WorkoutProgramSchema);
