'use strict';

const dbResponsibleMaintenanceSvc=require('../dbservices/dbResponsibleMaintenanceSvc')
var Promise = require('Promise').default
exports.getResponsibleMaintenanceList=function(req,res){
	(async function () {
		try {
			var list = await dbResponsibleMaintenanceSvc.getResponsibleMaintenanceList(req.body.agentName,req.body.responsibleName);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};

exports.getDealerSalesData=function(req,res){
	(async function () {
		try {
			var list = await dbDealerSalesDataSvc.getDealerSalesData(req.body.FID);
			return res.status(200).send(list.recordset[0]);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};

exports.getDealerSalesDataEntryList=function(req,res){
	(async function () {
		try {
			var list = await dbDealerSalesDataSvc.getDealerSalesDataEntryList(req.body.FID);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};


exports.saveDealerSalesData=function(req,res){
	(async function () {
		try {
			var list = await dbDealerSalesDataSvc.saveDealerSalesData(req.body.dealerSalesData,req.body.dealerSalesDataEntryList);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};

exports.commitDealerSalesData=function(req,res){
	(async function () {
		try {
			var list = await dbDealerSalesDataSvc.commitDealerSalesData(req.body.dealerSalesData);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};

 exports.deleteResponsibleMaintenance=function(req,res){
	(async function () {
		try {
			await dbResponsibleMaintenanceSvc.deleteResponsibleMaintenance(req.body.responsibleMaintenance.FID);
			var list = await dbResponsibleMaintenanceSvc.getResponsibleMaintenanceList(req.body.agentName,req.body.responsibleName);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};



exports.addEditResponsibleMaintenance=function(req,res){
	(async function () {
		try {
			var list = await dbResponsibleMaintenanceSvc.addEditResponsibleMaintenance(req.body.responsibleMaintenance);
			// var list = await dbCommonSvc.insertOrUpdateUserProfile(req.body.user);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};