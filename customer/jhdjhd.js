comd.command('post').option('-friend, --nme <String...>','friend list').option('-count, --limit <Number>','Limit set').option('-mine, --own','mine').action(()=>{
        curr=currUser();
        const opt=comd.opts();
        if(opt.own)
        {
            signup.findOne({email:curr},(error,arr)=>
            {
                   if(arr!=null)
                     {
                         psts.find({nickname:arr.nickname},(error,found)=>
                          {
                                 if(found.length===0)
                                    {
                                        console.log("NO POST");
                                    }
                                  else
                                    {
                                       for(var x=0;x<found.length;x++)
                                          {
                                              console.log(`${found[x].message}\n Likes:${found[x].like.length}\n Post id:${found[x].id} \n Date:${found[x].date} \n\n`);
                                          }
                                          
                                    }  
                          });
                     }
            });
        }
        else if(opt.nme.length!=0)
        {
            for(var y=0;y<opt.nme.length;y++)
               {
                   psts.find({nickname:opt.nme[y]},(error,found)=>
                     {
                        for(var x=0;x<found.length;x++)
                                          {
                                              console.log(`${found[x].nickname}\n${found[x].message}\n Likes:${found[x].like.length}\n Post id:${found[x].id} \n Date:${found[x].date} \n\n`);
                                          }
                                       
                     });
               }
        }

        else if(opt.limit!=null)
           {
               if(opt.limit>15)
                 {
                     for(var x=1;x<=15;x++)
                       {
                           psts.findOne({id:x},(error,found)=>{
                                   if(found===null)
                                     {
                                         console.log("");
                                     }
                                     else
                                       {
                                          console.log(`${found[x].nickname}\n${found[x].message}\n Likes:${found[x].like.length}\n Post id:${found[x].id} \n Date:${found[x].date} \n\n`); 
                                       }
                           });
                       }
                 }
                else
                 {
                     for(var x=1;x<=opt.limit;x++)
                       {
                           psts.findOne({id:x},(error,found)=>{
                                   if(found===null)
                                     {
                                         console.log("");
                                     }
                                     else
                                       {
                                          console.log(`${found[x].nickname}\n${found[x].message}\n Likes:${found[x].like.length}\n Post id:${found[x].id} \n Date:${found[x].date} \n\n`); 
                                       }
                           });
                       }
                
                        
                 } 
           }
  });
  