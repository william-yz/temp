'use strict';

module.exports = {
  app : {

  },
  templateEngine: 'swig',
  port: process.env.PORT || 3000,
  sessionSecret: 'MEAN',
  sessionCollection: 'sessions'
};
