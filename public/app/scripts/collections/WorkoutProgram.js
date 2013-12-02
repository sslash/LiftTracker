/*global define*/

define([
    'underscore',
    'backbone',
    'models/WorkoutProgram'
], function (_, Backbone, WorkoutprogramModel) {
    'use strict';

    var WorkoutprogramCollection = Backbone.Collection.extend({
        model: WorkoutprogramModel,

        initialize : function(options){
        	if (options.url){
        		this.url = options.url;
        	}
        }
    });

    return WorkoutprogramCollection;
});