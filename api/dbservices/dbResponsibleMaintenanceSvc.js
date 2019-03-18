'use strict';

const sqlSvc=require("./sqlService");

  exports.getResponsibleMaintenanceList=function(agentName,responsibleName){
    var stmt = "select *,case isTerrace when 1 then '是' else '否' end as isTerraceZN from dbo.t_BOSResponsible_Maintenance  where 1=1 ";
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



  exports.deleteResponsibleMaintenance=function(FID){
    var stmt = "delete from dbo.t_BOSResponsible_Maintenance where FID=@FID";
    let paramTypes={FID:'sql.Int'};
    let paramValues={FID:FID};
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