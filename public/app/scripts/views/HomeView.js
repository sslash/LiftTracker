/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var HomeviewView = Backbone.View.extend({
        template: JST['./public/app/scripts/templates/HomeView.hbs'],

        render : function(){
			this.$el.append(this.template());
        	return this;
        }
    });

    return HomeviewView;
});