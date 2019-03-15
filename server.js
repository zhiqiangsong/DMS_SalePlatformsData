let port = "7070"
if (process.argv.length <= 2) {
	console.log("Usage: node server.js [dev/qas/prod] [port]");
	process.exit(-1);
} else if (process.argv.length > 2){
	let env = process.argv[2];
	require('./api/config/appConfig').getInstance().setEnv(env);
	if (process.argv.length > 3)
		port = process.argv[3];
}
 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require("express-session");

 
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.urlencoded({
    extended: true
}));

 app.use(session({
 	secret:"jmuser",
	 resave:true,
	 rolling:true,//reset expiration to the original maxAage on every response
 	saveUninitialized:true,
 	cookie:{
 		maxAge:1000*60*10 //ten mins
 	}

 }))
 
app.use('/', express.static(__dirname + '/web'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.get('/jmapi', function (req, res) {
   return res.send({message: 'hello, jmapi!' })
});
 
var auth=require('./api/handlers/authHandler');
app.get('/jmapi/check-login-status.json',auth.checkLoginStatus);
app.post('/jmapi/login.json',auth.login);
app.get('/jmapi/logout.json',auth.logout);
app.get('/db-info.json',auth.dbInfo);

var commonHandler = require('./api/handlers/commonHandler');
var dealerSalesDataHandler = require('./api/handlers/dealerSalesDataHandler');
var productIndexHandler = require('./api/handlers/productIndexHandler');
var responsibleMaintenanceHandler = require('./api/handlers/responsibleMaintenanceHandler');

//var dealerSalesDataHandler = require('./api/handlers/dealerSalesDataHandler');
app.get('/jmapi/get-user-list.json',auth.adminCheck,commonHandler.getUserList);
app.post('/jmapi/add-edit-user.json',auth.adminCheck,commonHandler.addEditUser);
app.post('/jmapi/delete-user.json',auth.adminCheck,commonHandler.deleteUser);
app.post('/jmapi/view-info-log.json',auth.authCheck,commonHandler.viewLog);
app.post('/jmapi/view-error-log.json',auth.authCheck,commonHandler.viewLog);
app.post('/jmapi/get-performance-report.json',auth.authCheck,commonHandler.getPerformanceReport);
app.post('/jmapi/get-dealer-sales-data-list.json',auth.authCheck,dealerSalesDataHandler.getDealerSalesDataList);
app.get('/jmapi/get-product-type-list.json',auth.authCheck,commonHandler.getProductTypeList);
app.post('/jmapi/add-dealer-sale-data.json',auth.authCheck,dealerSalesDataHandler.addDealerSaleData);
app.post('/jmapi/delete-dealer-sales-data.json',auth.authCheck,dealerSalesDataHandler.deleteDealerSaleData);
app.post('/jmapi/get-product-index-list.json',auth.authCheck,productIndexHandler.getProductIndexList);
app.post('/jmapi/get-product-index-list.json',auth.authCheck,productIndexHandler.getProductIndexList);

app.post('/jmapi/get-dealerSalesData.json',auth.authCheck,dealerSalesDataHandler.getDealerSalesData);
app.post('/jmapi/get-dealerSalesDataEntry-list.json',auth.authCheck,dealerSalesDataHandler.getDealerSalesDataEntryList);
app.post('/jmapi/get-responsibleMaintenance-list.json',auth.authCheck,responsibleMaintenanceHandler.getResponsibleMaintenanceList);
app.post('/jmapi/save-dealer-sales-data.json',auth.authCheck,dealerSalesDataHandler.saveDealerSalesData);
app.post('/jmapi/save-product-index-list.json',auth.authCheck,productIndexHandler.saveProductIndexList);
app.post('/jmapi/init-product-index-data.json',auth.authCheck,productIndexHandler.initProductIndexData);
app.get('/jmapi/get-agent-list.json',auth.authCheck,commonHandler.getAgentList);
app.get('/jmapi/get-responsible-list.json',auth.authCheck,commonHandler.getResponsibleList);

/* app.post('/jmapi/get-performance-report.json',commonHandler.getPerformanceReport);
app.post('/jmapi/get-dealer-sales-data-list.json',dealerSalesDataHandler.getDealerSalesDataList);
app.get('/jmapi/get-product-type-list.json',commonHandler.getProductTypeList);
app.post('/jmapi/add-dealer-sale-data.json',dealerSalesDataHandler.addDealerSaleData);
app.post('/jmapi/delete-dealer-sales-data.json',dealerSalesDataHandler.deleteDealerSaleData);
app.post('/jmapi/get-dealerSalesData.json',dealerSalesDataHandler.getDealerSalesData);
app.post('/jmapi/get-dealerSalesDataEntry-list.json',dealerSalesDataHandler.getDealerSalesDataEntryList); */
//app.post('/jmapi/get-dealer-sales-data-list.json',dealerSalesDataHandler.getDealerSalesDataList);

app.get('*', function(req, res){
   res.send({ERROR:'Sorry, '+req.originalUrl+' is an invalid URL.'});
});
app.listen(port, function () {
    console.log('Node app is running on port '+(port));
});