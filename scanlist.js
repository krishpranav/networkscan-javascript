var scanlist_scanurls=[]

function scanlist_init(){
    var tmp_data=null
        
    for (var x=0;x < images.length;x++){
            try{
                tmp_data= images[x].split('|');
                if(tmp_data.length==8){
                    scanlist_scanurls.push(new Array)
                    scanlist_scanurls[scanlist_scanurls.length-1]["ID"]= parseInt(tmp_data[0]);
                    scanlist_scanurls[scanlist_scanurls.length-1]["LABEL"]=tmp_data[1];
                    scanlist_scanurls[scanlist_scanurls.length-1]["PORT"]=parseInt(tmp_data[2]);
                    scanlist_scanurls[scanlist_scanurls.length-1]["PROTO"]=tmp_data[3];
                    scanlist_scanurls[scanlist_scanurls.length-1]["IMAGE"]=tmp_data[4];
                    scanlist_scanurls[scanlist_scanurls.length-1]["HEIGHT"]= parseInt(tmp_data[5].split(",")[0]);
                    scanlist_scanurls[scanlist_scanurls.length-1]["WIDTH"]= parseInt(tmp_data[5].split(",")[1]);
                    scanlist_scanurls[scanlist_scanurls.length-1]["DEPTRIGGER"]= parseInt(tmp_data[6]);
                    scanlist_scanurls[scanlist_scanurls.length-1]["DEPENDENCY"]= tmp_data[7];
                }else{
                    console.log('Invalid scan url in scanlist.txt: line'+ (x+1))
                }
            }
            catch(err){
                console.log('Invalid scan url in scanlist.txt: ' + err.message)//lines[x])				
            }
    }
}