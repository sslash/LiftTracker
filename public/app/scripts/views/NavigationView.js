/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',

    'models/User'
], function ($, _, Backbone, JST, User) {
    'use strict';

    var NavigationviewView = Backbone.View.extend({
        template: JST['./public/app/scripts/templates/NavigationView.hbs'],
        tooltipTpl: JST['./public/app/scripts/templates/TooltipView.hbs'],
        loggedInTpl: JST['./public/app/scripts/templates/navLoggedIn.hbs'],

        events : {
        	'click #registerBtn'   : '__registerCLicked',
            'click #loginBtn'      : '__loginCLicked'
        },

        initialize : function() {
            if ( !LF.user ) {
                console.log("LFD: User is not defined");
                this.user = new User();
            }
            this.listenTo(this.user, 'registered', this.__userAuthenticated);
            this.listenTo(this.user, 'authenticated', this.__userAuthenticated);
            this.listenTo(this.user, 'invalid', this.__userInvalid);
        },

        render : function() {
        	this.$el.append(this.template());
        	this.activateTooltip();
        	return this;
        },

        renderLoggedInView : function(){
            this.$('#login-btn').text('Logout');
            this.$('#userArea li:first').append(this.loggedInTpl({
                img : '/img/darth.jpeg',
                username : LF.user.get('username')
            }));
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
            console.log("LFD: registered: " + LF.user.get('username'));
            this.$('#login-btn').popover('hide');
            this.renderLoggedInView();
        },

        __userInvalid : function(user){
            this.$('.control-label').text(user.validationError);
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