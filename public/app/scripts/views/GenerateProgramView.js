/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',

    'models/WorkoutProgram',

    'bootstrap'
], function ($, _, Backbone, JST, WorkoutProgram, BS) {
    'use strict';

    var GenerateprogramviewView = Backbone.View.extend({
        template: JST['./public/app/scripts/templates/GenerateProgramView.hbs'],
        exerciseTableTpl : JST['./public/app/scripts/templates/exerciseTable.hbs'],
        tableTpl : JST['./public/app/scripts/templates/dayTable.hbs'],
        modalTpl : JST['./public/app/scripts/templates/modal.hbs'],
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
            this.listenTo(this.model, 'change', this.__modelSaved);
        	
        	this.exerciseCount = 0;
            this.dayCount = 0;
            this.ptClasses = ['col-lg-12','col-lg-6', 'col-lg-4', 'col-lg-3', 'col-lg-2','col-lg-2'];
        },

        render : function(){        	
            this.renderTemplate();
            this.renderNewDay();
        	return this;
        },

        remove : function(){
            this.$el.remove();
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
            var data = {
                programTitle : $('#programTitle').val(),
                owner : LF.user.toJSON()
            };
            this.model.save(data);
        },

        __modelSaved : function(model){
            var modalTpl = this.modalTpl({
                programTitle : model.get('programTitle')
            });

            $('#modal').append(modalTpl);
            $('#leModal').modal('show');
        },

        emptyExcerciseFields : function($ex, $sets){
            $ex.val('');
            $sets.val('');
            $ex.focus();
        },

        appendExercise : function(ex, sets){
        	this.exerciseCount ++;
        	$('.programTable tbody').last().append(this.exerciseTableTpl({
        		programTitle : ex,
        		setsNReps : sets,
        		count : this.exerciseCount
        	}));
        }
    });

    return GenerateprogramviewView;
});