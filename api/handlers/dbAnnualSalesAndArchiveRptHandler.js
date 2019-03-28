'use strict';

const dbAnnualSalesAndArchiveSvc=require('../dbservices/dbAnnualSalesAndArchiveRptSvc')
var Promise = require('Promise').default

exports.getAnnualSalesAndArchiveRptExcel=function(req,res){
	var nodeExcel = require('excel-export');
	(async function () {
		try {
			//var list = await dbSaleForecastSvc.getSaleForecastList(req.body.date,req.body.FHospName,req.body.ProductTypeName);
            var list = await dbAnnualSalesAndArchiveSvc.getAnnualSalesAndArchiveRpt(req.query.date,req.query.ProductTypeName);
            
			var conf={};
			conf.cols = [];
			conf.cols.push({caption:'经销商代码 ' 	,captionStyleIndex: 1, type:'string' }); 
			conf.cols.push({caption:'经销商名称  '	,captionStyleIndex: 1, type:'string' }); 
			conf.cols.push({caption:'产品类别 ' 	,captionStyleIndex: 1, type:'string' }); 
			conf.cols.push({caption:'曾用名' 	,captionStyleIndex: 1, type:'string' }); 
			conf.cols.push({caption:'平台负责人 ' 	,captionStyleIndex: 1, type:'string' }); 
			conf.cols.push({caption:'吉威商务负责人'	,captionStyleIndex: 1, type:'string' }); 
			conf.cols.push({caption:'年指标' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'年达成' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'YTD' 	,captionStyleIndex: 1, type:'number' }); 
            //Q1
            conf.cols.push({caption:'原单价' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'Q1指标' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'Q1达成金额' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'Q1达成率' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'1月达成金额' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'2月达成金额' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'3月达成金额' 	,captionStyleIndex: 1, type:'number' }); 
            //Q2
            conf.cols.push({caption:'折扣单价' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'Q2指标' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'Q2达成金额' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'Q2达成率' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'4月达成金额' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'5月达成金额' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'6月达成金额' 	,captionStyleIndex: 1, type:'number' }); 
            //Q3
            conf.cols.push({caption:'折扣单价' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'Q3指标' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'Q3达成金额' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'Q3达成率' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'7月达成金额' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'8月达成金额' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'9月达成金额' 	,captionStyleIndex: 1, type:'number' }); 
            //Q4
            conf.cols.push({caption:'折扣单价' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'Q4指标' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'Q4达成金额' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'Q4达成率' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'10月达成金额' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'11月达成金额' 	,captionStyleIndex: 1, type:'number' }); 
            conf.cols.push({caption:'12月达成金额' 	,captionStyleIndex: 1, type:'number' }); 
			conf.rows = [];
			for(var i=0;i<list.recordset.length;i++){
				var row = [];
				row.push(list.recordset[i].agentNumber);
				row.push(list.recordset[i].agentName);
				row.push(list.recordset[i].productTypeName);
				row.push(list.recordset[i].usedName);
				row.push(list.recordset[i].responsibleNamePla);
				row.push(list.recordset[i].responsibleName);
				row.push(list.recordset[i].Year_targetAmt);
                row.push(list.recordset[i].Year_saleAmt);
                row.push(list.recordset[i].YTD_Rate);
                //Q1
                row.push(list.recordset[i].Q1_discountPrice);
                row.push(list.recordset[i].Q1_targetAmt);
                row.push(list.recordset[i].Q1_saleAmt);
                row.push(list.recordset[i].Q1_yieldRate);
                row.push(list.recordset[i].M1_saleAmt);
                row.push(list.recordset[i].M2_saleAmt);
                row.push(list.recordset[i].M3_saleAmt);    
                //Q2
                row.push(list.recordset[i].Q2_discountPrice);
                row.push(list.recordset[i].Q2_targetAmt);
                row.push(list.recordset[i].Q2_saleAmt);
                row.push(list.recordset[i].Q2_yieldRate);
                row.push(list.recordset[i].M4_saleAmt);
                row.push(list.recordset[i].M5_saleAmt);
                row.push(list.recordset[i].M6_saleAmt);                
                //Q3
                row.push(list.recordset[i].Q3_discountPrice);
                row.push(list.recordset[i].Q3_targetAmt);
                row.push(list.recordset[i].Q3_saleAmt);
                row.push(list.recordset[i].Q3_yieldRate);
                row.push(list.recordset[i].M7_saleAmt);
                row.push(list.recordset[i].M8_saleAmt);
                row.push(list.recordset[i].M9_saleAmt);    
                //Q4
                row.push(list.recordset[i].Q4_discountPrice);
                row.push(list.recordset[i].Q4_targetAmt);
                row.push(list.recordset[i].Q4_saleAmt);
                row.push(list.recordset[i].Q4_yieldRate);
                row.push(list.recordset[i].M10_saleAmt);
                row.push(list.recordset[i].M11_saleAmt);
                row.push(list.recordset[i].M12_saleAmt);    

				conf.rows.push(row);
			}		
			var result = nodeExcel.execute(conf);
			res.setHeader('Content-Type', 'application/vnd.openxmlformats');
			res.setHeader("Content-Disposition", "attachment; filename=" + "JwmsAnnualReport.xlsx");
			res.end(result, 'binary');   
		} catch (error) {
			return res.status(200).send({error:true,message:error.message});
		}
	})()
};