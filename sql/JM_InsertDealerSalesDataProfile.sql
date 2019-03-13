-- ================================================================  
-- Author:szq  
-- Create date:12/03/2018  
-- Description:更新销售数据
-- exec JM_InsertDealerSalesDataProfile 1,'20190311001','支架系统','测试数据' 
-- ================================================================  
alter PROCEDURE [dbo].[JM_UpdateDealerSalesDataProfile]   
(  
 @FID INT,
 @FBillNo nvarchar(255),  
 @ProductTypeName nvarchar(50),
 @note nvarchar(50)
)  
AS  
BEGIN  

 set xact_abort on
 BEGIN TRANSACTION

 declare @ProductTypeID int  
 select @ProductTypeID = FInterID from t_SubMessage where FTypeID = 10008 and FName = @ProductTypeName  
  
   
   update dbo.t_BOS_DealerSalesData set ProductTypeID=@ProductTypeID,FBillNo=@FBillNo,note=@note,FDate=GETDATE() where FID = @FID
 
 IF @@ERROR <> 0 

	ROLLBACK TRANSACTION
 ELSE
	COMMIT  TRANSACTION
END  