$(document).ready(function(){
$('#emptycart').hide();
$('#cart').hide();
$('#eid').hide();
var idarr=[$('#fname'),$('#lname'),$('#address1'),$('#city'),$('#state'),$('#zip'),$('#area'),$('#pre'),$('#post'),
           $('#sfname'),$('#slname'),$('#saddress1'),$('#scity'),$('#sstate'),$('#szip'),$('#sarea'),$('#spre'),$('#spost'),
		   $('#psw1'),$('#psw2'),$('#psw3'),$('#psw4'),$('#mm'),$('#yy')];
var zipid = [$('#zip'),$('#szip')];
var phone3 = [$('#area'),$('#pre'),$('#sarea'),$('#spre')];
var phone4 = [$('#post'),$('#spost')];
var card = [ $('#psw1'),$('#psw2'),$('#psw3'),$('#psw4')];
var cart = new shopping_cart("jadrn039");
t=0,total=0;

//Showing cart if atleast one item is added to cart
var size = cart.size();
var cartshow=0;
if(size>0)
{
$('#cart').show();
cartshow=1;
}
else
$('#emptycart').show();
if(cartshow == 1)
{
shopcart = new Array();
incart= cart.getCartArray();
for(var items=0;items<cart.getCartArray().length;items++)
	{
	shopcart.push(incart[items][0]);
	tempsku=incart[items][0];
	var req = new HttpRequest('/perl/jadrn039/proj3/find_products.cgi?findstr='+tempsku,prodinfo);
    req.send();
	
	}

}
       
	    
$('#cart').on('click',function(event){

var rbqid = event.target.id;
var subid = rbqid.substring(0,2);
//var subqid = rbqid.substring(0,1);
if(subid=="rb")
{
var idsku = rbqid.replace('rb','sku');
var skuval = document.getElementById(idsku).innerHTML;
cart.delete(skuval);
location.reload();
}
if(subid=="ou")
{
$('body').load("addtocart.html");
}
});

$('#cart').on('change',function(event){
var rbqid = event.target.id;
var rbq = event.target.value;
var err="";
if(rbq>0)
{
$('#eid').hide();
var subqid = rbqid.substring(0,1);
if(subqid=="q")
{
var idsku = rbqid.replace('q','sku');
var skuval = document.getElementById(idsku).innerHTML;
cart.setQuantity(skuval,rbq);
location.reload(false);
}
}
else{
$('#eid').show();
}
 
});



function prodinfo(response)
{
tmpstr="";
tempcalc="";
shoporout="";
t++;
var tmpArray = explodeArray(response,'|');
cartarr= cart.getCartArray();
tmpqty=cartarr[t-1][1];
tmpstr="<table><tr>";
tmpstr+="<td><img src=\"/~jadrn000/PROJ3_IMAGES/"+tmpArray[0]+".jpg\" alt=\""+tmpArray[2]+"\" width=\"150px\"  /></td>";
tmpstr+="<td class=\"info\"><span class=\"pname\">"+tmpArray[2]+"</span><br/>Category:&nbsp;"+tmpArray[1]+"<br/>SKU:&nbsp;<span id=\"sku"+t+"\">"+tmpArray[0]+"</span></td>";
tmpstr+="<td>Quantity:<input type=\"text\" size=\"3\" value=\""+tmpqty+"\" class=\"qty\" id=\"q"+t+"\"<br/>" ;  
tmpstr+="<br/><button class=\"rbuttons\" id=\"rb"+t+"\" >Remove item</button></td>"; 
tmpstr+="<td class=\"retail\">$"+tmpArray[6]*tmpqty+"</td>"

tmpstr+="</tr></table>";


var handle = document.getElementById('cart');
    handle.innerHTML += tmpstr;
 total+= tmpArray[6]*tmpqty;

 if(cartarr.length == t)
{
tempcalc="<div id=\"calc\">";
tempcalc+="Sub Total:&nbsp;&nbsp;$"+total.toFixed(2)+"<br/>";
tempcalc+="Shipping:&nbsp;&nbsp;$2.00<br/>";
tempcalc+="Tax:&nbsp;&nbsp;$"+(0.08*total).toFixed(2)+"<br/><br/>";
finaltotal= total+2+(0.08*total);
tempcalc+="<span>Final Total:&nbsp;&nbsp;$"+finaltotal.toFixed(2)+"</span><br/>";
tempcalc+="</div>"

var han = document.getElementById('cart');
    han.innerHTML += tempcalc;

shoporout+="<a href=\"products.html\"><button id=\"shopb\">Continue Shopping</button></a><button id=\"out\">Proceed to Checkout</button>";
 han.innerHTML += shoporout;
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
     
$('input[name=same]').on('click',function(){
var boxes = $('input[name=same]:checked').val();
if(boxes == "samecheck")
{

for(var j=0;j<=8;j++)
{
var value = idarr[j].val();
idarr[j+9].val(value);
}
var valadd = $('#address2').val();
$('#saddress2').val(valadd);
}
});


function isvalid(){
var msg="";
var mm = $.trim($('#mm').val());
var yy = $.trim($('#yy').val());
for(var i=0;i<idarr.length;i++)
{
idarr[i].css("border-color","black");
$('#paytype').css("border-color","black");
var idval = $.trim(idarr[i].val());
if(idval.length == 0)
{
idarr[i].focus();
idarr[i].css("border-color","red");
$('#vmsg').html("*All fields are required and cannot be empty. Second Line of Address is optional");
return false;
}}
if($('#paytype').val()==='sel')
{
$('#paytype').focus();
$('#paytype').css("border-color","red");
$('#vmsg').html("*Select one of payment type");
return false;
} 
if(($.isNumeric(mm) == false)|| (mm>12) || (mm<0) || ($.isNumeric(yy) == false) || (yy<2014))
{
$("#yy").css("border-color","red");
$("#mm").css("border-color","red");
$('#vmsg').html("*Enter valid Expiration date");
return false;
}
for(var j=0;j<zipid.length;j++)
{
var zipval = $.trim(zipid[j].val());
if(($.isNumeric(zipval) == false)||(zipval.length != 5))
{
zipid[j].focus();
zipid[j].css("border-color","red");
$('#vmsg').html("ZipCode must be 5 digits and numeric");
return false;
}
}
for(var j=0;j<phone3.length;j++)
{
var phval = $.trim(phone3[j].val());
if(($.isNumeric(phval) == false)||(phval.length != 3))
{
phone3[j].focus();
phone3[j].css("border-color","red");
$('#vmsg').html("Area and Prefix code  must be 3 digits and numeric");
return false;
}  
}
for(var j=0;j<phone4.length;j++)
{
var phval = $.trim(phone4[j].val());
if(($.isNumeric(phval) == false)||(phval.length != 4))
{
phone4[j].focus();
phone4[j].css("border-color","red");
$('#vmsg').html("Phone code  must be 4 digits and numeric");
return false;
}  
}
for(var j=0;j<card.length;j++)
{
var cval = $.trim(card[j].val());
if(($.isNumeric(cval) == false)||(cval.length != 4))
{
card[j].focus();
card[j].css("border-color","red");
$('#vmsg').html("Card Number must be numeric and Contain 4 digits in each field");
return false;
}  
}
return true;
}

$('form').on('submit',function(e){ 
      shipping="";
	  billing="";
      var sfname = $('#sfname').val();
	  var slname = $('#slname').val();
	  var sa1 = $('#saddress1').val();
	  var sa2 = $('#saddress2').val();
	  var scity = $('#scity').val();
	  var sst = $('#sstate').val();
	  var sz = $('#szip').val();
	  var sphone = "("+$('#sarea').val()+")"+$('#spre').val()+"-"+$('#spost').val();
	  shipping = "<div id=\"ship\">"+sfname+"&nbsp;"+slname+"</br>";
	  shipping+=sa1+"</br>";
	  if($.trim(sa2) != "")
	  shipping+=sa2+"</br>";
	  shipping+=scity+"&nbsp;"+sst+"&nbsp"+sz+"</div>";
	  shipping+="Phone:&nbsp;"+sphone;
	  
      var fname = $('#fname').val();
	  var lname = $('#lname').val();
	  var a1 = $('#address1').val();
	  var a2 = $('#address2').val();
	  var city = $('#city').val();
	  var st = $('#state').val();
	  var z = $('#zip').val();
	   var phone = "("+$('#area').val()+")"+$('#pre').val()+"-"+$('#post').val();
	  
	  billing = "<div id=\"bill\">"+fname+"&nbsp;"+lname+"</br>";
	  billing+=a1+"</br>";
	  if($.trim(a2) != "")
	  billing+=a2+"</br>";
	  billing+=city+"&nbsp;"+st+"&nbsp"+z+"</div>";
	  billing+="Phone:&nbsp;"+phone;
	  var d = new Date();
    var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
	
	  str="";
	  str="<table id=\"useinfo\"><tr><th>OrderDate</th><th>Billing Information</th><th>Shipping information</th></tr>";
	  str+="<tr><td>"+strDate+"</td><td>"+billing+"</td><td>"+shipping+"</td></tr></table>";
	  
	  
      if(isvalid() == true)
	  $('body').load("confirm.html",function(){
	  var han = document.getElementById('confdiv');
      han.innerHTML += str;
	 
	  });
	  return false;
});


       


});