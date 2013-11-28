/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',

    'models/WorkoutProgram'
], function ($, _, Backbone, JST, WorkoutProgram) {
    'use strict';

    var GenerateprogramviewView = Backbone.View.extend({
        template: JST['app/scripts/templates/GenerateProgramView.hbs'],
        exerciseTableTpl : JST['app/scripts/templates/exerciseTable.hbs'],
        tableTpl : JST['app/scripts/templates/dayTable.hbs'],
        model : WorkoutProgram,

        events : {
        	'click #addDayBtn'                  : '__addDayBtnClicked',
        	'click form .nextExercise'          : '__nextExerciseClicked',
            'blur .programTables .dayTitle'     : '__dayTitleBlurred',
            'click #saveBtn'                    : '__saveBtnClicked'
        },

        initialize : function() {
        	this.program = {
        		days: []
        	};

            this.model = new WorkoutProgram();
        	
        	this.exerciseCount = 0;
            this.dayCount = 0;
            this.ptClasses = ['col-lg-12','col-lg-6', 'col-lg-4', 'col-lg-3', 'col-lg-2','col-lg-2'];
        },

        render : function(){        	
            this.renderTemplate();
            this.renderNewDay();
        	return this;
        },

        renderTemplate : function(){
            this.$el.append(this.template());
        },

        renderNewDay : function(){
            this.$('.programTables').append(this.tableTpl({
                dayCount : this.dayCount
            }));
        },

        __addDayBtnClicked : function(e) {
        	e.preventDefault();

        	this.exerciseCount = 0;
            var currClass = this.ptClasses[this.dayCount];
            this.$('.programTables .programTable').removeClass(currClass);
            this.dayCount ++;
            currClass = this.ptClasses[this.dayCount];
            this.renderNewDay();
            this.$('.programTables .programTable').addClass(currClass);
            this.model.addProgramDay();
        },

        __nextExerciseClicked : function(e) {
        	e.preventDefault();
        	var $ex = $(e.currentTarget).parent().find('.exercise');
        	var $sets = $(e.currentTarget).parent().find('.setsNReps');

            this.model.addExerciseOnDay({
                title : $ex.val(),
                setsNReps : $sets.val()
            }, this.dayCount);

        	this.appendExercise($ex.val(), $sets.val());
            this.emptyExcerciseFields($ex,$sets);
        },

        __dayTitleBlurred : function(e){
            e.preventDefault();
            var title = $(e.currentTarget).text();
            var day = $(e.currentTarget).attr('data-id');
            day = parseInt(day, 10);
            this.model.addTitleOnDay(title, day);
        },

        __saveBtnClicked : function(){
            var title = $('#programTitle').val();
            this.model.save({title: title});
        },

        emptyExcerciseFields : function($ex, $sets){
            $ex.val('');
            $sets.val('');
            $ex.focus();
        },

        appendExercise : function(ex, sets){
        	this.exerciseCount ++;
        	$('.programTable tbody').last().append(this.exerciseTableTpl({
        		title : ex,
        		setsNReps : sets,
        		count : this.exerciseCount
        	}));
        }
    });

    return GenerateprogramviewView;
});