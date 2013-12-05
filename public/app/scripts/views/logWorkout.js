/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'templates'
	], function ($, _, Backbone, JST) {
		'use strict';

		var LogworkoutView = Backbone.View.extend({
			template: JST['./public/app/scripts/templates/logWorkout.hbs'],

			events : {
				'click #logTable button' : '__addSetClicked'
			},

			serializeData : function(){
				var u = LF.user.toJSON();
				var currProgram = u.currentWorkoutProgram;
				var currDay = currProgram.programDays[u.log.currDay]
				return {
					days : currProgram.programDays,
					currDay : currDay,
					user : u
				}
			},

			render : function() {
				this.$el.html(this.template(this.serializeData()));
				return this;
			},

			__addSetClicked : function(e){
				console.log("LCIKED");
				var $currTarget = $(e.target);
				var $parent = $currTarget.parent();
				var $inputs = $parent.find('.inputField');

				var values = $inputs.find('input');
				var kg = values[0].value;
				var reps = values[1].value;

				values[0].value = values[1].value = '';

				// for each
				var $appendInputs = $( $("<div class='loggedSet'>" + $inputs.html() + "</div>") );
				var appendedVals = $appendInputs.find('input');
				appendedVals[0].value = kg;
				appendedVals[1].value = reps;

				$parent.prepend($appendInputs);
			}
		});

		return LogworkoutView;
	});