USE [JWMS_TEST]
GO
/****** Object:  StoredProcedure [dbo].[JM_UpdateProductIndexListProfile]    Script Date: 03/14/2019 11:22:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ================================================================  
-- Author:szq  
-- Create date:12/03/2018  
-- Description:更新产品指标
-- exec JM_UpdateProductIndexListProfile 1,22,33,44，55，66，77，88，99，10，22，33，44 
-- ================================================================  
create PROCEDURE [dbo].[JM_UpdateProductIndexListProfile]   
(  
 @FID INT, 
 @Jan decimal(23, 10),
 @Feb decimal(23, 10),
 @Mar decimal(23, 10),
 @Apr decimal(23, 10),
 @May decimal(23, 10),
 @Jun decimal(23, 10),
 @Jul decimal(23, 10),
 @Aug decimal(23, 10),
 @Sep decimal(23, 10),
 @Oct decimal(23, 10),
 @Nov decimal(23, 10),
 @Dec decimal(23, 10),
 @annual decimal(23, 10),
 @firstQuarter decimal(23, 10),
 @secondQuarter decimal(23, 10),
 @thirdQuarter decimal(23, 10),
 @fourthQuarter decimal(23, 10)
)  
AS  
BEGIN  
  
   
   update dbo.t_BOSProduct_Index set Jan=@Jan,Feb=@Feb,Mar=@Mar,Apr=@Apr,May=@May,Jun=@Jun,Jul=@Jul,Aug=@Aug,Sep=@Sep,Oct=@Oct,Nov=@Nov,Dec=@Dec,annual=@annual,firstQuarter=@firstQuarter,secondQuarter=@secondQuarter,thirdQuarter=@thirdQuarter,fourthQuarter=@fourthQuarter where FID = @FID
 
END  