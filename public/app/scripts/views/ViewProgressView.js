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

        events : {
            'click #curr-wp-list' : '__currWPListclicked'
        },

        initialize : function(){

        	this.collection = new WorkoutProgramCollection({
        		url : '/workoutPrograms/users/' + LF.user.get('id')
        	});

        	this.collection.fetch({reset:true});

        	this.listenTo(this.collection, 'reset', this.render);
        },

        serializeData : function(){
            if ( this.collection.models.length > 0){
                return this.collection.toJSON();
            }else{
                return this.collection.models
            }
        },

        render : function() {
        	this.$el.html(this.template({
                wps : this.serializeData()
            }));
        	return this;
        },

        __currWPListclicked : function(e){
            e.preventDefault();
            var id = $(e.target).attr('data-id');
            LF.user.setCurrentWorkoutProgram(id);
        }
    });

    return ViewprogressView;
});