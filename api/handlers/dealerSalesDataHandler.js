'use strict';

const dbDealerSalesDataSvc=require('../dbservices/dbDealerSalesDataSvc')
var Promise = require('Promise').default
exports.getDealerSalesDataList=function(req,res){
	(async function () {
		try {
			var list = await dbDealerSalesDataSvc.getDealerSalesDataList(req.session.user.UserRole,req.session.user.userName,req.body.FBillNo,req.body.FDate,req.body.ProductTypeName);
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

 exports.deleteDealerSaleData=function(req,res){
	(async function () {
		try {
			await dbDealerSalesDataSvc.deleteDealerSaleData(req.body.dealerSalesData.FID);
			await dbDealerSalesDataSvc.deleteDealerSaleDataEntry(req.body.dealerSalesData.FID);
			var list = await dbDealerSalesDataSvc.getDealerSalesDataList(req.session.user.UserRole,req.session.user.userName,req.body.FBillNo,req.body.FDate,req.body.ProductTypeName);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};


exports.addDealerSaleData=function(req,res){
	(async function () {
		try {
			req.body.dealerSalesData.single = req.session.user.userName;
			var list = await dbDealerSalesDataSvc.addDealerSalesData(req.body.dealerSalesData);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};