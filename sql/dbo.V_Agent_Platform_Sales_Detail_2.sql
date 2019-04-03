IF EXISTS (SELECT * FROM SYSOBJECTS WHERE name = 'V_Agent_Platform_Sales_Detail_2')
	drop view  V_Agent_Platform_Sales_Detail_2
	go
create view V_Agent_Platform_Sales_Detail_2
as
SELECT     vap.FItemID AS agentID, vap.FNumber AS agentNumber, vap.FName AS agentName, ISNULL(prdTbi.FInterID, 0) AS productTypeID, ISNULL(prdTbi.FName, '') AS productTypeName, '' AS usedName, 
                      vap.FNamePla, tbmPla.responsibleName AS responsibleNamePla, case when tbm.responsibleName is null then '' else tbm.responsibleName end as responsibleName, ISNULL(tbi.FYear, 0) AS dataYear, ISNULL(tbi.FMonth, 0) AS dataMonth, 0 AS oldPrice, 
                      CASE WHEN tbi.FMonth IN (1, 2, 3) THEN 1 WHEN tbi.FMonth IN (4, 5, 6) THEN 2 WHEN tbi.FMonth IN (7, 8, 9) THEN 3 WHEN tbi.FMonth IN (10, 11, 12) THEN 4 WHEN ISNULL(tbi.FMonth, 0) 
                      = 0 THEN 0 END AS FQuartor, ISNULL(tbi.FValue, 0) AS targetValue, ISNULL(tt.saleroom, 0) AS saleroom, ISNULL(tt.saleroom, 0) / NULLIF (tbi.FValue, 0) AS yieldRate, ISNULL(tbiDis.FValue, 0) 
                      AS discountPrice, tt.FDateEnd
FROM         dbo.V_Agent_Platform AS vap LEFT OUTER JOIN
                      dbo.v_BOSProduct_Index AS tbi ON vap.FItemID = tbi.agentID AND tbi.dataType = 1 LEFT OUTER JOIN
                      dbo.t_SubMessage AS prdTbi ON prdTbi.FInterID = tbi.productTypeId AND prdTbi.FParentID = 10008 LEFT OUTER JOIN
                      dbo.t_BOSResponsible_Maintenance AS tbmPla ON tbmPla.agentId = vap.FItemIDPla LEFT OUTER JOIN
                      dbo.t_BOSResponsible_Maintenance AS tbm ON tbm.agentId = vap.FItemID LEFT OUTER JOIN
                      dbo.v_BOSProduct_Index AS tbiDis ON tbiDis.agentID = vap.FItemID AND tbiDis.productTypeId = tbi.productTypeId AND tbiDis.FYear = tbi.FYear AND tbiDis.FMonth = tbi.FMonth AND 
                      tbiDis.dataType = 2 LEFT OUTER JOIN
                          (SELECT     tbde1.FEntryID, tbde1.FID, tbde1.FIndex, tbde1.FInteger3, tbde1.FText2, tbde1.FText3, tbde1.FTimeOnly, tbde1.FDecimal, tbde1.FDecimal1, tbde1.FText4, tbde1.agentId, 
                                                   tbde1.agentNumber, tbde1.agentName, tbde1.endDate, tbde1.salesVolume, tbde1.saleroom, tbde1.remark, tbde1.endFTime, tbde1.FDateEnd, tbd1.productTypeId, 
                                                   tbd1.productTypeName
                            FROM          dbo.t_BOS_DealerSalesDataEntry2 AS tbde1 INNER JOIN
                                                   dbo.t_BOS_DealerSalesData AS tbd1 ON tbd1.FID = tbde1.FID INNER JOIN
                                                       (SELECT     tbde2.agentId, tbd2.productTypeId, YEAR(tbde2.FDateEnd) AS FYear, MONTH(tbde2.FDateEnd) AS Fmonth, MAX(tbde2.FDateEnd) AS FMaxDateEnd
                                                         FROM          dbo.t_BOS_DealerSalesDataEntry2 AS tbde2 INNER JOIN
                                                                                dbo.t_BOS_DealerSalesData AS tbd2 ON tbd2.FID = tbde2.FID
                                                         WHERE      (tbd2.status = 1)
                                                         GROUP BY tbde2.agentId, tbd2.productTypeId, YEAR(tbde2.FDateEnd), MONTH(tbde2.FDateEnd)) AS tb2 ON tb2.agentId = tbde1.agentId AND tb2.FMaxDateEnd = tbde1.FDateEnd AND
                                                    tbd1.productTypeId = tb2.productTypeId) AS tt ON vap.FItemID = tt.agentId AND tbi.productTypeId = tt.productTypeId AND tbi.FYear = YEAR(tt.FDateEnd) AND 
                      tbi.FMonth = MONTH(tt.FDateEnd)

go