var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'lifttracker'
    },
    port: 3000
  },

  test: {
    root: rootPath,
    app: {
      name: 'lifttracker'
    },
    port: 3000
  },

  production: {
    app: {
      name: 'lifttracker'
    },
    root: rootPath,
    port: process.env.PORT || 5000
  }
};

module.exports = config[env];
