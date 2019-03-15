-- ================================================================  
-- Author:szq  
-- Create date:29/12/2018  
-- Description:新增修改商务价格  
-- exec JM_InsertOrUpdateBusinessPriceProfile 1,2018,8,'威海市立医院','安徽融合','支架系统'，11.11,22.22,33.33,44.44,55.55,66.66,'测试数据'  
-- ================================================================  
alter PROCEDURE [dbo].[JM_InsertOrUpdateBusinessPriceProfile]   
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
   
 select @agentID = FItemID,@agentNumber = FNumber from t_Organization where FNumber not LIKE '%[ABCDEFGHIJKLMNOPQRSTUVWXYZ]%' and FName = @agentName  
 select @responsibleId = FUserID from t_User where FName = @responsibleName
  
END  