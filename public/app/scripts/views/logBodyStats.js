/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var LogbodystatsView = Backbone.View.extend({
        template: JST['./public/app/scripts/templates/logBodyStats.hbs'],

        render : function(){
        	var date = new Date().toLocaleDateString();
			this.$el.append(this.template({
				date : date
			}));
        	return this;
        },

        events : {
        	'submit form' : '__formSubmitted'
        },

        __formSubmitted : function(e) {
        	e.preventDefault();

        	var data = {};
        	if ($('#weight').val().length > 0 ) { data.weight = $('#weight').val();}
        	if ($('#gunsize').val().length > 0 ) { data.weight = $('#gunsize').val();}
        	if ($('#abs').val().length > 0 ) { data.weight = $('#abs').val();}

        	LF.user.addLogStatsEntry(data);
        }
    });

    return LogbodystatsView;
});