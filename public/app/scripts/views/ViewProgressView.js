/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',

    'collections/WorkoutProgram'
], function ($, _, Backbone, JST, WorkoutProgramCollection) {
    'use strict';

    var ViewprogressView = Backbone.View.extend({
        template: JST['./public/app/scripts/templates/ViewProgress.hbs'],

        render : function() {
        	this.$el.html(this.template(this.serializeData()));
        	return this;
        },

        serializeData : function() {
            return {
                log : LF.user.get('log'),
                bodyStatsLog : LF.user.get('statsLog'),
                workoutProgram : LF.user.get('currentWorkoutProgram'),
                currentWeek : LF.user.getCurrentProgramWeek()
            }
        }
    });

    return ViewprogressView;
});