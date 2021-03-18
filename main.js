var main_SCANURLS=null;
var main_fulesloaded=0;
var main_files2load=5;

function _run(){
	loadjs("images.js");
	loadjs("scanlist.js");
	loadjs("settings.js");
	loadjs("target.js")
}

function timed_run(){
	if (main_filesloaded < main_files2load){
		//waiting for all script
		setTimeout("timed_run()", 100)
	}else {
		scanlist_init()
		_scan(settings_range);
	}
}

function loadjs(filename){
	var fileref=document.createElement('script')
	fileref.setAttribute("type", "text/javascript")
	fileref.setAttribute("src", filename)
	document.getElementsByTagName("body")[0].appendChild(fileref)
}

//triggers everything
_run();