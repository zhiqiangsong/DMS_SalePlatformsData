'use strict';

const sqlSvc=require("./sqlService");

exports.getAnnualSalesAndArchiveRpt = function(date,ProductTypeName){  
    //P_BudgetAndIncomeDetailQuery '2017','12'  ,'支架系统','hospName'  

    var date = new Date(date);
    var year =date.getFullYear();
    // var month =date.getMonth()+1;
    var productTypeName="";
    // var hospName="";
    // if(FHospName != undefined && FHospName != "undefined"){
    //   hospName=FHospName;
    // }
    if(ProductTypeName != undefined && ProductTypeName != "undefined"&& ProductTypeName != ""){
      productTypeName=ProductTypeName;
    }   
  
    let stmt = ["exec dbo.PROC_Sales_Rpt_UnderPlatform "];
   // stmt.push(`${saleForecast.FID},`),
    stmt.push(`${year},`);
    // stmt.push(`${month},`);
     stmt.push(`'${productTypeName}'`);
    // stmt.push(`'${hospName}'`);
    return sqlSvc.sqlK3Query(stmt.join(" "));

  }