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
}