'use strict';

var sql = require("mssql");
var Promise = require('Promise').default;
var config = require('../config/appConfig').getInstance().getSqlConnParam();
var K3config = require('../config/appConfig').getInstance().getK3SqlConnParam();

exports.callStoredProcedure=function(spName,inputParams,outParams){
  return new Promise(function(resolve,reject){
    var pool = new sql.ConnectionPool(config, err => {
        if (err){
          reject(err);
          pool.close();
        }
       var request = pool.request();
          for (let key in inputParams) {
            request.input(key,eval(inputParams[key].type),inputParams[key].value);
          }
          if (outParams){
            for (let key in object) {
                request.output(key,eval(outParams[key].type));
            }
          }
         request.execute(spName,(err,result)=>{
           if (err){
             reject(err);
             pool.close();
           }
          //  console.dir(result)
           resolve(result);
           pool.close();
         });
    })
  })
}

exports.sqlQuery=function(queryStmt,paramTypes,paramValues){
  return new Promise(function(resolve,reject){
    var pool = new sql.ConnectionPool(config).connect(err=>{
        if (err){
            reject(err);
            pool.close();
        }
        const ps = new sql.PreparedStatement(pool)
        // ps.input('param', sql.Int)
        for (let key in paramTypes) {
          ps.input(key,eval(paramTypes[key]));
        }
        ps.prepare(queryStmt, err => {
            if(err){
              pool.close();
              reject(err);
              return;
            }
        
            ps.execute(paramValues, (err, result) => {
                if(err){
                  reject(err);
                } else {
                  resolve(result);
                }
                ps.unprepare(err => {
                    pool.close();
                    if(err){
                      console.error(err);
                    }
                })
            })
        })
      })
  })
}


exports.sqlK3Query=function(queryStmt,paramTypes,paramValues){
  return new Promise(function(resolve,reject){
    var pool = new sql.ConnectionPool(K3config).connect(err=>{
        if (err){
            reject(err);
            pool.close();
        }
        const ps = new sql.PreparedStatement(pool)
        // ps.input('param', sql.Int)
        for (let key in paramTypes) {
          ps.input(key,eval(paramTypes[key]));
        }
        ps.prepare(queryStmt, err => {
            if(err){
              pool.close();
              reject(err);
              return;
            }
        
            ps.execute(paramValues, (err, result) => {
                if(err){
                  reject(err);
                } else {
                  resolve(result);
                }
                ps.unprepare(err => {
                    pool.close();
                    if(err){
                      console.error(err);
                    }
                })
            })
        })
      })
  })
}
