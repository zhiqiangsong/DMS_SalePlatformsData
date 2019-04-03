'use strict';

const sqlSvc=require("./sqlService");

exports.getAnnualSalesAndArchiveRpt = function(ProductTypeName,FDate,platformResponsibleName,agent,platform,responsibleName){  
  let stmt=["exec PROC_Sales_Rpt_UnderPlatForm"];

   
  ProductTypeName = exports.initdata(ProductTypeName);
  platformResponsibleName = exports.initdata(platformResponsibleName);
  agent = exports.initdata(agent);
  platform = exports.initdata(platform);
  responsibleName = exports.initdata(responsibleName);
  stmt.push(`'${ProductTypeName}',`),
  stmt.push(`'${FDate}',`),
  stmt.push(`'${platformResponsibleName}',`),
  stmt.push(`'${agent}',`),
  stmt.push(`'${platform}',`),
  stmt.push(`'${responsibleName}'`)
  return sqlSvc.sqlK3Query(stmt.join(" "))

  }

  exports.initdata=function(data){
    if(data==null||data == undefined||data == "undefined"){
      return "";
    } else {
      return data;
    }
  }