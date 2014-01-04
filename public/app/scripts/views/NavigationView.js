/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',

    'models/User',
    'collections/WorkoutProgram'
], function ($, _, Backbone, JST, User, WorkoutProgramCollection ) {
    'use strict';

    var NavigationviewView = Backbone.View.extend({
        template: JST['./public/app/scripts/templates/NavigationView.hbs'],
        tooltipTpl: JST['./public/app/scripts/templates/TooltipView.hbs'],
        loggedInTpl: JST['./public/app/scripts/templates/navLoggedIn.hbs'],

        events : {
        	'click #registerBtn'   : '__registerCLicked',
            'click #loginBtn'      : '__loginCLicked',
            'click #curr-wp-list' : '__currWPListclicked'
        },

        initialize : function() {
            if ( !LF.user ) {
                console.log("LFD: User is not defined");
                LF.user = new User();
            }

            this.user = LF.user;
            this.listenTo(this.user, 'registered', this.__userAuthenticated);
            this.listenTo(this.user, 'authenticated', this.__userAuthenticated);
            this.listenTo(this.user, 'invalid', this.__userInvalid);
        },

        render : function() {
        	this.$el.html(this.template());
        	this.activateTooltip();

            if ( this.user.isAuthenticated) {
                this.renderLoggedInView();
            }

        	return this;
        },

        renderLoggedInView : function(){

            var programColl = {};
             if ( this.collection && this.collection.models.length > 0){
                programColl = this.collection.toJSON();
            }else if( this.collection ){
                programColl = this.collection.models
            }

            this.$('#login-btn').text('Logout');
            this.$('#userArea').html(this.loggedInTpl({
                img : '/img/darth.jpeg',
                wps : programColl,
                currentProgram : LF.user.get('currentWorkoutProgram'),
                week : LF.user.getCurrentProgramWeek(),
                username : LF.user.get('username')
            }));
        },

        fetchWorkoutProgramsForUser : function() {
            this.collection = new WorkoutProgramCollection({
                url : '/workoutPrograms/users/' + LF.user.get('id')
            });

            this.listenTo(this.collection, 'reset', this.render);

            this.collection.fetch({reset:true});

        },

        __registerCLicked : function(e) {
            e.preventDefault();
            this.user.register(this.getUserDataFromDOM());
        },

        __loginCLicked : function(e){
            e.preventDefault();
            this.user.authenticate(this.getUserDataFromDOM());
        },

        __userAuthenticated : function(data){
            LF.user = this.user; 
            this.$('#login-btn').popover('hide');
            this.fetchWorkoutProgramsForUser();
            //this.renderLoggedInView(); // fetching programs renders already
        },

        __userInvalid : function(user){
            this.$('.control-label').text(user.validationError);
        },

        __currWPListclicked : function(e){
            e.preventDefault();
            var id = $(e.target).attr('data-id');
            LF.user.setCurrentWorkoutProgram(id);
        },

        getUserDataFromDOM : function(){
            return {
                username : this.$('#username').val(),
                password : this.$('#password').val()
            };
        },

        activateTooltip : function(){
        	this.$('#login-btn').popover({
        		html : true,
        		title : 'Login',
        		content : this.tooltipTpl(),
        		placement: 'bottom',
        	});
        }
    });

    return NavigationviewView;
});