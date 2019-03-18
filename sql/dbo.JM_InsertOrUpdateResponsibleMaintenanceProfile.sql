-- ================================================================  
-- Author:szq  
-- Create date:15/03/2019  
-- Description:新增修改负责人维护  
-- exec JM_InsertOrUpdateResponsibleMaintenanceProfile 1,'安徽融合','李沫'
-- ================================================================  
CREATE PROCEDURE [dbo].[JM_InsertOrUpdateResponsibleMaintenanceProfile]   
(  
 @FID int,  
 @agentName nvarchar(50),  
 @responsibleName nvarchar(50)  
)  
AS  
BEGIN  
 declare @agentID int  
 declare @agentNumber nvarchar(50)  
 declare @responsibleId int
 declare @isTerrace int 
   
 select @agentID = FItemID,@agentNumber = FNumber from t_Organization where FNumber not LIKE '%[ABCDEFGHIJKLMNOPQRSTUVWXYZ]%' and FName = @agentName  
 select @responsibleId = FUserID from t_User where FName = @responsibleName

 IF NOT EXISTS (select too.* from t_BOSPT tb inner join t_Organization too on tb.Fcustid = too.FItemID where too.FNumber not LIKE '%[ABCDEFGHIJKLMNOPQRSTUVWXYZ]%' and too.FName = @agentName)
    set @isTerrace = 0;
 ELSE
    set @isTerrace = 1;

 IF (@FID != -1)
    BEGIN 
        UPDATE t_BOSResponsible_Maintenance
        set agentID = @agentID,
            agentNumber = @agentNumber,
            agentName = @agentName,
            responsibleId = @responsibleId,
            responsibleName = @responsibleName,
            isTerrace = @isTerrace
        where FID = @FID
    END
 ELSE
    BEGIN
         declare @P1 int  exec GetICMaxNum 't_BOSResponsible_Maintenance', @P1 output select @FID = @P1 
         INSERT INTO t_BOSResponsible_Maintenance (FID,agentID,agentNumber,agentName,responsibleId,responsibleName,isTerrace)
         VALUES(@FID,@agentID,@agentNumber,@agentName,@responsibleId,@responsibleName,@isTerrace)
    END
  
select *,case isTerrace when 1 then '是' else '否' end as isTerraceZN from t_BOSResponsible_Maintenance
END  