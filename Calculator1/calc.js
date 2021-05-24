var n1;
var n2;
var n3;
var res;
var op=0;
function num1()
{
    n1=document.getElementById('n1').value+1;
    document.getElementById('n1').value=n1;
}
function num2()
{
    n1=document.getElementById('n1').value+2;
    document.getElementById('n1').value=n1;
}
function num3()
{
    n1=document.getElementById('n1').value+3;
    document.getElementById('n1').value=n1;
}
function num4()
{
    n1=document.getElementById('n1').value+4;
    document.getElementById('n1').value=n1;
}
function num5()
{
    n1=document.getElementById('n1').value+5;
    document.getElementById('n1').value=n1;
}
function num6()
{
    n1=document.getElementById('n1').value+6;
    document.getElementById('n1').value=n1;
}
function num7()
{
    n1=document.getElementById('n1').value+7;
    document.getElementById('n1').value=n1;
}
function num8()
{
    n1=document.getElementById('n1').value+8;
    document.getElementById('n1').value=n1;
}
function num9()
{
    n1=document.getElementById('n1').value+9;
    document.getElementById('n1').value=n1;
}
function num10()
{
    n1=document.getElementById('n1').value+0;
    document.getElementById('n1').value=n1;
}
function clr(){
    document.getElementById('n1').value="";
}

function getvalue(){
    n2=document.getElementById('n1').value;
    n2=Number(n2);
}
function eql(){
      n3=document.getElementById('n1').value;
      n3=Number(n3);
      if(op==1)
       {
           res=n2+n3;
       }
       if(op==2)
       {
           res=n2-n3;
       }
       if(op==3)
       {
           res=n2*n3;
       }
       
       if(op==4)
       {
           res=n2/n3;
       }
       res=res.toString();
       document.getElementById('n1').value=res;
}
function add(){

    getvalue();
    op=1;
    document.getElementById('n1').value="";
    
}
function sub(){
    getvalue();
    op=2;
    document.getElementById('n1').value="";
    
}
function mult(){
    getvalue();
    op=3;
    document.getElementById('n1').value="";
    
}
function div(){
    getvalue();
    op=4    
    document.getElementById('n1').value="";
}