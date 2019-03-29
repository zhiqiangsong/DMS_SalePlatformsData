'use strict';
var session,fullUsername;
var ActiveDirectory = require('activedirectory');
const constants=require('./../config/const.json');
const dbCommonSvc=require('../dbservices/dbCommonSvc');
const util=require('./../config/util');
const logger = require("./../config/logger"); 
exports.checkLoginStatus=function(req,res){
	if (req.session&&req.session.user){
			var data={loginUser:req.session.user};
			return res.status(200).send(data);
		}
	  else
	    return res.sendStatus(200).send({status:"Not Loggedin!"});
};

exports.authCheck=function(req, res, next) {
	  if (req.session&&req.session.user&&util.checkAccess(req.session.user.UserRole,req.originalUrl))
	   	next();
	  else if (req.session&&req.session.user){
			return res.sendStatus(403);
		} else {
	    return res.sendStatus(401);
		}
};

exports.adminCheck=function(req, res, next) {
		if (req.session&&req.session.user&&
			 (req.session.user.UserRole.indexOf("Admin")!==-1))
	   next();
	  else
	    return res.sendStatus(401);
};
exports.loginOld=function(req, res) {
	session=req.session;
	fullUsername=req.body.domain+"\\"+req.body.username;

	//do user authentication against Active Directory via LDAP
	var ad = new ActiveDirectory(constants[req.body.domain.toLowerCase()+'LdapConfig']);
	console.log('call Active Directory Authentication!');

	ad.authenticate(fullUsername, req.body.password, function(err, auth) {
	  if (err) {
		// console.log('ERROR: '+JSON.stringify(err));
		logger.error({loginUser:req.body.username,browser:req.headers['user-agent'],ip:req.headers['x-forwarded-for'] || req.connection.remoteAddress,error:err});
	    return res.status(402).send({message:"incorrect domain, username or password!"});
	  }
		
		(async function () {
			if (auth) {
				logger.info({loginUser:req.body.username,browser:req.headers['user-agent'],ip:req.headers['x-forwarded-for'] || req.connection.remoteAddress});
				try {
					//get user profile from db
				var userProfile = await dbCommonSvc.getUserProfile(req.body.username);
				if (userProfile&&userProfile.recordset.length>0){
					session.user = userProfile.recordset[0];
					res.status(200).send({loginUser:userProfile.recordset[0]});
				} else{
					res.status(403).send({message:"You are not an authorized user."});
				}
			} catch (error) {
				return res.status(400).send({error:true,message:error});
			}
		}})()
	});
};

exports.login=function(req, res) {
	session=req.session;
	fullUsername=req.body.username;

	//do user authentication against Active Directory via LDAP
	exports.checkK3Login(fullUsername, req.body.password,function(err, auth) {
	  if (err) {
		// console.log('ERROR: '+JSON.stringify(err));
		logger.error({loginUser:req.body.username,browser:req.headers['user-agent'],ip:req.headers['x-forwarded-for'] || req.connection.remoteAddress,error:err});
	    return res.status(402).send({message:"incorrect username or password!"});
	  }
		
		(async function () {
			if (auth) {
				logger.info({loginUser:req.body.username,browser:req.headers['user-agent'],ip:req.headers['x-forwarded-for'] || req.connection.remoteAddress});
				try {
					//get user profile from db
				var userProfile = await dbCommonSvc.getUserProfile(req.body.username);
				if (userProfile&&userProfile.recordset.length>0){
					session.user = userProfile.recordset[0];
					res.status(200).send({loginUser:userProfile.recordset[0]});
				} else{
					res.status(403).send({message:"You are not an authorized user."});
				}
			} catch (error) {
				return res.status(400).send({error:true,message:error});
			}
		}})()
	});
};
exports.checkK3Login = function(username, password, callback){
	if ((! username) || (! password)) {
    var err = {
      'code': 0x31,
      'errno': 'LDAP_INVALID_CREDENTIALS',
      'description': 'The supplied credential is invalid'
    };
    return(callback(err, false));
	}
	(async function () {
	try {
		var isCheckK3Login = await dbCommonSvc.checkK3Login(username, password);
		if(isCheckK3Login.recordset&&isCheckK3Login.recordset.length>0){
			return(callback(err, true));
		} else {
			return(callback("登陆失败！", false));
		}
	} catch (error) {
		return(callback(error, false));
	}
	})()
}
exports.logout=function(req, res) {
	req.session.user=undefined;
	req.session.destroy();
  	return res.status(200).send({loginStatus:"logout"});
};
exports.dbInfo=function(req, res) {
		let dbinfo={sqlSvrInfo:{}};
		dbinfo.sqlSvrInfo = require('../config/appConfig').getInstance().getSqlConnParam();
		dbinfo.sqlSvrInfo.password=undefined;
  	return res.status(200).send(dbinfo);
};