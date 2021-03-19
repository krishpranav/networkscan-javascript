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

    
}