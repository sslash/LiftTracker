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
        }

    });

    return LfrouterRouter;
});