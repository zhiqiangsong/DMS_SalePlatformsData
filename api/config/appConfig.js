'use strict';
var appConfig=(function(){
	var instance;
	function AppConfig(){var config; };
	AppConfig.prototype.setEnv=function(env){
		this.config = require("./../../db-config/.db-config-"+env+".json");
	}

	AppConfig.prototype.getSqlConnParam=function(){
		var param = {};
		Object.assign(param,this.config.jmSqlConnParams);
		return param;
	}
	return {
		getInstance : function(){
				if (instance == null) {
						instance = new AppConfig();
						// Hide the constructor so the returned objected can't be new'd...
						instance.constructor = null;
				}
				return instance;
		}
};
})();

module.exports = appConfig;
