'use strict';

const dbDealerSalesDataSvc=require('../dbservices/dbDealerSalesDataSvc')
var Promise = require('Promise').default
exports.getDealerSalesDataList=function(req,res){
	(async function () {
		try {
			//var list = await dbDealerSalesDataSvc.getDealerSalesDataList(req.body.date,req.body.FHospName,req.body.ProductTypeName);
			var list = await dbDealerSalesDataSvc.getDealerSalesDataList(req.body.FBillNo,req.body.FDate,req.body.ProductTypeName);
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
			var list = await dbDealerSalesDataSvc.getDealerSalesDataList(req.body.FBillNo,req.body.FDate,req.body.ProductTypeName);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};


/*exports.addEditBusinessPrice=function(req,res){
	(async function () {
		try {
			var list = await dbBusinessPriceSvc.addBusinessPrice(req.body.businessPrice);
			// var list = await dbCommonSvc.insertOrUpdateUserProfile(req.body.user);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};

exports.copyBusinessPrice=function(req,res){
	(async function () {
		try {
			var list = await dbBusinessPriceSvc.copyBusinessPrice(req.body.businessPrice);
			// var list = await dbCommonSvc.insertOrUpdateUserProfile(req.body.user);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
}; */

exports.addDealerSaleData=function(req,res){
	(async function () {
		try {
			var list = await dbDealerSalesDataSvc.addDealerSalesData(req.body.dealerSalesData);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};