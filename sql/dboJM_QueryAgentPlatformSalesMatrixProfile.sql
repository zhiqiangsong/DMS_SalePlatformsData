-- ================================================================  
-- Author:szq  
-- Create date:22/03/2019  
-- Description:平台销售矩阵报表 
-- exec JM_QueryAgentPlatformSalesMatrixProfile '支架系统','2019-03-23','李沫','安徽融合','国药河南','李根'
-- ================================================================  
CREATE PROCEDURE [dbo].[JM_QueryAgentPlatformSalesMatrixProfile]   
(  
 @ProductTypeName nvarchar(50),  
 @FDate datetime, 
 @platformResponsibleName nvarchar(50), 
 @agent nvarchar(50), 
 @platform nvarchar(50), 
 @responsibleName nvarchar(50)  
)  
AS  
BEGIN  

declare @year int
declare @month int
declare @quarterValue int
set @year = year(@FDate)
set @month = month(@FDate)
if @month>0 and  @month < 4
    BEGIN
        set @quarterValue = 1
    END
if @month>3 and  @month < 7
    BEGIN
        set @quarterValue = 2
    END
if @month>6 and  @month < 10
    BEGIN
        set @quarterValue = 3
    END
if @month>9 and  @month < 13
    BEGIN
        set @quarterValue = 4
    END


exec JM_QueryAgentQuarterSalesProfile @FDate

SELECT vap.FNumber, vaas.agentName, vaas.productTypeName, '' AS oldName, vap.FNamePla
	, tbmPla.responsibleName responsibleNamePla, tbm.responsibleName, vaas.YEAR dataYear, tbi.annual, vaas.sumSaleroom
	, vaas.sumSaleroom / tbi.annual AS annualYield, 0 AS oldPrice
    ,case when  @quarterValue = 1 then tbi.firstQuarter
    when  @quarterValue = 2 then tbi.secondQuarter
    when  @quarterValue = 3 then tbi.thirdQuarter
    when  @quarterValue = 4 then tbi.fourthQuarter
    END
    as quarterIndicators
	, tbs.quarterSaleRoom, tbs.quarterSaleRoom / (nullif(case when  @quarterValue = 1 then tbi.firstQuarter
    when  @quarterValue = 2 then tbi.secondQuarter
    when  @quarterValue = 3 then tbi.thirdQuarter
    when  @quarterValue = 4 then tbi.fourthQuarter
    END,0)) AS quarterCompletionRate
    , case when  @quarterValue = 1 then tbii.firstQuarter
    when  @quarterValue = 2 then tbii.secondQuarter
    when  @quarterValue = 3 then tbii.thirdQuarter
    when  @quarterValue = 4 then tbii.fourthQuarter
    END
    as quarterDiscountPrice
    ,tbs.one
	, tbs.two, tbs.three
FROM V_Agent_Annual_Sales vaas
	LEFT JOIN V_Agent_Platform vap ON vaas.agentName = vap.FName
	LEFT JOIN t_BOSResponsible_Maintenance tbmPla ON tbmPla.agentName = vap.FNamePla
	LEFT JOIN t_BOSResponsible_Maintenance tbm ON tbm.agentName = vap.FName
	LEFT JOIN t_BOSProduct_Index tbi
	ON tbi.productTypeName = vaas.productTypeName
		AND tbi.agentName = vaas.agentName
		AND vaas.year = tbi.FYear
		AND tbi.dataType = 1
	LEFT JOIN t_BOSQuarter_SalesData tbs
	ON tbs.agentName = vaas.agentName
		AND tbs.productTypeName = vaas.productTypeName
		AND vaas.year = tbs.annual
	LEFT JOIN t_BOSProduct_Index tbii
	ON tbii.productTypeName = vaas.productTypeName
		AND tbii.agentName = vaas.agentName
		AND vaas.year = tbii.FYear
		AND tbii.dataType = 2
WHERE vaas.YEAR = @year and vaas.productTypeName like '%' + @ProductTypeName + '%' and (tbmPla.responsibleName like '%' +@platformResponsibleName+ '%' or tbmPla.responsibleName is null)
and vaas.agentName like '%' +@agent+ '%' and vap.FNamePla like '%' +@platform+ '%' and (tbm.responsibleName like '%' +@responsibleName+ '%' or tbm.responsibleName is null)


END  