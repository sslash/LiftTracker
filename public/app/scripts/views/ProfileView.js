/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
	'use strict';

    var ProfileviewView = Backbone.View.extend({

        template: JST['./public/app/scripts/templates/profileView.hbs'],


        events : {
			'submit form' : '__formSubmitted'
        },

        initialize : function() {
        	this.listenTo(LF.user, 'sync', this.userSaved);
        },

        render : function() {
            this.$el.html(this.template(this.serializeData()));
            return this;
        },

        serializeData : function() {
			return {
				user : LF.user.toJSON()
			};
        },

        userSaved : function(u) {
			LF.user.set(u);
			LF.router.navigate("/", {trigger: true, replace: true});
        },

        __formSubmitted : function(e) {
			e.preventDefault();

			var data = {};
			if ($('#username').val().length > 0 ) { data.username = $('#username').val();}
			if ($('#email').val().length > 0 ) { data.email = $('#email').val();}
			if ($('#country').val().length > 0 ) { data.country = $('#country').val();}
			if ($('#birth').val().length > 0 ) { data.birth = $('#birth').val();}

			console.log("SAP: " + JSON.stringify(data))
			LF.user.save(data, {password : true, username : true});
        }
    });

    return ProfileviewView;
});
