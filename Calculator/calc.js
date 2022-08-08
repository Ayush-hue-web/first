var n1;
var n2;
var res;
function getvalue(){
    n1=document.getElementById('n1').value;
    n2=document.getElementById('n2').value;
    n1=Number(n1);
    n2=Number(n2);
    
}
function display(){
      document.getElementById('n1').value="";
      document.getElementById('n2').value="";
      res=res.toString();
      document.getElementById('res').value=res;
}
function add(){

    getvalue();
    res=n1+n2;
    if(n1==0&&n2==0)
     {
         res="";
     }
    display();
    console.log(res);
}
function sub(){
    getvalue();
    res=n1-n2;
    if(n1==0&&n2==0)
     {
         res="";
     }
    display();
    console.log(res);
}
function mult(){
    getvalue();
    res=n1*n2;
    if(n1==0&&n2==0)
     {
         res="";
     }
    display();
    console.log(res);
}
function div(){
    getvalue();
    res=n1/n2;
    if(n1==0&&n2==0)
     {
         res="";
     }
    display();
    console.log(res);
}