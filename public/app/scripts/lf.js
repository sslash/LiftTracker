/*global define*/

define([
    'underscore',
    'backbone',
    'routes/LFrouter',
    'ViewCommand'
], function (_, Backbone, Router, Command) {
    'use strict';

    var LF = function() {
    	this.command = new Command();
    };

    _.extend(LF.prototype, {
		start : function() {
    		this.router = new Router();
    		Backbone.history.start();
    	}

    });

    return LF;
});