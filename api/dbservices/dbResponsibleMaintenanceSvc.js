'use strict';

const sqlSvc=require("./sqlService");

  exports.getResponsibleMaintenanceList=function(agentName,responsibleName){
    var stmt = "select * from dbo.t_BOSResponsible_Maintenance  where 1=1 ";
    let paramTypes={};
    let paramValues={};
    if(agentName != undefined && agentName != "undefined" && agentName != ""){
      stmt += " and agentName = @agentName";
      paramTypes["agentName"] = 'sql.NVarChar(50)';
      paramValues["agentName"] = agentName;
    }
    if(responsibleName != undefined && responsibleName != "undefined" && responsibleName != ""){
      stmt += " and responsibleName = @responsibleName";
      paramTypes["responsibleName"] = 'sql.NVarChar(50)';
      paramValues["responsibleName"] = responsibleName;
    }
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  } 

  exports.getDealerSalesData=function(FID){
    /* var stmt = "select * from dbo.t_BOS_DealerSalesData where fid=@fid"; */
    var stmt = "select aa.*,case aa.status when 0 then '已保存' when 1 then '已提交' else '异常数据' end as statusZN,bb.FName as ProductTypeName from dbo.t_BOS_DealerSalesData aa left join t_SubMessage bb on aa.productTypeId = bb.FInterID and bb.FTypeID = 10008 where aa.fid=@fid ";
    let paramTypes={fid:'sql.Int'};
    let paramValues={fid:FID};
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  }

  exports.getDealerSalesDataEntryList=function(FID){
    var stmt = "select * from dbo.t_BOS_DealerSalesDataEntry2 where fid=@fid";
    let paramTypes={fid:'sql.Int'};
    let paramValues={fid:FID};
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  }


  exports.deleteDealerSaleData=function(FID){
    var stmt = "delete from dbo.t_BOS_DealerSalesData where fid=@fid";
    let paramTypes={fid:'sql.Int'};
    let paramValues={fid:FID};
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  }

  exports.deleteDealerSaleDataEntry=function(FID){
    var stmt = "delete from dbo.t_BOS_DealerSalesDataEntry2 where fid=@fid";
    let paramTypes={fid:'sql.Int'};
    let paramValues={fid:FID};
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  }

  exports.addDealerSalesData=function(dealerSalesData){
    let stmt=["exec JM_InsertDealerSalesDataProfile"];
   
    stmt.push(`'${dealerSalesData.FBillNo}',`),
    stmt.push(`'${dealerSalesData.ProductTypeName}',`)
    stmt.push(`'${dealerSalesData.note}'`)
    return sqlSvc.sqlK3Query(stmt.join(" "))
  }


  exports.copyBusinessPrice=function(businessPrice){
    let stmt=["exec JM_CopyBusinessPriceProfile"];
    stmt.push(`'${businessPrice.ProductTypeName}',`),
    stmt.push(`${businessPrice.year},`),
    stmt.push(`${businessPrice.month},`),
    stmt.push(`${businessPrice.yearTarget},`),
    stmt.push(`${businessPrice.monthTarget},`),
    stmt.push(`'${businessPrice.maintainerName}'`)
    return sqlSvc.sqlK3Query(stmt.join(" "))
  }

  exports.saveDealerSalesData=function(dealerSalesData,dealerSalesDataEntryList){

    for(var i=0;i<dealerSalesDataEntryList.length;i++){
      let stmtEntry=["exec JM_UpdateDealerSalesDataEntryProfile"];
      stmtEntry.push(`${dealerSalesDataEntryList[i].FEntryID},`),
      stmtEntry.push(`'${dealerSalesDataEntryList[i].FDateEnd}',`),
      stmtEntry.push(`${dealerSalesDataEntryList[i].salesVolume},`),
      stmtEntry.push(`${dealerSalesDataEntryList[i].saleroom},`),
      stmtEntry.push(`'${dealerSalesDataEntryList[i].remark}'`)
      sqlSvc.sqlK3Query(stmtEntry.join(" "))
    }

    let stmt=["exec JM_UpdateDealerSalesDataProfile"];
    stmt.push(`${dealerSalesData.FID},`),
    stmt.push(`'${dealerSalesData.FBillNo}',`),
    stmt.push(`'${dealerSalesData.ProductTypeName}',`),
    stmt.push(`'${dealerSalesData.note}'`)
    return sqlSvc.sqlK3Query(stmt.join(" "))
  }

  exports.commitDealerSalesData=function(dealerSalesData){

    var stmt = "update dbo.t_BOS_DealerSalesData set status=1  where fid=@fid";
    let paramTypes={fid:'sql.Int'};
    let paramValues={fid:dealerSalesData.FID};
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  }