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
    'views/NavigationView',
    'views/ViewProgressView'

], function ($, _, Backbone, GenerateProgramView, HomeView, NavigationView,
            ViewProgressView) {
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
            var that = this;
    		

            var promise = this.preHandler(cmd);

            promise.done(function(){
                that[cmd].apply(that, [_options]);
                that.postHandler(_options);
            });
    	},

    	preHandler : function(options) {
            var deferred = $.Deferred(),
                that = this;

            if (!this.navView){
                this.navView = new NavigationView();
                this.ui.nav.append(this.navView.render().el);
            }

    		this.ui.main.fadeOut(function(){
                //that.ui.inner.remove();
                if ( that.currView){
                    that.currView.remove();
                }
                deferred.resolve();
            });

            return deferred.promise();    		
    	},

        postHandler : function(options){
            this.ui.main.fadeIn();
        },

        viewProgress : function() {
            this.craeteAndShowCurrView(ViewProgressView);
        },

        generateIndexView : function(){
            this.currView = new HomeView();
            this.ui.main.append(this.currView.render().el);
        },

    	generateProgramView : function(options){
            this.currView = new GenerateProgramView();
    		this.ui.main.append(this.currView.render().el);
    	},


        /* COMMONS */
        craeteAndShowCurrView : function(View){
            this.currView = new View();
            this.ui.main.append(this.currView.render().el);
        }

    });

    return ViewCommand;
});