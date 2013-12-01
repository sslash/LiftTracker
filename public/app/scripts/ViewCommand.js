/*global define*/
/**
* Uses the command design pattern
*/

define([
    'jquery',
    'underscore',
    'backbone',

    // views
    'views/GenerateProgramView',
    'views/HomeView',
    'views/NavigationView'

], function ($, _, Backbone, GenerateProgramView, HomeView, NavigationView) {
    'use strict';

    var ViewCommand = function(){};


    _.extend(ViewCommand.prototype, {

    	ui : {
            nav : $('#navigationArea'),
    		main : $('main'),
    		inner : $('main .inner')
    	},


        // TODO: INFER PROMISES
    	execute : function(cmd, options){
    		var _options = options || {};
    		this.preHandler(cmd);
            console.log("sap");
    		this.postHandler(_options);
    	},

    	postHandler : function(options){
    		this.ui.main.fadeIn();
    	},

    	preHandler : function(options) {
            var that = this;

            if (!this.navView){
                this.navView = new NavigationView();
                this.ui.nav.append(this.navView.render().el);
            }


    		this.ui.main.fadeOut(function(){
                that.ui.inner.remove();
                that[options].apply(that, [options]);
            });
    		
    	},

        generateIndexView : function(){
            if ( this.currView){
                this.currView.remove();
            }
            this.currView = new HomeView();
            this.ui.main.append(this.currView.render().el);
        },

    	generateProgramView : function(options){
            if ( this.currView){
                this.currView.remove();
            }
            this.currView = new GenerateProgramView();

    		this.ui.main.append(this.currView.render().el);
    	}

    });

    return ViewCommand;
});