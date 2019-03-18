USE [JWMS_TEST]
GO
/****** Object:  StoredProcedure [dbo].[JM_InitProductIndexDataProfile]    Script Date: 13/03/2019 2:36:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[JM_InitProductIndexDataProfile] 
(
	@FYear varchar(50),
	@ProductTypeName varchar(50),
	@DataType int
)
AS
BEGIN
 declare @FID int
 declare @ProductTypeID int  
 declare @FCustID int
 declare @DistributorCode nvarchar(50)
 declare @DistributorName nvarchar(50)
  select @ProductTypeID = FInterID from t_SubMessage where FTypeID = 10008 and FName = @ProductTypeName 

	IF NOT EXISTS (SELECT * from dbo.t_BOSProduct_Index where FYear = @FYear and ProductTypeName = @ProductTypeName )
		BEGIN
			declare CUR_DELARSALESDATA CURSOR
			FOR
			select too.FItemID,too.FNumber,too.FName from t_BOSPT tb inner join t_BOSPTEntry2 tbo on tb.FID = tbo.fid 
			inner join t_Organization too on tbo.FJXSID = too.FItemID
			where tb.FID = 1001
			open CUR_DELARSALESDATA
			fetch next from CUR_DELARSALESDATA into @FCustID,@DistributorCode,@DistributorName
				while @@fetch_status =0
					BEGIN
						declare @P1 int  exec GetICMaxNum 't_BOSProduct_Index', @P1 output select @FID = @P1 
						insert into t_BOSProduct_Index(FID,agentId,agentNumber,agentName,ProductTypeID,ProductTypeName,FYear,dataType)
						values(@FID,@FCustID,@DistributorCode,@DistributorName,@ProductTypeID,@ProductTypeName,@FYear,@DataType)
						fetch next from CUR_DELARSALESDATA into @FCustID,@DistributorCode,@DistributorName
					END
			close CUR_DELARSALESDATA
			deallocate CUR_DELARSALESDATA
		END
END
