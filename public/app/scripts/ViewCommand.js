/*global define*/
/**
* Uses the command design pattern
*/

define([
    'jquery',
    'underscore',
    'backbone',

    // views
    'views/GenerateProgramView'
], function ($, _, Backbone, GenerateProgramView) {
    'use strict';

    var ViewCommand = function(){};


    _.extend(ViewCommand.prototype, {

    	ui : {
    		main : $('main'),
    		inner : $('main .inner')

    	},

    	execute : function(cmd, options){
    		var _options = options || {};
    		this.preHandler(_options);
    		this[cmd].apply(this, [_options]);
    		this.postHandler(_options);
    	},

    	postHandler : function(options){
    		this.ui.main.fadeIn();
    	},

    	preHandler : function(options) {
            var that = this;
    		this.ui.main.fadeOut(function(){
                that.ui.inner.remove();
            });
    		
    	},

    	generateProgramView : function(options){
    		this.currView = new GenerateProgramView();
    		this.ui.main.append(this.currView.render().el);
    	}

    });

    return ViewCommand;
});