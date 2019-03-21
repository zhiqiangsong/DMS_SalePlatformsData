'use strict';

const sqlSvc=require("./sqlService");
//get user List
exports.getPriceDiscountList=function(FYear,ProductTypeName){
    var stmt = "select * from dbo.t_BOSProduct_Index  WHere dataType = 2 and FYear=@FYear and ProductTypeName = @ProductTypeName";
    let paramTypes={};
    let paramValues={};
    paramTypes["FYear"] = 'sql.NVarChar(50)';
    paramValues["FYear"] = FYear;
    paramTypes["ProductTypeName"] = 'sql.NVarChar(50)';
    paramValues["ProductTypeName"] = ProductTypeName;
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  }
  

  exports.initPriceDiscountData=function(FYear,ProductTypeName){
    let stmt=["exec JM_InitProductIndexDataProfile"];
    stmt.push(`'${FYear}',`),
    stmt.push(`'${ProductTypeName}',`),
    stmt.push(`2`)
    return sqlSvc.sqlK3Query(stmt.join(" "))
  }

  exports.savePriceDiscountList=function(priceDiscountList){
    for(var i=0;i<priceDiscountList.length;i++){
      let stmtEntry=["exec JM_UpdateProductIndexListProfile"];
      stmtEntry.push(`${priceDiscountList[i].FID},`),
      stmtEntry.push(`${priceDiscountList[i].Jan},`),
      stmtEntry.push(`${priceDiscountList[i].Feb},`),
      stmtEntry.push(`${priceDiscountList[i].Mar},`),
      stmtEntry.push(`${priceDiscountList[i].Apr},`),
      stmtEntry.push(`${priceDiscountList[i].May},`),
      stmtEntry.push(`${priceDiscountList[i].Jun},`),
      stmtEntry.push(`${priceDiscountList[i].Jul},`),
      stmtEntry.push(`${priceDiscountList[i].Aug},`),
      stmtEntry.push(`${priceDiscountList[i].Sep},`),
      stmtEntry.push(`${priceDiscountList[i].Oct},`),
      stmtEntry.push(`${priceDiscountList[i].Nov},`),
      stmtEntry.push(`${priceDiscountList[i].Dec},`),
      stmtEntry.push(`${priceDiscountList[i].annual},`),
      stmtEntry.push(`${priceDiscountList[i].firstQuarter},`),
      stmtEntry.push(`${priceDiscountList[i].secondQuarter},`),
      stmtEntry.push(`${priceDiscountList[i].thirdQuarter},`),
      stmtEntry.push(`${priceDiscountList[i].fourthQuarter}`)
      sqlSvc.sqlK3Query(stmtEntry.join(" "))
      if((i+1)==priceDiscountList.length){
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