-- ================================================================  
-- Author:szq  
-- Create date:12/03/2018  
-- Description:更新销售数据明细
-- exec JM_UpdateDealerSalesDataEntryProfile 1,'20190311001','支架系统','测试数据' 
-- ================================================================  
CREATE PROCEDURE [dbo].[JM_UpdateDealerSalesDataEntryProfile]   
(  
 @FEntryID INT,
 @endDate nvarchar(50),  
 @salesVolume decimal(23, 10),
 @saleroom decimal(23, 10),
 @remark nvarchar(50)
)  
AS  
BEGIN  

 set xact_abort on
 BEGIN TRANSACTION
 
 declare @endDatetime datetime
  
 
 if @endDate <> ''
	begin
	 --select @endDatetime = CONVERT(datetime,@endDate,101)
	 update dbo.t_BOS_DealerSalesDataEntry2 set FDateEnd=@endDate,salesVolume=@salesVolume,saleroom=@saleroom,remark=@remark where FEntryID = @FEntryID
	 --update dbo.t_BOS_DealerSalesDataEntry2 set FDateEnd=@endDate,remark=@remark where FEntryID = @FEntryID
	end
 else
	begin
		update dbo.t_BOS_DealerSalesDataEntry2 set salesVolume=@salesVolume,saleroom=@saleroom,remark=@remark where FEntryID = @FEntryID
		--update dbo.t_BOS_DealerSalesDataEntry2 set remark=@remark where FEntryID = @FEntryID
	end
  
   
   
 
 IF @@ERROR <> 0 

	ROLLBACK TRANSACTION
 ELSE
	COMMIT  TRANSACTION
END  