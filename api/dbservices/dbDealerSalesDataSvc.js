'use strict';

const sqlSvc=require("./sqlService");
//get user List
/* exports.getDealerSalesDataList=function(dateStr,FHospName,ProductTypeName){
    var stmt = "select * from dbo.t_BOSDocument  WHere ItemType=@Tmp";
    let paramTypes={Tmp:'sql.Int'};
    let paramValues={Tmp:1};
    if(dateStr != undefined && dateStr != "undefined"){
      stmt += " and FDateFrom <= @FDate AND FDateTo>= @FDate";
      paramTypes["FDate"] = 'sql.NVarChar(50)';
      paramValues["FDate"] = dateStr;
    }
    if(FHospName != undefined && FHospName != "undefined"){
      stmt += " and FHospName = @FHospName";
      paramTypes["FHospName"] = 'sql.NVarChar(50)';
      paramValues["FHospName"] = FHospName;
    }
    if(ProductTypeName != undefined && ProductTypeName != "undefined"){
      stmt += " and ProductTypeName = @ProductTypeName";
      paramTypes["ProductTypeName"] = 'sql.NVarChar(50)';
      paramValues["ProductTypeName"] = ProductTypeName;
    }
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  } */

  exports.getDealerSalesDataList=function(UserRole,userName,FBillNo,FDate,ProductTypeName){
    var stmt = "select aa.*,case aa.status when 0 then '已保存' when 1 then '已提交' else '异常数据' end as statusZN,bb.FName as ProductTypeName from dbo.t_BOS_DealerSalesData aa inner join t_SubMessage bb on aa.productTypeId = bb.FInterID and bb.FTypeID = 10008 where 1=1 ";
    let paramTypes={};
    let paramValues={};
    if(FBillNo != undefined && FBillNo != "undefined" && FBillNo != ""){
      stmt += " and aa.FBillNo = @FBillNo";
      paramTypes["FBillNo"] = 'sql.NVarChar(255)';
      paramValues["FBillNo"] = FBillNo;
    }
    if(FDate != undefined && FDate != "undefined" && FDate != ""){
      stmt += " and convert(varchar(100),aa.FDate,23) = @FDate";
      paramTypes["FDate"] = 'sql.VarChar(100)';
      paramValues["FDate"] = FDate.substring(0,10);
    }
    if(ProductTypeName != undefined && ProductTypeName != "undefined" && ProductTypeName != ""){
      stmt += " and bb.FName = @ProductTypeName";
      paramTypes["ProductTypeName"] = 'sql.NVarChar(50)';
      paramValues["ProductTypeName"] = ProductTypeName;
    }
    if(UserRole == "agent"){
      stmt += " and aa.platformName = @userName";
      paramTypes["userName"] = 'sql.NVarChar(50)';
      paramValues["userName"] = userName;
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
    stmt.push(`'${dealerSalesData.ProductTypeName}',`),
    stmt.push(`'${dealerSalesData.userName}',`),
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