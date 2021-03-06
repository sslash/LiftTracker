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
            'logStats'          : 'logStats',
            'profile'           : 'profile',
            '*action'         : 'index'
        },

        index : function() {
            LF.command.execute('generateIndexView', 'hei');
        },

        logStats : function() {
            LF.command.execute('generateBodyStatsView');
        },

        generateProgram : function() {
            LF.command.execute('generateProgramView');
        },

        profile : function() {
            LF.command.execute('profileView');
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