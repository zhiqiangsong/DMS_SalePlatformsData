'use strict';
Number.prototype.padLeft = function(base,chr){
	var  len = (String(base || 10).length - String(this).length)+1;
	return len > 0? new Array(len).join(chr || '0')+this : this;
}

exports.formatDateTime=function(dateString){
	let d=(dateString)?new Date(dateString):new Date();
	let formatDate =  d.getFullYear()+("0"+(d.getMonth()+1)).slice(-2)+("0"+d.getDate()).slice(-2);
	let formatTime = ("0"+d.getHours()).slice(-2)+("0"+d.getMinutes()).slice(-2)+("0"+d.getSeconds()).slice(-2);
	let utcFormat = [d.getUTCFullYear(),
	  (d.getUTCMonth()+1).padLeft(),
	  d.getUTCDate().padLeft(),
	  ].join('') +' ' +
	 [d.getUTCHours().padLeft(),
	  d.getUTCMinutes().padLeft(),
	  d.getUTCSeconds().padLeft()].join(':');

	return {date:formatDate,time:formatTime,utcDateTime:utcFormat}
}

//access control
var accessControl = require('./accessControl.json');
exports.checkAccess=function(role,targetUrl){
	if (!accessControl[role]) return true;
	let access=true;
	if (accessControl[role]["allowedUrls"]){
		access=false; 
	}
	let accessUrls = accessControl[role]["allowedUrls"]||accessControl[role]["bannedUrls"]
	for (let i = 0; i < accessUrls.length; i++) {
		const accessUrl = accessUrls[i];
		if (targetUrl.toLowerCase().match(accessUrl.toLowerCase())){
			access=!access;
			break;
		}
	}
	return access;
}

exports.arraySort=function(array,sortKey,order='asc'){
	let sorted=[];
	if (array&&array.length>0){
		sorted=array.sort(compare(sortKey,order))
	}
	return sorted;
}

function compare(key, order) {
	return function(a, b) {
	  if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
		// property doesn't exist on either object
		  return 0; 
	  }
  
	  const varA = (typeof a[key] === 'string') ? 
		a[key].toUpperCase() : a[key];
	  const varB = (typeof b[key] === 'string') ? 
		b[key].toUpperCase() : b[key];
  
	  let comparison = 0;
	  if (varA > varB) {
		comparison = 1;
	  } else if (varA < varB) {
		comparison = -1;
	  }
	  return (
		(order == 'desc') ? (comparison * -1) : comparison
	  );
	};
  }
