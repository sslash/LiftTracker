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
			dayTpl : JST['./public/app/scripts/templates/workoutDay.hbs'],

			initialize : function() {
				this.day = {
					ex : []
				};

				this.listenTo(LF.user, 'sync', this.userSynced);
			},

			ui : {
				day : '#day-region'
			},

			events : {
				'click #logTable button' 	: '__addSetClicked',
				'click #save-btn'			: '__saveClicked',
				'keypress .reps-input'		: '__addSetsKeyPress',
				'change #select-day'		: '__dayChanged'
			},

			__dayChanged : function(e) {
				console.log(this);
				var index = parseInt(e.currentTarget.value.split('Day -')[1], 10);
				var day = LF.user.get('log').days[index];
				this.renderDay(day);
			},

			renderDay : function(day) {
				var html = this.dayTpl(day);
				this.$(this.ui.day).html(html);
			},

			serializeData : function(){
				var u = LF.user;
				if ( !u.get('currentWorkoutProgram') ){
					return { err : 'Choose Workout Program First!'};
				}
				var currProgram = u.get('currentWorkoutProgram');
				var currDay = u.getCurrentDayInWeek();
				var currWeek = u.getCurrentProgramWeek();
				
				return {
					days : currProgram.programDays,
					currDay : currProgram.programDays[currDay],
					currWeek : currWeek,
					user : u,
					log : LF.user.get('log')
				};
			},

			userSynced : function(log) {
				this.day.ex.length = 0;
				this.day = {
					ex : []
				};
				this.render();
			},

			render : function() {
				this.$el.html(this.template(this.serializeData()));
				return this;
			},

			__saveClicked : function() {
				LF.user.logWorkoutDay(this.day);
			},

			__addSetsKeyPress : function(e) {
				if ( e.keyCode === 13) {

					var $currTarget = $(e.target);

					var reps = $currTarget.val();
					var kgInput = $currTarget.parent().find('input')[0];
					var ex = $currTarget.attr('data-ex');

					var $inputs = $currTarget.closest('.inputField');

					this.addSet(reps, kgInput.value, ex, $inputs, $currTarget.closest('td'));

					$currTarget.val('');
					kgInput.value = '';
				}
			},

			__addSetClicked : function(e){
				var $currTarget = $(e.target);
				var $parent = $currTarget.parent();
				var ex = $currTarget.attr('data-ex');
				var $inputs = $parent.find('.inputField');

				var values = $inputs.find('input');
				var kg = values[0].value;
				var reps = values[1].value;
				this.addSet(reps,kg,ex, $inputs, $parent);

				values[0].value = values[1].value = '';
			},

			addSet : function(reps,kg,ex, $inputs, $container) {
				this.addSetToLog(reps, kg, ex);
				this.addSetToUI(reps, kg, ex, $inputs, $container);
			},

			addSetToUI : function(reps, kg, ex, $inputs, $container) {
				// for each
				var $appendInputs = $( $("<div class='loggedSet'>" + $inputs.html() + "</div>") );
				var appendedVals = $appendInputs.find('input');
				appendedVals[0].value = kg;
				appendedVals[1].value = reps;

				$container.prepend($appendInputs);
			},

			addSetToLog : function(reps, kg, ex) {
				var currentExercise = {};
				if ( !this.excersiceAddedYet(ex)) {
					currentExercise = this.createExecriceObj(ex)
					this.day.ex.push( currentExercise );
				}else{
					currentExercise = this.getExerciseObj(ex);
				}

				currentExercise.sets.push ({
					'kg' : kg,
					'reps' : reps
				});

				console.log(JSON.stringify(this.day));
			},

			getExerciseObj : function(ex) {
				var toRet = {};
				this.day.ex.forEach(function(e){
					if (e.exTitle === ex) {
						toRet = e; return true;
					}
				});

				return toRet;
			},

			excersiceAddedYet : function(ex) {
				var toRet = false;
				this.day.ex.forEach(function(e){
					if (e.exTitle === ex) {
						toRet = true; return true;
					}
				});

				return toRet;
			},

			createExecriceObj : function(ex) {
				return {
					exTitle : ex,
					sets : []
				};
			}
		});

		return LogworkoutView;
	});