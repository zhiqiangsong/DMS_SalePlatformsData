IF EXISTS (SELECT * FROM SYSOBJECTS WHERE name = 'V_Agent_Platform_Sales_Detail')
	drop view  V_Agent_Platform_Sales_Detail
	go
create view V_Agent_Platform_Sales_Detail
as
select tt.agentNumber as agentNumber,tt.agentName as agentName,tt.productTypeName as productTypeName,'' as usedName,vap.FNamePla as FNamePla,tbmPla.responsibleName as responsibleNamePla,tbm.responsibleName as responsibleName,
year(tt.FDateEnd) as dataYear,month(tt.FDateEnd) as dataMonth,0 as oldPrice,
case month(tt.FDateEnd)
	when 1 then tbi.Jan
	when 2 then tbi.Feb
	when 3 then tbi.Mar
	when 4 then tbi.Apr
	when 5 then tbi.May
	when 6 then tbi.Jun
	when 7 then tbi.Jul
	when 8 then tbi.Aug
	when 9 then tbi.Sep
	when 10 then tbi.Oct
	when 11 then tbi.Nov
	when 12 then tbi.Dec
end
as targetValue,tt.saleroom saleroom,
tt.saleroom/(nullif(case month(tt.FDateEnd)
	when 1 then tbi.Jan
	when 2 then tbi.Feb
	when 3 then tbi.Mar
	when 4 then tbi.Apr
	when 5 then tbi.May
	when 6 then tbi.Jun
	when 7 then tbi.Jul
	when 8 then tbi.Aug
	when 9 then tbi.Sep
	when 10 then tbi.Oct
	when 11 then tbi.Nov
	when 12 then tbi.Dec
end,0)) as yieldRate,
case month(tt.FDateEnd)
	when 1 then tbiDis.Jan
	when 2 then tbiDis.Feb
	when 3 then tbiDis.Mar
	when 4 then tbiDis.Apr
	when 5 then tbiDis.May
	when 6 then tbiDis.Jun
	when 7 then tbiDis.Jul
	when 8 then tbiDis.Aug
	when 9 then tbiDis.Sep
	when 10 then tbiDis.Oct
	when 11 then tbiDis.Nov
	when 12 then tbiDis.Dec
end
as discountPrice,
tt.FDateEnd FDateEnd
 from 
(SELECT top 100 percent tbde1.*,tbd1.productTypeId,tbd1.productTypeName
FROM t_BOS_DealerSalesDataEntry2 tbde1
inner join t_BOS_DealerSalesData tbd1 on  tbd1.FID = tbde1.fid
WHERE tbd1.status = 1 
and tbde1.FDateEnd = (
	SELECT MAX(tbde2.FDateEnd)
	FROM t_BOS_DealerSalesDataEntry2 tbde2
	inner join t_BOS_DealerSalesData tbd2 on  tbd2.FID = tbde2.fid
	WHERE tbd2.status = 1  and tbde1.agentId = tbde2.agentId and tbd1.productTypeId = tbd2.productTypeId and month(tbde1.FDateEnd) = month(tbde2.FDateEnd)
)
ORDER BY tbde1.agentId,tbd1.productTypeId,month(tbde1.FDateEnd)) tt
left join t_BOSProduct_Index tbi on tbi.agentId = tt.agentId and tbi.productTypeId = tt.productTypeId and tbi.FYear = year(tt.FDateEnd) and tbi.dataType=1
left join  V_Agent_Platform vap on vap.FItemID = tt.agentId
left join t_BOSResponsible_Maintenance tbmPla on tbmPla.agentId = vap.FItemIDPla
left join t_BOSResponsible_Maintenance tbm on tbm.agentId = tt.agentId
left join t_BOSProduct_Index tbiDis on tbiDis.agentId = tt.agentId and tbiDis.productTypeId = tt.productTypeId and tbiDis.FYear = year(tt.FDateEnd) and tbiDis.dataType=2

go