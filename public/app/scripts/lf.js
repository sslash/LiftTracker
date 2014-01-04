/*global define*/

define([
    'underscore',
    'backbone',
    'routes/LFrouter',
    'ViewCommand',

    'models/User'
    ], function (_, Backbone, Router, Command, User) {
        'use strict';

        var LF = function() {
         this.command = new Command();
     };

     _.extend(LF.prototype, {
      start : function() {
          this.router = new Router();
          Backbone.history.start();
      },

      initialize : function(){
        Handlebars.registerHelper("dateFormat", function(datetime, format) {

            var DateFormats = {
                short: "DD MMMM - YYYY",
                long: "dddd DD.MM.YYYY HH:mm"
                };
            if (window.moment) {
                f = DateFormats[format];
                return window.moment(datetime).format(f);
            }
            else {
                return datetime;
            }
        });

        this.user = new User({});
    }

});

     return LF;
 });