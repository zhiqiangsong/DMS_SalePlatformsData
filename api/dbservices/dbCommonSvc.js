'use strict';

const sqlSvc=require("./sqlService");
  //get user List
  exports.getUserList=function(domain){
    var stmt = "select * from dbo.UserProfile";
    // var stmt = "select * from dbo.UserProfile where DOMAIN=@DOMAIN";
    let paramTypes={DOMAIN:'sql.VarChar(20)'};
    let paramValues={DOMAIN:domain};
    return sqlSvc.sqlQuery(stmt,paramTypes,paramValues);
  }

  //user profile
  exports.getUserProfile=function(userId){
    var stmt = "select * from dbo.UserProfile where UserID=@UserID and isActive='1'";
    let paramTypes={UserID:'sql.VarChar(20)'};
    let paramValues={UserID:userId};
    return sqlSvc.sqlQuery(stmt,paramTypes,paramValues)
  }
  exports.addUser=function(user){
    //stmt will be something like: "exec JM_InsertOrUpdateUserProfile 'yd.zhu','朱亚东','BITSG','admin','1'"
    let stmt=["exec JM_InsertOrUpdateUserProfile"];
    stmt.push(`'${user.UserID}',`),
    stmt.push(`'${user.userName}',`),
    stmt.push(`'${user.Domain}',`),
    stmt.push(`'${user.UserRole}',`),
    stmt.push(`'${user.isActive}'`)
    return sqlSvc.sqlQuery(stmt.join(" "))
  }
  
  exports.insertOrUpdateUserProfile=function(user){
    var params={
      UserID:{type:'sql.VarChar(20)',value:user.UserID},
      userName:{type:'sql.VarChar(3)',value:user.userName},
      Domain:{type:'sql.VarChar(20)',value:user.Domain},
      UserRole:{type:'sql.VarChar(20)',value:user.UserRole},
      isActive:{type:'sql.Char(1)',value:user.isActive}
    }
    return sqlSvc.callStoredProcedure("dbo.JM_InsertOrUpdateUserProfile",params);
  }
  exports.deleteUserProfile=function(userId){
    var stmt = "delete from dbo.UserProfile where UserID=@UserID";
    let paramTypes={UserID:'sql.VarChar(20)'};
    let paramValues={UserID:userId};
    return sqlSvc.sqlQuery(stmt,paramTypes,paramValues)
  }
  exports.getPerformanceReporterList=function(param){
    //dummy code
    let SFE_ImplantData=require("./../config/SFE_ImplantData.json");
    let salesPromotionData=require("./../config/salesPromotionData.json");
    let businessPrice=require("./../config/businessPrice.json");
    return {SFE_ImplantData:SFE_ImplantData,salesPromotionData:salesPromotionData,businessPrice:businessPrice,}
  }
  


