/*global define*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var LfrouterRouter = Backbone.Router.extend({
        routes: {
        	'generateProgram' : 'generateProgram',
            '*action'         : 'index'
        },

        index : function() {
            LF.command.execute('generateIndexView', 'hei');
        },

        generateProgram : function() {
        	LF.command.execute('generateProgramView', 'hei');
        }

    });

    return LfrouterRouter;
});