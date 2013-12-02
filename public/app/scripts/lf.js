/*global define*/

define([
    'underscore',
    'backbone',
    'routes/LFrouter',
    'ViewCommand',

    'models/User'
], function (_, Backbone, Router, Command, User) {
    'use strict';

    var LF = function() {
    	this.command = new Command();
    };

    _.extend(LF.prototype, {
		start : function() {
    		this.router = new Router();
    		Backbone.history.start();
    	},

        initialize : function(){
            this.user = new User({
                id: "529af7052a2cf5e208000002",
                username: "mike"
            });
        }

    });

    return LF;
});