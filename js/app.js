requirejs.config({
    baseUrl: './lib',
    urlArgs:function(id,url){
		//版本控制
		var version='v=1.0';		
		var _urlGroup = {
            // "index" : "js/index"
		}	

		if(_urlGroup[id]){
			version = 't=' + new Date().valueOf();	
		}
		
		return (url.indexOf('?')===-1 ? '?':'&') + version;
	},
    paths: {
        "jquery" : "jquery-1.11.3.min",
		"yusys": "yusys",
		"login" : "../js/login"   
    },
    // 第三方模块
    shim: {
		"yusys" : {
		    deps : ['jquery']
		},
        "login" : {
            deps : ['jquery', 'yusys']
        }
    }
})
require(["jquery", "yusys", "../demo/count-down/countdown"], function ($, yusys, CountDown) {
  // do something
	// login.init()
	const countdown = new CountDown()
	countdown.play()
})