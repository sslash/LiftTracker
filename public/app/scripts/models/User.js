/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
    	url : '/users',

        defaults: {
        },

        validate: function(attrs, options) {
        	if (!attrs.username || attrs.username.length <3) {
        		return "Username must be provided";
        	}

        	if (!attrs.password || attrs.password.length <3) {
        		return "Password must be provided";
        	}
        },

        authenticate : function(userData){
        	var that = this;
        	$.post('/users/session', userData)
        	.done(function(res){
        		that.set(res);
        		that.trigger('authenticated', that);
        	})
        	.fail(function(err){
        		// TODO: add proper error msg from server
        		that.validationError = 'Authentication Failed';
        		that.trigger('invalid', that);	
        	});
        },


        register : function(userData){
        	var that = this;

        	this.save(userData,{
        		success : function(model, response, options){
        			console.log("LFD: " + JSON.stringify(model) +
        				', '+ response + ', ' + JSON.stringify(options));
        			that.trigger('registered', model);
        		}
        	});
        }
    });

    return UserModel;
});