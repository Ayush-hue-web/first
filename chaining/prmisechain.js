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

var rmvn =(nm) =>{   // pallin act as a pallindrome function callback.
    return new Promise(function(resolve,reject){
        nm=nm.replaceAll(/[0-9]/g,'');
        resolve(nm);
    });
}


var rmwhi=(nm) =>{  // rmn acts as callback for rmvn which removes number from string.
    
    return new Promise(function(resolve,reject){
        nm=nm.replaceAll(/\s+/g,'');
          resolve(nm);
             });
    
}
var lc =(inp) =>{ //rmw acts like callback for rmwhi which removes white space.
      return new Promise(function(resolve,reject){
        inp=inp.toLowerCase();
        resolve(inp);
      });
}
var tin=(name1) =>{ //callback act as callback function for lc which converts String into lowercase.
    return new Promise(function(resolve,reject){
         resolve(name1);
    });
    
}
console.log("ENTER STRING");
process.stdin.once('data',(chunk)=>{
   tin(chunk.toString()).then((chk)=>{
    lc(chk).then((lcs)=>{
        rmwhi(lcs).then((nm1)=>{
            rmvn(nm1).then(pallindrome); });});});});

