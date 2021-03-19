function target(id,ip, scanlist, report_callback, recon_moed){
    this.SetDeathTimeout=function(secs){death_timeout=secs;}
    this.Scan = target_scan;
    var current_scanlistItem=0;
    var death_timeout=3;
    var stat_urltrycount=0;
    var stat_urlomitcount=0;
    var response_times=[];


    function img_onload(img, _id, start_time){
        var end_time=getTimeSecs() - start_time;
        end_time = Math.round(end_time,0);
        handle_result(1,img, end_time);
    }

    function img_onerror(img, _id, start_time){
        var end_time=getTimeSecs() - start_time;
        end_time = Math.round(end_time,0);
        handle_result(0,img, end_time);
    }

    function target_scan(){
		if(scanlist[current_scanlistItem]==null && current_scanlistItem < scanlist.length){
			current_scanlistItem=current_scanlistItem+1;
			stat_urlomitcount = stat_urlomitcount+1;
			target_scan();
		}else if (scanlist[current_scanlistItem]!=null && current_scanlistItem < scanlist.length){
			var lsurl = scanlist[current_scanlistItem]["PROTO"]+"://" + ip + ":" + scanlist[current_scanlistItem]["PORT"] + "/" + scanlist[current_scanlistItem]["IMAGE"];
			RetrImg(lsurl);
		}else{
			report_callback(id,ip,0,'DONE', scanlist[current_scanlistItem], stat_urltrycount + "/" + stat_urlomitcount,0);
		}
		
	}
    function handle_result(result,img,time_taken){

		var stopscanning=0;
		
		response_times.push(time_taken); //keep statistics to trap dead ips

		stat_urltrycount=stat_urltrycount+1;

		if (result ==1){
		//image retrieval was a succes.
			if (scanlist[current_scanlistItem]["DEPTRIGGER"]==0){stopscanning=1;}
			report_callback(id,ip,1,"HIT",scanlist[current_scanlistItem],stat_urltrycount + "/" + stat_urlomitcount,time_taken);
		}else{
		//failure also yields viable info
		//e.g.: arp takes 3 seconds, if it fails before that we know that the ip is in use
			if (isDeadHost(response_times,death_timeout, stat_urltrycount)==true){
				stopscanning==1 //dead, don't scan further
				report_callback(id,ip,0,'DEAD',scanlist[current_scanlistItem],stat_urltrycount + "/" + stat_urlomitcount, time_taken);				
			}else{;
				report_callback(id,ip,0,'UNKNOWN', scanlist[current_scanlistItem],stat_urltrycount + "/" + stat_urlomitcount,time_taken);
			}
		}
		
		if (stopscanning==0){
			scanlist_removeObsoleteItems(scanlist,scanlist[current_scanlistItem],result);
			current_scanlistItem = current_scanlistItem+1;
			target_scan() //scan next image
		}
	}

    function RetrImg(lsURL,_id){
        objImage = new Image();

        var start_time= getTimeSecs();
        objImage.onload= function(){img_onload(this,_id,start_time)}
        objImage.onerror= function(){img_onerror(this,_id, start_time)}
        objImage.src=lsURL;
    }
}


