/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
    	url : '/users',

        defaults: {
            log : {
                currDay : 0, // First day is always 0
                days : [
                        // {   // Day 1
                        //     ex : [
                        //         {
                        //             exTitle : 'bench',
                        //             sets: [
                        //                 {
                        //                     kg : 'kg',
                        //                     reps : '300'
                        //                 },
                        //                 {
                        //                     kg : 'kg',
                        //                     reps : '400'  
                        //                 }
                        //             ]
                        //         },
                        //         {
                        //             exTitle : 'squat',
                        //             sets: [
                        //                 {
                        //                     kg : 'kg',
                        //                     reps : '300'
                        //                 },
                        //                 {
                        //                     kg : 'kg',
                        //                     reps : '400'  
                        //                 }
                        //             ]
                        //         }
                        //     ],
                        //     timestampe : date
                        // }
                ]
            },

            // currentWorkoutProgram

            statsLog : {
                entries : []
            }
        },

        addLogStatsEntry : function(statsEntry) {
            var statsLog = this.get('statsLog');
            statsLog.entries.push(statsEntry);

            var url = this.url + '/' + this.id + '/logStatsEntry';
            var that = this;
            this.savePart(url, {statsLog : statsLog}, function(statsLog) {
                that.set({statsLog:statsLog});
            });
        },

        logWorkoutDay : function(day) {
            var log = this.get('log');
            log.days[log.currDay] = day;
            log.currDay ++;

            var url = this.url + '/' + this.id + '/logDay';
            var that = this;

            this.savePart(url, {log : this.get('log')}, function(log) {
                that.set({log:log});
            });
        },

        getCurrentDayInWeek : function() {
            var currDay = this.get('log').currDay;
            var currProgram = this.get('currentWorkoutProgram');

            var programDaysPerWeek = currProgram.programDays.length;

            return currDay % programDaysPerWeek;
        },

        savePart : function(url, data, next) {
            var that = this;
            $.post(url, data)
            .done(function(res){
                if ( next ) { next(res); }
                that.trigger('sync', res);
            })
            .fail(function(err){
                console.log("failed to save log " + err);
            })
        },

        getCurrentProgramWeek : function() {
            if (!this.get('currentWorkoutProgram')) {return 0;}
            var currProgram = this.get('currentWorkoutProgram');
            var currDay = parseInt(this.get('log').currDay) + 1

            var programDaysPerWeek = currProgram.programDays.length;
            if ( currDay % programDaysPerWeek === 0 ) {
                return (currDay / programDaysPerWeek) - 1;
            }else {
                return Math.floor(currDay / programDaysPerWeek);
            }   
        },

        validate: function(attrs, options) {
        	if (!attrs.username || attrs.username.length <3) {
        		return "Username must be provided";
        	}

        	if (!attrs.password || attrs.password.length <3) {
        		return "Password must be provided";
        	}
        },

        authenticate : function(userData){
        	var that = this;
        	$.post('/users/session', userData)
        	.done(function(res){
                that.isAuthenticated = true;
        		that.set(res);
        		that.trigger('authenticated', that);
        	})
        	.fail(function(err){
        		// TODO: add proper error msg from server
        		that.validationError = 'Authentication Failed';
        		that.trigger('invalid', that);	
        	});
        },


        register : function(userData){
        	var that = this;

        	this.save(userData,{
        		success : function(model, response, options){
        			console.log("LFD: " + JSON.stringify(model) +
        				', '+ response + ', ' + JSON.stringify(options));
        			that.trigger('registered', model);
        		}
        	});
        },

        setCurrentWorkoutProgram : function(id){
            var that = this,
                url = ['/users/',
                        LF.user.get('id'),
                        '/workoutProgram/',
                        'setCurrent/',
                        id].join('');
                        
            $.post(url)
            .done(function(res){
                that.set(res);
            })
            .fail(function(err){
                console.log("ERROR " + err.responseText);
            });
        }
    });

    return UserModel;
});