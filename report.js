$(document).ready(function(){


var sql="SELECT * FROM sales ORDER BY orderdate";
var req = new HttpRequest('/perl/jadrn039/proj3/report.cgi?sql='+sql,printtable);
req.send();

 
 


function printtable(response){
 proj3_data = new Array();
var tmpArray = explodeArray(response,';');

  for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        proj3_data[i] = innerArray;
		 
        }
		tmpString = "";
		var costp=0.00;
		var retailp=0.00;
		tmpString = "<div class=\"rephead\">Report on the sales ordered by date</div>";
		tmpString += "<table id=\"tabrep\"><tr><th>Date</th><th>SKU</th><th>Title</th><th>Quantity</th><th>Cost</th><th>Retail</th></tr>";
	   for(var i=0; i < proj3_data.length; i++)
	   {
	   if(proj3_data[i][1] != undefined)
	   {
	   tmpString += "<tr><td>"+proj3_data[i][0]+"</td><td>"+proj3_data[i][1]+"</td><td>"+proj3_data[i][2]+"</td><td>"+proj3_data[i][3]+"</td><td>$"+proj3_data[i][4]+"</td><td>$"+proj3_data[i][5]+"</td></tr>";
	   costp+=parseFloat(proj3_data[i][4]);
	   retailp+=parseFloat(proj3_data[i][5]);
	   }
	   }
	   var profit = retailp - costp;
	   var profp  = (profit/costp)*100;
	   tmpString += "</table>";
		 var handle = document.getElementById('report');
          handle.innerHTML += tmpString;
		  tmpString="";
		tmpString = "<div class=\"rephead\">Profit Calculation</div>"  
	   tmpString += "<table id=\"profrep\"><tr><th>Total Cost</th><th>Total Retail</th><th>Profit</th><th>Profit Percentage</th></tr>";
	   tmpString += "<tr><td>$"+costp.toFixed(2)+"</td><td>$"+retailp.toFixed(2)+"</td><td>$"+profit.toFixed(2)+"</td><td>"+profp.toFixed(2)+"%</tr></table>";
	    var handle = document.getElementById('report');
          handle.innerHTML += tmpString;
		  
}

function explodeArray(item,delimiter) {
tempArray=new Array(1);
var Count=0;
var tempString=new String(item);

while (tempString.indexOf(delimiter)>0) {
tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
Count=Count+1
}

tempArray[Count]=tempString;
return tempArray;
}

});