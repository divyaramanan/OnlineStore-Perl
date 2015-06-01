/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){

    //Technique taken from http://www.programming-free.com 
    var i =0;
	 var t=0;
	  var images = ['pic2.png','choc1.jpg','pic4.jpg','pic5.jpg','pic1.png'];
	  var criteria = ["winter wonderland","milk","nuts","dark chocolates","christmas tote","milk chocolates","brittles","holiday assortments"];
	  var image = $('#photosfr');
	  var cart = new shopping_cart("jadrn039");
	  $('sup').html(cart.size());
	 var flag=0;
     
	    image.html('<img id="ima" src="pic1.png" alt="" />');
            
	  setInterval(function(){  
	    
		image.fadeOut(500, function () {
	  image.html('<img  id=\"im'+i+'\"src="'+images[i++]+'" alt="img" />');
   image.fadeIn(1000);
	   });
	    //image.html('<img  id=\"im'+i+'\"src="'+images[i++]+'" alt="img" />');
            //image.delay(1000).fadeIn(1000);
	  
	   if(i === images.length)
	    i = 0;
	  }, 5000); 

	  
	  $("#photosfr,#im5,#im6,#im7").on('click',function(event){
	         var imgid = event.target.id;
			 var subid = imgid.substr(2);
			 
			 if(subid>=0)
			 find = criteria[subid];
			 else
			 find = criteria[4];
			 $('#indexbody').css("background","none");
			$('body').delay(1000).load( "products.html", function() {
			
              var req = new HttpRequest('/perl/jadrn039/proj3/find_products.cgi?findstr='+find, searchData);
              req.send();
			
              });
			 
	        });
			
	   $("#cartimg,.csize").on('click',function(){
	   location.replace("order.html");
	   });
	  
	   $('#confbody').ready(function(){
	   
	   shopcart = new Array();
       incart= cart.getCartArray();
     for(var items=0;items<cart.getCartArray().length;items++)
	   {
	  shopcart.push(incart[items][0]);
	  tempsku=incart[items][0];
	  var req = new HttpRequest('/perl/jadrn039/proj3/find_products.cgi?findstr='+tempsku,ordinfo);
      req.send();
	
	   }
     	   
	   });
	   
function ordinfo(response)
{
tmpstr="";
tempcalc="";
t++;
var tmpArray = explodeArray(response,'|');
cartarr= cart.getCartArray();
tmpqty=cartarr[t-1][1];
var d = new Date();
var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
tmpstr+="<table class=\"proddet\"><tr><th>SKU</th><th>Item Name</th><th>Description</th><th>Quantity</th><th>Price</th></tr>";
tmpstr+="<tr><td>"+tmpArray[0]+"</td><td>"+tmpArray[2]+"</td><td width=\"20%\">"+tmpArray[3]+"</td><td>"+tmpqty+"</td><td>$"+tmpArray[6]*tmpqty+"</td></tr>";
var cost = tmpArray[5]*tmpqty;
var ret = tmpArray[6]*tmpqty;
tmpstr+="</table>";
var handle = document.getElementById('confdiv');
    handle.innerHTML += tmpstr;
	
 total+= tmpArray[6]*tmpqty;
 
 sqlstr= "INSERT INTO sales VALUES('"+strDate+"','"+tmpArray[0]+"','"+tmpArray[2]+"','"+tmpqty+"','"+cost+"','"+ret+"')";
 var req = new HttpRequest('/perl/jadrn039/proj3/sale.cgi?sql='+sqlstr);
      req.send();

 if(cartarr.length == t)
{
tempcalc="<div id=\"finalcal\">";
tempcalc+="Sub Total:&nbsp;&nbsp;$"+total.toFixed(2)+"<br/>";
tempcalc+="Shipping:&nbsp;&nbsp;$2.00<br/>";
tempcalc+="Tax:&nbsp;&nbsp;$"+(0.08*total).toFixed(2)+"<br/><br/>";
finaltotal= total+2+(0.08*total);
tempcalc+="<span>Final Total:&nbsp;&nbsp;$"+finaltotal.toFixed(2)+"</span><br/>";
tempcalc+="</div>";
tempcalc+="<a href=\"products.html\"><button id=\"shopb\">Continue Shopping</button></a>";

var han = document.getElementById('confdiv');
    han.innerHTML += tempcalc;
	incart= cart.getCartArray();
	for(var items=0;items<incart.length;items++)
	   {
	   //alert(cart.getCartArray());
	  cart.delete(incart[items][0]);
	   //alert(cart.getCartArray());
	   }	

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
     	   
       
});


