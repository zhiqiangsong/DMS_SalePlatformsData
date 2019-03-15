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



  exports.deleteDealerSaleData=function(FID){
    var stmt = "delete from dbo.t_BOS_DealerSalesData where fid=@fid";
    let paramTypes={fid:'sql.Int'};
    let paramValues={fid:FID};
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  }


  exports.addEditResponsibleMaintenance=function(responsibleMaintenance){
    let stmt=["exec JM_InsertOrUpdateResponsibleMaintenanceProfile"];
   
    if(responsibleMaintenance.FID == undefined){
      responsibleMaintenance.FID = -1;
    }
    stmt.push(`${responsibleMaintenance.FID},`),
    stmt.push(`'${responsibleMaintenance.agentName}',`),
    stmt.push(`'${responsibleMaintenance.responsibleName}'`)
    return sqlSvc.sqlK3Query(stmt.join(" "))
  }