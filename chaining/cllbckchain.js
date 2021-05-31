var tin=(name,callback) =>{ //callback act as callback function for lc which converts String into lowercase.
    // var name='asaasa';
    callback(name,rmwhi);
}

var lc =(inp,rmw) =>{ //rmw acts like callback for rmwhi which removes white space.
      
    inp=inp.toLowerCase();
    rmw(inp,rmvn);
    }
//var nm1='Ayush 1 3';
var rmwhi=(nm,rmn) =>{  // rmn acts as callback for rmvn which removes number from string.
    nm=nm.replaceAll(/\s+/g,'');
    rmn(nm,pallindrome);
    
}
var rmvn =(nm,pallin) =>{   // pallin act as a pallindrome function callback.
    nm=nm.replaceAll(/[0-9]/g,'');
    pallin(nm);
    
}
var pallindrome=(str)=>{
    var l=str.length;
    var i,j;
    var count=0;
    for(i=0;i<l;i++)
      {
          for(j=i;j<l;j++)
            {
                var lt=j-i+1;
                 if(lt==1)
                  {
                      count++;
                  }else
                    {
                        var start=i;
                        var end=j;
                        var c=0;
                        while(start<=end)
                         {
                             if(str[start]==str[end])
                              {
                                  start++;
                                  end--;
                              }else{
                                  c=1;
                                  break;
                              }
                         } if(c==0)
                             {
                                 count++;
                             }
                            
                           
                    }
            }
      }
      console.log(count);
}

console.log("ENTER NAME");
process.stdin.once('data',(chunk)=>{
    tin(chunk.toString(),lc);
}
);

