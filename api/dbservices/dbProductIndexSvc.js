'use strict';

const sqlSvc=require("./sqlService");
//get user List
exports.getProductIndexList=function(FYear,ProductTypeName){
    var stmt = "select * from dbo.t_BOSProduct_Index  WHere FYear=@FYear and ProductTypeName = @ProductTypeName";
    let paramTypes={};
    let paramValues={};
    paramTypes["FYear"] = 'sql.NVarChar(50)';
    paramValues["FYear"] = FYear;
    paramTypes["ProductTypeName"] = 'sql.NVarChar(50)';
    paramValues["ProductTypeName"] = ProductTypeName;
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  }
  

  exports.initProductIndexData=function(FYear,ProductTypeName){
    let stmt=["exec JM_InitProductIndexDataProfile"];
    stmt.push(`'${FYear}',`),
    stmt.push(`'${ProductTypeName}'`)
    return sqlSvc.sqlK3Query(stmt.join(" "))
  }

  exports.saveProductIndexList=function(productIndexList){
    for(var i=0;i<productIndexList.length;i++){
      let stmtEntry=["exec JM_UpdateProductIndexListProfile"];
      stmtEntry.push(`${productIndexList[i].FID},`),
      stmtEntry.push(`${productIndexList[i].Jan},`),
      stmtEntry.push(`${productIndexList[i].Feb},`),
      stmtEntry.push(`${productIndexList[i].Mar},`),
      stmtEntry.push(`${productIndexList[i].Apr},`),
      stmtEntry.push(`${productIndexList[i].May},`),
      stmtEntry.push(`${productIndexList[i].Jun},`),
      stmtEntry.push(`${productIndexList[i].Jul},`),
      stmtEntry.push(`${productIndexList[i].Aug},`),
      stmtEntry.push(`${productIndexList[i].Sep},`),
      stmtEntry.push(`${productIndexList[i].Oct},`),
      stmtEntry.push(`${productIndexList[i].Nov},`),
      stmtEntry.push(`${productIndexList[i].Dec}`)
      sqlSvc.sqlK3Query(stmtEntry.join(" "))
      if((i+1)==productIndexList.length){
        return sqlSvc.sqlK3Query(stmtEntry.join(" "))
      }
    }
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