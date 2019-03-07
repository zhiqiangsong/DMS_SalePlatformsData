'use strict';

const dbCommonSvc=require('../dbservices/dbCommonSvc')
var Promise = require('Promise').default
exports.getUserList=function(req,res){
	(async function () {
		try {
			var list = await dbCommonSvc.getUserList(req.session.user.Domain);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};

exports.addEditUser=function(req,res){
	(async function () {
		try {
			var list = await dbCommonSvc.addUser(req.body.user);
			// var list = await dbCommonSvc.insertOrUpdateUserProfile(req.body.user);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};
exports.deleteUser=function(req,res){
	(async function () {
		try {
			await dbCommonSvc.deleteUserProfile(req.body.user.UserID);
			var list = await dbCommonSvc.getUserList(req.session.user.Domain);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};
exports.getPerformanceReport=function(req,res){
	(async function () {
		try {
			let report = await dbCommonSvc.getPerformanceReporterList(req.body.date);
			return res.status(200).send(report);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};
exports.viewLog=function(req,res){
	var lineReader = require('reverse-line-reader');
	var maxLine = 300;
	var i=0,logs=[];
	let file='logs/filelog-error.log';
	if (req.body.type==='info-log'){
		file='logs/filelog-info.log'
	}
	var promise = new Promise(function(resolve,reject){
		try {
			lineReader.eachLine(file, function(line, last) {
				console.log(line);
				console.log(last);
				try {
					logs.push(JSON.parse(line));
				} catch (error) {
					console.log("JSON.parse error:"+error+", Skipped the log in line "+(i+1)+":"+line);
				}
				i++;
				if (i===maxLine||last) {
					resolve(logs);
					return false; // stop reading
				}
			});
		} catch (error) {
			reject(error);
		}
	});
	promise.then(function(logs){
		return res.status(200).send(logs);
	},function(err){
		return res.status(400).send({error:true,message:err});
	})
};