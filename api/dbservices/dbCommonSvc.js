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
  

  exports.getProductTypeList=function(domain){
    var stmt = "select FName from t_SubMessage where FTypeID = 10008";
    let paramTypes={};
    let paramValues={};
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  }

  exports.getAgentList=function(domain){
    var stmt = "select FName from V_Agents";
    let paramTypes={};
    let paramValues={};
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  }

  exports.getPlatformList=function(domain){
    var stmt = "select va.Fname as FName from V_Agents va inner join t_BOSPT tb on va.FItemID = tb.Fcustid";
    let paramTypes={};
    let paramValues={};
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  }

  exports.getResponsibleList=function(domain){
    var stmt = "select FName from t_User where FUserTypeID =7 and FForbidden = 0";
    let paramTypes={};
    let paramValues={};
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  }

  exports.getPlatformSalesDetail=function(ProductTypeName,FDate,platformResponsibleName,agent,platform,responsibleName){
    var stmt = "select * from V_Agent_Platform_Sales_Detail where 1=1 ";
    let paramTypes={};
    let paramValues={};
    if(ProductTypeName != undefined && ProductTypeName != "undefined" && ProductTypeName != ""){
      stmt += " and ProductTypeName = @ProductTypeName";
      paramTypes["ProductTypeName"] = 'sql.NVarChar(255)';
      paramValues["ProductTypeName"] = ProductTypeName;
    }
    if(FDate != undefined && FDate != "undefined" && FDate != ""){
      var dataYear = FDate.substring(0,4);
      var dataMonth = FDate.substring(5,7);
      stmt += " and dataYear = @dataYear and dataMonth = @dataMonth";
      paramTypes["dataYear"] = 'sql.VarChar(100)';
      paramValues["dataYear"] = dataYear;
      paramTypes["dataMonth"] = 'sql.VarChar(100)';
      paramValues["dataMonth"] = dataMonth;
    }
    if(platformResponsibleName != undefined && platformResponsibleName != "undefined" && platformResponsibleName != ""){
      stmt += " and responsibleNamePla = @platformResponsibleName";
      paramTypes["platformResponsibleName"] = 'sql.NVarChar(50)';
      paramValues["platformResponsibleName"] = platformResponsibleName;
    }
    if(agent != undefined && agent != "undefined" && agent != ""){
      stmt += " and agentName = @agent";
      paramTypes["agent"] = 'sql.NVarChar(50)';
      paramValues["agent"] = agent;
    }
    if(platform != undefined && platform != "undefined" && platform != ""){
      stmt += " and FNamePla = @platform";
      paramTypes["platform"] = 'sql.NVarChar(50)';
      paramValues["platform"] = platform;
    }
    if(responsibleName != undefined && responsibleName != "undefined" && responsibleName != ""){
      stmt += " and responsibleName = @responsibleName";
      paramTypes["responsibleName"] = 'sql.NVarChar(50)';
      paramValues["responsibleName"] = responsibleName;
    }
    stmt += " order  by  FNamePla,dataYear,dataMonth,productTypeName"
    return sqlSvc.sqlK3Query(stmt,paramTypes,paramValues);
  } 
  


