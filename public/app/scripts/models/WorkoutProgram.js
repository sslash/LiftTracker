/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var WorkoutprogramModel = Backbone.Model.extend({
        url : '/workoutProgram',
        defaults: {
        	programTitle : '',
        	programDays : [
        		{
        			dayTitle : '',
        			exercises : []
        		} // day 1
        	]
        },

        addProgramDay : function(){
        	var programDays = this.get('programDays');
        	programDays.push({
        		dayTitle : '',
    			exercises : []
        	})
        },

        addExerciseOnDay : function(exercise, day){
        	if ( day < this.get('programDays').length){
        		var programDays = this.get('programDays');

        		programDays[day].exercises.push(exercise);
        		this.set({programDays : programDays});
        	}
        },

        addTitleOnDay : function(title, day){
        	if ( day < this.get('programDays').length){
        		var programDays = this.get('programDays');
        		programDays[day].dayTitle = title;
        		this.set({programDays : programDays});
        	}	
        }
    });

    return WorkoutprogramModel;
});



/*
days [
title
	{
		title
		setsnreps
	}
	
]
*/