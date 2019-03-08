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

  exports.getDealerSalesDataList=function(FBillNo,FDate,ProductTypeName){
    var stmt = "select aa.*,case aa.status when 0 then '已保存' when 1 then '已提交' else '异常数据' end as statusZN,bb.FName as ProductTypeName from dbo.t_BOS_DealerSalesData aa inner join t_SubMessage bb on aa.productTypeId = bb.FInterID and bb.FTypeID = 10008 where 1=1 ";
    let paramTypes={};
    let paramValues={};
    if(FBillNo != undefined && FBillNo != "undefined"){
      stmt += " and aa.FBillNo = @FBillNo";
      paramTypes["FBillNo"] = 'sql.NVarChar(255)';
      paramValues["FBillNo"] = FBillNo;
    }
    if(FDate != undefined && FDate != "undefined"){
      stmt += " and convert(varchar(100),aa.FDate,23) = @FDate";
      paramTypes["FDate"] = 'sql.VarChar(100)';
      paramValues["FDate"] = FDate.substring(0,10);
    }
    if(ProductTypeName != undefined && ProductTypeName != "undefined"){
      stmt += " and bb.FName = @ProductTypeName";
      paramTypes["ProductTypeName"] = 'sql.NVarChar(50)';
      paramValues["ProductTypeName"] = ProductTypeName;
    }
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  } 


  exports.deleteBusinessPrice=function(FID){
    var stmt = "delete from dbo.t_BOSDocument where fid=@fid";
    let paramTypes={fid:'sql.Int'};
    let paramValues={fid:FID};
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  }

  exports.addBusinessPrice=function(businessPrice){
    //stmt will be something 4like: "exec JM_InsertOrUpdateUserProfile 'yd.zhu','朱亚东','BITSG','admin','1'"
    let stmt=["exec JM_InsertOrUpdateBusinessPriceProfile"];
   
    if(businessPrice.FID == undefined){
      businessPrice.FID = -1;
    }
    if(businessPrice.Fnote == undefined){
      businessPrice.Fnote = '';
    }
    stmt.push(`${businessPrice.FID},`),
    stmt.push(`'${businessPrice.FDateFrom}',`),
    stmt.push(`'${businessPrice.FDateTo}',`),
    stmt.push(`'${businessPrice.FHospName}',`),
    stmt.push(`'${businessPrice.DistributorName}',`),
    stmt.push(`'${businessPrice.ProductTypeName}',`),
    stmt.push(`${businessPrice.CSPrice},`),
    stmt.push(`${businessPrice.BARebate},`),
    stmt.push(`${businessPrice.TTBoot},`),
    stmt.push(`${businessPrice.Spromotion},`),
    stmt.push(`${businessPrice.BTBGift},`),
    stmt.push(`${businessPrice.BNHDAward},`),
    stmt.push(`'${businessPrice.Fnote}',`),
    stmt.push(`'${businessPrice.maintainerName}'`)
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