/*  We load the global array proj3_data once, then use it as needed
    to retrieve product information.
    
  
*/    


var proj3_data;

function initVars() {
    var cart = new shopping_cart("jadrn039"); 
    proj3_data = new Array();
	shopcart = new Array();
	incart= cart.getCartArray();
	//$('sup').html(cart.size());
	var criteria = ["winter wonderland","milk chocolates","nuts","dark chocolates","christmas tote"];
	var image = $('#photosfr');
	for(var items=0;items<cart.getCartArray().length;items++)
	{
	shopcart.push(incart[items][0]);
	}
	
	
    var req = new HttpRequest('/perl/jadrn039/proj3/get_products.cgi', storeData);
    req.send();
	
	 
    
    $('#dark').on('click', function() {
     printprod($('#dark'),"Dark chocolate");
        });
        
    $('#nuts').on('click', function() {
	 
        printprod($('#nuts'),"Nuts and chews");
        });

    $('#brittle').on('click', function() {
	 printprod($('#brittle'),"Brittles and toffies");
       
        });      

     	 $('#milk').on('click', function() {
	 printprod($('#milk'),"Milk chocolate");
       
        });   	
		
		 $('#truf').on('click', function() {
	 printprod($('#truf'),"Truffles");
       
        });   	
		 $('#gift').on('click', function() {
	 printprod($('#gift'),"Gifts");
       
        });   	
		 $('#hola').on('click', function() {
	 printprod($('#hola'),"Holiday assortments");
       
        }); 
		
        $('#content').on('click', function(event) {
		
	var jquery_obj = event.target.id;
	var j_obj = event.target.className;
	if(j_obj=="changebutton")
	{ location.replace("order.html"); }

	 document.getElementById(jquery_obj).innerHTML="VIEW IN CART";
	document.getElementById(jquery_obj).className = 'changebutton';
	var idm = jquery_obj.replace('b','id');
	var idmv = document.getElementById(idm).innerHTML;
	if(j_obj == "buttons"){
	cart.add(idmv,1);
	}
	incart= cart.getCartArray();	
	
     
        }); 
		
        $('#find').on('click', function() {
		var findstr = $('#search').val();
		if(findstr.length != 0)		
	  {
	  $('#category ul li').css("background-color","#660033");
      $('#category ul li').css("color","white");
	  var req = new HttpRequest('/perl/jadrn039/proj3/find_products.cgi?findstr='+findstr, searchData);
      req.send();
	  }
	  else{
	  initVars();
	  }
       
        });   			
	function printprod(id,str){
	$('#category ul li').css("background-color","#660033");
    $('#category ul li').css("color","white");
	id.css("background-color","#D1B2C2");
	id.css("color","#660033");
	tmpString = "";
	k=1;
	m=1;
        for(var i=0; i < proj3_data.length; i++) {
		    
            if(proj3_data[i][1] == str) {
			
			if(proj3_data[i][2] == undefined)
			 {
			 break;
			 }
	       tmpString +="<div class=\"prod"+k+"\">";
			k++;
           tmpString += "<div  class=\"name\">"+proj3_data[i][2] + "</div><br />";
		   tmpString += "<div id=\"id"+m+"\" class=\"hidden\">"+proj3_data[i][0] + "</div>";
		    var found = $.inArray(proj3_data[i][0],shopcart);
		   
			tmpString += "<img src=\"/~jadrn000/PROJ3_IMAGES/"+
                proj3_data[i][0]+".jpg\" alt=\""+proj3_data[i][2]+"\""+
                " width=\"150px\"  /><br /><br />";       
					  tmpString += "<div class=\"desc\">"+proj3_data[i][3] + "</div><br />";
					tmpString += "<div class=\"price\">$"+proj3_data[i][6] + "</div><br />";
					if(found > -1)
					{
					tmpString += "<button class=\"changebutton\" id=\"b"+m+"\" >VIEW IN CART</button><br />";
					}
					else
					{
					tmpString += "<button class=\"buttons\" id=\"b"+m+"\" >ADD TO CART</button><br />";
					}
                     tmpString+= "</div>";  
                     
					 
				m++;	
               if(k==4)
			      k=1;
				}
            }
			
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
		handle.innerHTML+= "<div class=\"clear\">&nbsp;</div>";
	}
        
              
        
}
    
function storeData(response) {
    
    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        proj3_data[i] = innerArray;
        }
		tmpString = "";
		k=1;
		m=1;
		
    for(var i=0; i < proj3_data.length; i++) {
	    
		    
		
	         if(proj3_data[i][2] == undefined)
			 {
			 break;
			 }
	       tmpString +="<div class=\"prod"+k+"\">";
			k++;
           tmpString += "<div  class=\"name\">"+proj3_data[i][2] + "</div><br />";
		   tmpString += "<div id=\"id"+m+"\" class=\"hidden\">"+proj3_data[i][0] + "</div>";
		   var found = $.inArray(proj3_data[i][0],shopcart);
		   
		   
			
			tmpString += "<img src=\"/~jadrn000/PROJ3_IMAGES/"+
                proj3_data[i][0]+".jpg\" alt=\""+proj3_data[i][2]+"\""+
                " width=\"150px\"  /><br /><br />";       
					  tmpString += "<div class=\"desc\">"+proj3_data[i][3] + "</div><br />";
					tmpString += "<div class=\"price\">$"+proj3_data[i][6] + "</div><br />";
					if(found > -1)
					{
					tmpString += "<button class=\"changebutton\" id=\"b"+m+"\" >VIEW IN CART</button><br />";
					}
					else
					{
					tmpString += "<button class=\"buttons\" id=\"b"+m+"\" >ADD TO CART</button><br />";
					}
                     tmpString+= "</div>";  
					 
				m++;	
               if(k==4)
			      k=1;
				}
                   
           
        
    var handle = document.getElementById('content');
    handle.innerHTML = tmpString;
    }
	
	
	function searchData(resp)
	{
	if(resp == "no")
	tmpString = "<div class=\"noresult\">"+"There is No result for the search criteria."+"</div>";
	else
	storeData(resp);
    var handle = document.getElementById('content');
    handle.innerHTML = tmpString;	
	}
    
function al(stri){

var req = new HttpRequest('/perl/jadrn039/proj3/find_products.cgi?findstr='+stri, tocart);
 req.send();
}

function tocart(response)
{

var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        proj3_data[i] = innerArray;
		if(proj3_data[i][2] != undefined)
		alert("response"+proj3_data[i][2]);
        }
	

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
