-- ================================================================  
-- Author:szq  
-- Create date:11/03/2018  
-- Description:新增销售数据
-- exec JM_InsertDealerSalesDataProfile '20190311001','支架系统' 
-- ================================================================  
CREATE PROCEDURE [dbo].[JM_InsertDealerSalesDataProfile]   
(  
 @FBillNo nvarchar(255),  
 @ProductTypeName nvarchar(50),
 @note nvarchar(50)
)  
AS  
BEGIN  

 set xact_abort on
 BEGIN TRANSACTION

 declare @FID int
 declare @FIDN int
 declare @ProductTypeID int  
 declare @FCustID int
 declare @DistributorCode nvarchar(50)
 declare @DistributorName nvarchar(50)
 select @ProductTypeID = FInterID from t_SubMessage where FTypeID = 10008 and FName = @ProductTypeName  
  



  declare @P1 int  exec GetICMaxNum 't_BOS_DealerSalesData', @P1 output select @FID = @P1   
  INSERT INTO dbo.t_BOS_DealerSalesData(FID,FClassTypeID,FBillNo,singleId,single,status,ProductTypeID,FDate,note,productTypeName)  
   VALUES (@FID,1,@FBillNo,17110,'宋志强',0,@ProductTypeID,GETDATE(),@note,@ProductTypeName)  

 declare CUR_DELARSALESDATA CURSOR
 FOR
 select too.FItemID,too.FNumber,too.FName from t_BOSPT tb inner join t_BOSPTEntry2 tbo on tb.FID = tbo.fid 
 inner join t_Organization too on tbo.FJXSID = too.FItemID
 where tb.FID = 1001
 open CUR_DELARSALESDATA
 fetch next from CUR_DELARSALESDATA into @FCustID,@DistributorCode,@DistributorName
	while @@fetch_status =0
		BEGIN
			insert into t_BOS_DealerSalesDataEntry2(FID,agentId,agentNumber,agentName)
			values(@FID,@FCustID,@DistributorCode,@DistributorName)
			fetch next from CUR_DELARSALESDATA into @FCustID,@DistributorCode,@DistributorName
		END
 close CUR_DELARSALESDATA
 deallocate CUR_DELARSALESDATA
 --SELECT * FROM dbo.t_BOS_DealerSalesData  
 select aa.*,case aa.status when 0 then '已保存' when 1 then '已提交' else '异常数据' end as statusZN,bb.FName as ProductTypeName from dbo.t_BOS_DealerSalesData aa inner join t_SubMessage bb on aa.productTypeId = bb.FInterID and bb.FTypeID = 10008 where 1=1 
 
 IF @@ERROR <> 0 

	ROLLBACK TRANSACTION
 ELSE
	COMMIT  TRANSACTION
END  