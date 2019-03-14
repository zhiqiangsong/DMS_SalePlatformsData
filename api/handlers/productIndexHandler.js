'use strict';

const dbProductIndexSvc=require('../dbservices/dbProductIndexSvc')
var Promise = require('Promise').default
exports.getProductIndexList=function(req,res){
	(async function () {
		try {
			var list = await dbProductIndexSvc.getProductIndexList(req.body.year,req.body.ProductTypeName);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};

exports.initProductIndexData=function(req,res){
	(async function () {
		try {
			var list = await dbProductIndexSvc.initProductIndexData(req.body.year,req.body.ProductTypeName);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};

exports.saveProductIndexList=function(req,res){
	(async function () {
		try {
			var list = await dbProductIndexSvc.saveProductIndexList(req.body.productIndexList);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};
exports.deleteBusinessPrice=function(req,res){
	(async function () {
		try {
			await dbBusinessPriceSvc.deleteBusinessPrice(req.body.businessPrice.FID);
			var list = await dbBusinessPriceSvc.getBusinessPriceList(req.body.date,req.body.FHospName,req.body.ProductTypeName);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};


exports.addEditBusinessPrice=function(req,res){
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
};