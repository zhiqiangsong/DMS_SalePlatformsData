'use strict';
var winston = require('winston');
  // var rotateDate1= require('winston-filerotatedate/lib/fileRotateDate');
  var rotateDate1=require('./fileRotateDate');
 
  var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.FileRotateDate)( {
        name: 'info-file',
        dirname:'./logs',
        filename: 'filelog-info.log',
        maxsize:'10000000',
        level: 'info',
        json:true
      }),
      new (winston.transports.FileRotateDate)( {
        name: 'error-file',
        dirname:'./logs',
        filename: 'filelog-error.log',
        level: 'error',
        maxsize:'10000000',
        json:true
      })
    ],
  });
module.exports = logger;
