USE [JWMS_TEST]
GO
/****** Object:  StoredProcedure [dbo].[PROC_Sales_Rpt_UnderPlatForm]    Script Date: 04/02/2019 11:05:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
DESC:平台下二级经销商销售与达成情况 矩阵报表
Log: 2019/3/27 Colin Creation
	

*/
CREATE PROC [dbo].[PROC_Sales_Rpt_UnderPlatForm]
(
--@Year int=2019,
--@productTypeName varchar(30)=''

 @ProductTypeName nvarchar(50),  
 @FDate datetime, 
 @platformResponsibleName nvarchar(50), 
 @agent nvarchar(50), 
 @platform nvarchar(50), 
 @responsibleName nvarchar(50)  
)
As

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
 
select top 100 percent tt.agentNumber as FNumber,tt.agentName,tt.productTypeName,'' AS oldName,tt.FNamePla,tt.responsibleNamePla,tt.responsibleName,tt.dataYear,tt.Year_targetAmt as annual,
tt.Year_saleAmt as sumSaleroom,tt.YTD_Rate as annualYield, 0 AS oldPrice,
case @quarterValue 
when 1 then Q1_discountPrice
when 2 then Q2_discountPrice
when 3 then Q3_discountPrice
when 4 then Q4_discountPrice
end as quarterDiscountPrice,
case @quarterValue 
when 1 then Q1_targetAmt
when 2 then Q2_targetAmt
when 3 then Q3_targetAmt
when 4 then Q4_targetAmt
end as quarterIndicators,
case @quarterValue 
when 1 then Q1_saleAmt
when 2 then Q2_saleAmt
when 3 then Q3_saleAmt
when 4 then Q4_saleAmt
end as quarterSaleRoom,
case @quarterValue 
when 1 then Q1_yieldRate
when 2 then Q2_yieldRate
when 3 then Q3_yieldRate
when 4 then Q4_yieldRate
end as quarterCompletionRate,
case @quarterValue 
when 1 then M1_saleAmt
when 2 then M4_saleAmt
when 3 then M7_saleAmt
when 4 then M10_saleAmt
end as one,
case @quarterValue 
when 1 then M2_saleAmt
when 2 then M5_saleAmt
when 3 then M8_saleAmt
when 4 then M11_saleAmt
end as two,
case @quarterValue 
when 1 then M3_saleAmt
when 2 then M6_saleAmt
when 3 then M9_saleAmt
when 4 then M12_saleAmt
end as three
 from (Select productTypeName, agentID,agentNumber,agentName,productTypeID,
 responsibleName,
 dataYear,
usedName,FnamePla ,responsibleNamePla,
SUM(targetValue) AS Year_targetAmt,		--年度指标数量
SUM(saleroom) As Year_saleAmt,				--年度达成金额
CASE WHEN SUM(targetValue)=0 THEN 0 ELSE  SUM(saleroom)/SUM(targetValue) END AS YTD_Rate,	--YTD 达成率
--Quartor
0 AS Q1_Price,	0 AS Q2_Price,	0 AS Q3_Price,	0 AS Q4_Price,	
SUM(CASE WHEN dataMonth =1 THEN discountPrice ELSE 0 END) AS Q1_discountPrice,	
SUM(CASE WHEN dataMonth =4 THEN discountPrice ELSE 0 END) AS Q2_discountPrice,	
SUM(CASE WHEN dataMonth =7 THEN discountPrice ELSE 0 END) AS Q3_discountPrice,	
SUM(CASE WHEN dataMonth =10 THEN discountPrice ELSE 0 END) AS Q4_discountPrice,	

SUM(CASE WHEN FQuartor =1 THEN targetValue ELSE 0 END) AS Q1_targetAmt,
SUM(CASE WHEN FQuartor =2 THEN targetValue ELSE 0 END) AS Q2_targetAmt,
SUM(CASE WHEN FQuartor =3 THEN targetValue ELSE 0 END) AS Q3_targetAmt,
SUM(CASE WHEN FQuartor =4 THEN targetValue ELSE 0 END) AS Q4_targetAmt,
SUM(CASE WHEN FQuartor =1 THEN saleroom ELSE 0 END) AS Q1_saleAmt,
SUM(CASE WHEN FQuartor =2 THEN saleroom ELSE 0 END) AS Q2_saleAmt,
SUM(CASE WHEN FQuartor =3 THEN saleroom ELSE 0 END) AS Q3_saleAmt,
SUM(CASE WHEN FQuartor =4 THEN saleroom ELSE 0 END) AS Q4_saleAmt,

CASE WHEN SUM(CASE WHEN FQuartor =1 THEN targetValue ELSE 0 END)=0 THEN 0 
	ELSE SUM(CASE WHEN FQuartor =1 THEN saleroom ELSE 0 END) / SUM(CASE WHEN FQuartor =1 THEN targetValue ELSE 0 END) END AS Q1_yieldRate,
CASE WHEN SUM(CASE WHEN FQuartor =2 THEN targetValue ELSE 0 END)=0 THEN 0 
	ELSE SUM(CASE WHEN FQuartor =2 THEN saleroom ELSE 0 END) / SUM(CASE WHEN FQuartor =2 THEN targetValue ELSE 0 END) END AS Q2_yieldRate,
CASE WHEN SUM(CASE WHEN FQuartor =3 THEN targetValue ELSE 0 END)=0 THEN 0 
	ELSE SUM(CASE WHEN FQuartor =3 THEN saleroom ELSE 0 END) / SUM(CASE WHEN FQuartor =3 THEN targetValue ELSE 0 END) END AS Q3_yieldRate,
CASE WHEN SUM(CASE WHEN FQuartor =4 THEN targetValue ELSE 0 END)=0 THEN 0 
	ELSE SUM(CASE WHEN FQuartor =4 THEN saleroom ELSE 0 END) / SUM(CASE WHEN FQuartor =4 THEN targetValue ELSE 0 END) END AS Q4_yieldRate,
--Monthly data
SUM(CASE WHEN dataMonth=1 THEN saleroom ELSE 0 END ) AS M1_saleAmt,
SUM(CASE WHEN dataMonth=2 THEN saleroom ELSE 0 END ) AS M2_saleAmt,
SUM(CASE WHEN dataMonth=3 THEN saleroom ELSE 0 END ) AS M3_saleAmt,
SUM(CASE WHEN dataMonth=4 THEN saleroom ELSE 0 END ) AS M4_saleAmt,
SUM(CASE WHEN dataMonth=5 THEN saleroom ELSE 0 END ) AS M5_saleAmt,
SUM(CASE WHEN dataMonth=6 THEN saleroom ELSE 0 END ) AS M6_saleAmt,
SUM(CASE WHEN dataMonth=7 THEN saleroom ELSE 0 END ) AS M7_saleAmt,
SUM(CASE WHEN dataMonth=8 THEN saleroom ELSE 0 END ) AS M8_saleAmt,
SUM(CASE WHEN dataMonth=9 THEN saleroom ELSE 0 END ) AS M9_saleAmt,
SUM(CASE WHEN dataMonth=10 THEN saleroom ELSE 0 END ) AS M10_saleAmt,
SUM(CASE WHEN dataMonth=11 THEN saleroom ELSE 0 END ) AS M11_saleAmt,
SUM(CASE WHEN dataMonth=12 THEN saleroom ELSE 0 END ) AS M12_saleAmt
From V_Agent_Platform_Sales_Detail_2 
Where dataYear =@year
And (productTypeName like '%' +@ProductTypeName+'%')
And (responsibleNamePla like '%' +@platformResponsibleName+'%')
And (agentName like '%' +@agent+'%')
And (FnamePla like '%' +@platform+'%')
And (responsibleName like '%' +@responsibleName+'%')
Group By   dataYear,productTypeName, agentID,agentNumber,agentName,productTypeID,responsibleName,
usedName,FnamePla ,responsibleNamePla) tt
 
 

 
 
 --select * from V_Agent_Platform_Sales_Detail_2 order by fyear.fmonth,PRODUCTTYPEID
 
 