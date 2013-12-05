/*global define*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var LfrouterRouter = Backbone.Router.extend({
        routes: {
        	'generateProgram'   : 'generateProgram',
            'viewProgress'      : 'viewProgress',
            'logWorkout'        : 'logWorkout',
            '*action'         : 'index'
        },

        index : function() {
            LF.command.execute('generateIndexView', 'hei');
        },

        generateProgram : function() {
        	LF.command.execute('generateProgramView');
        },

        viewProgress : function(){
            LF.command.execute('viewProgress');  
        },

        logWorkout : function(){
            LF.command.execute('logWorkout');  
        }

    });

    return LfrouterRouter;
});