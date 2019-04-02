'use strict';

const dbPriceDiscountSvc=require('../dbservices/dbPriceDiscountSvc')
var Promise = require('Promise').default
exports.getPriceDiscountList=function(req,res){
	(async function () {
		try {
			var list = await dbPriceDiscountSvc.initPriceDiscountData(req.body.year,req.body.ProductTypeName,req.body.platformName);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};

exports.initPriceDiscountData=function(req,res){
	(async function () {
		try {
			var list = await dbPriceDiscountSvc.initPriceDiscountData(req.body.year,req.body.ProductTypeName);
			return res.status(200).send(list.recordset);
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};

exports.savePriceDiscountList=function(req,res){
	(async function () {
		try {
			var list = await dbPriceDiscountSvc.savePriceDiscountList(req.body.priceDiscountList);
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