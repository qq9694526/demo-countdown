// 常用Ajax请求
var url = '/data.php';
var params = [
    'id=9798',
    'limit=20'
];
var req = new XMLHttpRequest(); // 创建一个http请求对象
req.onreadystatechange = function() {
    if (req.readyState === 4) {
        //获取响应的头信息
        var responseHeaders = req.getAllResponseHeaders();
        //获取数据
        var data = req.responseText;
        //数据处理
    }
}
req.open('GET', url + '?' + params.join('&'), true);
//设置请求头信息
req.setRequestHeader('X-Request-With', 'XMLHttpRequest')；
req.send(null); //发送一个请求

// 动态脚本注入
var scriptElement=document.createElement('script');
scriptElement.src='http://any-domain.com/javascript/lib.js';
document.getElementByTagName('head')[0].appendChild(scriptElement);
 
function jsonCallback(jsonString){
    var data=eval('('+jsonString+')');
    //处理数据...
}

// lib.js
jsonCallback({"status":1,"color":["#fff","#000","f00"]});

// 图片信标
var url='/status_tracker.php';
var params=[
'step=2',
'time=123241223'
];
(new Image()).src=url+'?'+params.join('&');

// js封装ajax
define(function () {】
    return { 
        ajax: function (option) {
        
        }
    }
});

// 完整的js封装ajax
var ajax = function (option) {
    // 创建一个 XMLHttpRequest 对象
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"),
        requestData = option.data,
        requestUrl = option.url,
        requestMethod = option.method;
    // 如果是GET请求，需要将option中的参数拼接到URL后面
    if ('POST' != requestMethod && requestData) {
        var query_string = '';
        // 遍历option.data对象，构建GET查询参数
        for(var item in requestData) {
        query_string += item + '=' + requestData[item] + '&';
        }
        // 注意这儿拼接的时候，需要判断是否已经有 ?
        requestUrl.indexOf('?') > -1
        ? requestUrl = requestUrl + '&' + query_string
        : requestUrl = requestUrl + '?' + query_string;
        // GET 请求参数放在URL中，将requestData置为空
        requestData = null;
    }
    // ajax 请求成功之后的回调函数
    xhr.onreadystatechange = function () {
        // readyState=4表示接受响应完毕
        if (xhr.readyState == ("number" == typeof XMLHttpRequest.DONE ? XMLHttpRequest.DONE : 4)) {
        if (200 == xhr.status) { // 判断状态码
            var response = xhr.response || xhr.responseText || {}; // 获取返回值
            // if define success callback, call it, if response is string, convert it to json objcet
            console.log(response);
            option.success && option.success(response); // 调用回调函数处理返回数据
            // 可以判断返回数据类型，对数据进行JSON解析或者XML解析
            // option.success && option.success('string' == typeof response ? JSON.parse(response) : response);
        } else {
            // if define error callback, call it
            option.error && option.error(xhr, xhr.statusText);
        }
        }
    };
    // 发送ajax请求
    xhr.open(requestMethod, requestUrl, true);
    // 请求超时的回调
    xhr.ontimeout = function () {
        option.timeout && option.timeout(xhr, xhr.statusText);
    };
    // 定义超时时间
    xhr.timeout = option.timeout || 0;
    // 设置响应头部，这儿默认设置为json格式，可以定义为其他格式，修改头部即可
    xhr.setRequestHeader && xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.withCredentials = (option.xhrFields || {}).withCredentials;
    // 这儿主要用于发送POST请求的数据
    xhr.send(requestData);
}

// 调用方法
ajax({
    url: '/api.do',
    data: {
        name: 'uusama',
        desc: 'smart'
    },
    method: 'GET',
    success: function(ret) {
        console.log(ret);
    }
});

// js封装jquer中的ajax
define(['jquery']
    function ($) {
        return { 
            $ajax: function (option) {
            
            }
        }
});

// jquery中的Ajax二次封装
var $ajax = function (opts, callback) {
    var options = {
        url: '',
        cache: false,
        timeout:10000,
        method: 'post',
        dataType: 'json',
        async: true,
        data: {}
    }

    //没有参数传入，直接返回默认参数
	if(!opts) return options;
	//有参数传入，通过key将options的值更新为用户的值
	for(var key in opts) {
		options[key] = opts[key];
	}

    $.ajax({
        url: options.url,
        dataType: options.dataType,
        cache: options.cache,
        async: options.async,
        type: options.method,
        data: options.data,
        timeout: options.timeout,
        success:function(res){
            callback(res);
        },
        error:function(res){
            console.error(res)
        }
    });
}

// 调用
var opts = {
    urls:'/api.do',
    data: {}
};
$ajax(opts,function(data){
    //执行操作
    console.log('success')
})

// 进度条动画 准备工作
// css代码
.box{
    background-color: lightblue;
    height: 20px;
    line-height: 20px;
    box-sizing: border-box;
}

// Html代码
<div class="box" style="width:0">0%</div>
<button id="btn">load</button>

// Js代码
var btn=document.getElementById('btn');
var div=document.getElementsByClassName('box')[0];

btn.addEventListener('click',function(){
    //load1();
    //load2();
    //load3();
});

// setTimeout方法
function load1(){
    div.style.width=parseInt(div.style.width)+5+'px';
    div.innerHTML=parseInt(div.style.width)/5+'%'
    if(parseInt(div.style.width)<500){
        var c=setTimeout(function(){
            load1();
        },16);
    }else{
        clearTimeout(c);
    }
}

// setInterval
function load2(){
    div.style.width=parseInt(div.style.width)+5+'px';
    div.innerHTML=parseInt(div.style.width)/5+'%';
    var c=setInterval(function(){
        if (parseInt(div.style.width)<500) {
            load2();
        }else {
            clearInterval(c);
        }

    },16);
}
// 注意setTimeout和setInterval的区别，两种方法的if分别在不同的地方控制。

// requestAnimationFrame
function load3(){
    div.style.width=parseInt(div.style.width)+5+'px';
    div.innerHTML=parseInt(div.style.width)/5+'%';
    if(parseInt(div.style.width)<500){
        var c=requestAnimationFrame(load3);
    }else {
        cancelAnimationFrame(c);
    }
}

// css 动画 @keyframes规则
@keyframes myfirst
{
from {background: red;}
to {background: yellow;}
}

// 绑定动画到标签元素
div
{
animation: myfirst 5s;
-moz-animation: myfirst 5s;	/* Firefox */
-webkit-animation: myfirst 5s;	/* Safari 和 Chrome */
-o-animation: myfirst 5s;	/* Opera */
}

// css 动画 transition&transform
#div1 {
    float: left;
    height: 100px;
    width: 100px;
    background-color: red;
}

/* transition 实现多个属性 */
#div1:active {
    width: 200px;
    height: 200px;
    transition: width 2s ease, height 2s ease;
    -moz-transition: width 2s ease, height 2s ease;
    /* Firefox 4 */
    -webkit-transition: width 2s ease, height 2s ease;
    /* Safari 和 Chrome */
    -o-transition: width 2s ease, height 2s ease;
    /* Opera */
}

#div2 {
    float: left;
    height: 100px;
    width: 100px;
    background-color: green;
}

/* transform 旋转 rotate */
#div2:hover {
    transform: rotate(35deg);
    -ms-transform: rotate(35deg);
    /* IE 9 */
    -moz-transform: rotate(35deg);
    /* Firefox */
    -webkit-transform: rotate(35deg);
    /* Safari 和 Chrome */
    -o-transform: rotate(35deg);
    /* Opera */
}

#div3 {
    float: left;
    height: 100px;
    width: 100px;
    background-color: blue;
}

/* transform 缩放 scale */
#div3:hover {
    transform: scale(0.8, 1.5);
    -ms-transform: scale(0.8, 1.5);
    /* IE 9 */
    -moz-transform: scale(0.8, 1.5);
    /* Firefox */
    -webkit-transform: scale(0.8, 1.5);
    /* Safari 和 Chrome */
    -o-transform: scale(0.8, 1.5);
    /* Opera */
}

#div4 {
    float: left;
    height: 100px;
    width: 100px;
    background-color: #234F21;
}

/* transform 倾斜 skew */
#div4:hover {
    transform: skew(35deg);
    -ms-transform: skew(35deg);
    /* IE 9 */
    -moz-transform: skew(35deg);
    /* Firefox */
    -webkit-transform: skew(35deg);
    /* Safari 和 Chrome */
    -o-transform: skew(35deg);
    /* Opera */
}

#div5 {
    float: left;
    height: 100px;
    width: 100px;
    background-color: #af123c;
}

/* transform 移动 translate */
#div5:hover {
    transform: translate(45px, 45px);
    -ms-transform: translate(45px, 45px);
    /* IE 9 */
    -moz-transform: translate(45px, 45px);
    /* Firefox */
    -webkit-transform: translate(45px, 45px);
    /* Safari 和 Chrome */
    -o-transform: translate(45px, 45px);
    /* Opera */
}

#div6 {
    float: left;
    height: 100px;
    width: 100px;
    background-color: #affa3c;
}

/* transform 多个效果 */
#div6:hover {
    transform: rotate(35deg) scale(0.8, 1.5) skew(35deg) translate(45px, 45px);
    -ms-transform: rotate(35deg) scale(0.8, 1.5) skew(35deg) translate(45px, 45px);
    /* IE 9 */
    -moz-transform: rotate(35deg) scale(0.8, rotate(35deg) scale(0.8, 1.5) skew(35deg) translate(45px, 45px)translate(45px, 45px);
    /* Safari 和 Chrome */
    -o-transform: rotate(35deg) scale(0.8, 1.5) skew(35deg) translate(45px, 45px);
    /* Opera */
}

/* animation */
.div7 {
    width: 100px;
    height: 100px;
    background: red;
    position: relative;
    animation: myfirst 5s infinite;
    animation-direction: alternate;
    /* Safari and Chrome */
    -webkit-animation: myfirst 5s infinite;
    -webkit-animation-direction: alternate;
}

@keyframes myfirst {
    0% {
        background: red;
        left: 0px;
        top: 0px;
    }
    25% {
        background: yellow;
        left: 200px;
        top: 0px;
    }
    50% {
        background: blue;
        left: 200px;
        top: 200px;
    }
    75% {
        background: green;
        left: 0px;
        top: 200px;
    }
    100% {
        background: red;
        left: 0px;
        top: 0px;
    }
}

// 立即执行函数
;(function($) {
    $.fn.numberAnimate = function(setting) {
        // 代码逻辑
    }
})(jQuery);

// 调用
$(function(){
    //初始化
    var numRun = $(".numberRun").numberAnimate({initNum:'0.00', num:'18.10', speed:1000, symbol:","})
    var nums = 200.10;
});

// 引入 echart
<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
<div id="main" style="width: 600px;height:400px;"></div>
<script type="text/javascript">
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>

// 按需引用
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
});

// 折线图
var myChartArr = []; //图表对象

//生成图表
function setChart(chart, id, date, unit) {
    // 路径配置
    // 引入 ECharts 主模块
    var echarts = require('echarts/lib/echarts');
    // 引入柱状图
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    var myChart = echarts.init(document.getElementById(id));
    chart.chart = myChart;
    option = {
        grid: {
            'x': 40,
            'y': 5,
            'x2': 10,
            'y2': 20
        },
        xAxis: [{
            type: 'category',
            //data : ['1','2','3','4','5','6','7']
            axisLabel: {
                'interval': 0,
                'textStyle': {
                    'fontSize': 6
                }
            },
            data: (function() {
                var data = date;
                return data;
            })()
        }],
        calculable: false,
        yAxis: [{
            type: 'value',
            scale: true,
            boundaryGap: [0.1, 0.1]
        }],
        series: [{
            name: '7日年化收益',
            type: 'line',
            data: (function() {
                var data = unit;
                return data;
            })()
        }]
    };
    myChart.setOption(option, true);
    //onreisze
    $(window).on('resize', function() {

        myChart.resize();

    });
}

// 业务逻辑
//列表拼接数据
function getList(data) {
    if (!isNulOrEmpty(data.content)) {
        var list = data.content.resultList;
        var weekList;
        var signFlag;
        var tr = '';
        myChartArr = [];

        $('#SalaryList').show();
        $('#nothingSalaryList').hide();

        $(list).each(function(i) {
            signFlag = list[i].signFlag;
            weekList = list[i].weekInfoList;
            tr += '<li class="row" ' + 'prdCode="' + list[i].prdCode + '" ' + 'prdName="' + list[i].prdName + '"' + 'fundStnm="' + list[i].fundStnm + '" ';
            tr += 'prdCmy="' + list[i].prdCmy + '" ' + 'incomeUnit="' + list[i].incomeUnit + '" ' + 'incomeRate="' + list[i].incomeRate + '" ' + '>';
            tr += '<div class="col-sm-12 col-md-1 clearfix"><div class="f_badge"><span class="badge">' + (i + 1) + '</span></div></div>';
            tr += '<div class="col-sm-12 col-md-3 clearfix"><dl class="f_salary_num"><dt><span><em>' + list[i].incomeRate + '</em>%</span></dt><dd>7日年化收益率</dd></dl>';
            tr += '<dl class="f_salary_num"><dt><span class="padding_t10">' + list[i].incomeUnit + '元</span></dt><dd>万份收益</dd></dl></div>';
            
            //显示是否已签约
            if(isNulOrEmpty(list[i].sgnStt)){
                tr += '<div class="col-sm-12 col-md-2 f_salary_tit"><span>' + list[i].prdName + '</span></div>';
            }else{
                if(list[i].sgnStt=="1"){
                    tr += '<div class="col-sm-12 col-md-2 f_salary_tit"><span>' + list[i].prdName + '</span><p class="salary_sign_p"><i class="salary_sign">已签约</i></div>';
                }else if (list[i].sgnStt=="0"){
                    tr += '<div class="col-sm-12 col-md-2 f_salary_tit"><span>' + list[i].prdName + '</span><p class="salary_sign_p"><i class="salary_nosign">未签约</i><p></div>';
                }					
            }		
            
            tr += '<div class="col-sm-12 col-md-3"><div class="f_chart" id="myChart' + i + '" ></div></div>';
            var id = i;
            myChartArr.push({
                id: 'myChart' + i
            }); //图表id
            myChartArr[id].dataDate = []; //最近7日
            myChartArr[id].weenkIncomeUnit = []; //最近7日年化收益
            $(weekList).each(function(j) {
                var weenkDate = weekList[j].dataDate;
                var month = weenkDate.split('-')[1];
                var dateD = weenkDate.split('-')[2];
                if (month.indexOf('0') == 0) {
                    month = month.substring(month.indexOf('0') + 1, 2);
                }
                if (dateD.indexOf('0') == 0) {
                    dateD = dateD.substring(dateD.indexOf('0') + 1, 2);
                }
                weenkDate = month + '-' + dateD;

                myChartArr[id].dataDate.push(weenkDate);
                myChartArr[id].weenkIncomeUnit.push(weekList[j].weenkIncomeUnit);
            });

            tr += '<div class="col-xs-6 col-md-2"><div class="f_btnlink">';
            if (signFlag == "1") {
                tr += '<button type="button" class="btn btn-red salaryBuyBtn">购买</button>';
            } else if (signFlag == "0") {

            } else {
                tr += '<button type="button" class="btn btn-red salaryBuyBtn">购买</button>';
            }

            tr += '</div></div><div class="col-xs-6 col-md-1"><div class="f_atten"><p class="f_heart">';
            //关注 判断此产品是否关注
            var isFocus = "";
            if (list[i].isFocus == "1") {
                isFocus = "f_active";
            }
            tr += '<a href="javascript:;" class="focusProd ' + isFocus + '" nhf-prodNo="' + list[i].prdCode + '" nhf-name="' + list[i].prdName + '" nhf-flag="' + list[i].isFocus + '"><span class="glyphicon glyphicon-heart"></span> <span class="f_payatten">关注</span></a>';
            tr += '</p></div></div></li>';
        });
        //处理列表加载方式
        if (isMobile()) {
            $('#dataList').append(tr);
        } else {
            $('#dataList').html(tr);
        }
        //绑定关注事件
        $(".focusProd").on("click", function() {
            focusProd($(this), "03");
        });
        //生成图表
        $(myChartArr).each(function(i) {
            setChart(myChartArr[i], myChartArr[i].id, myChartArr[i].dataDate, myChartArr[i].weenkIncomeUnit);
        });

        //拼接数据后重新绑定事件
        $('.salaryBuyBtn').on('click', function() {
            var param = getSalaryParam($(this).parents('li'));
            checkSalaryBuy(param);
        });
    } else {
        $('#SalaryList').hide();
        $('#nothingSalaryList').show();
    }
}

// 启动调用
$(function() {
    /*
     * 列表+分页
     * 参数 ajax地址，上送参数，第几页，表格id，表格拼装函数名,分页id
     */
    
    $('#dataList').empty();

    var param = {
        "pageSize": "10"
    };

    $.citic.pageList.getTableList($.citic.doUrl.SALARY_POT_LIST, param, '', 'dataList', getList, 'pageDiv');
});

// 技术组件开发-实例
define(['jquery','bootstrap','popups','json!./i18n/'+(window.localStorage.getItem('lang_type')||'cn')+'.json'],
  function($,el,popups,lang){		
	
	/*
	 * orderNo:制单号/批次号
	 * popup:弹窗模式，默认是false，如果使用弹窗模式，需要绑定到一个按钮上，同时指定qryType的下载类型。
	 * qryType:下载类型,0-全部下载，1-错误下载，弹窗模式时需要指定一个。
	 * fileType:下载文件类型，0-全部（异步下载），1-excel文件，2-txt文件
	 * sync: S同步，A异步
	 * showAllDown:是否显示全部下载，true-是，false-否
	 * showFailDown:是否显示失败下载，true-是，false-否
	 * allTotal:全部记录数，浮层模式中，若不设置，则浮层中不显示总笔数
	 * failTotal:失败记录数，浮层模式中，若不设置，则浮层中不显示总笔数
	 * ajaxdata:交易请求的上送参数，交易请求的参数如果过多可以直接给一个json对象。
	 * txtDown:是否显示txt下载链接。不设置时，默认显示。 true-是，false-否
	 * pdfDown:是否将txt下载显示为PDF下载，默认是false。 true-是,false-否
	 */
	function FileDownload(selector,options){
		this.options = {			
			popup:false,
			qryType:'',			
			txCode:'',
			orderNo:'',				
			template:'',
			showFailDown:'',
			allTotal:'',
			sync:'',
			showAllDown:'',
			failTotal:'',
			ajaxdata:null,
			txtDown:true,
			pdfDown:false,
			noTypeSelectPop:false,
			zIndex:''
		};
		
		this.waitDownLoadIntervalId = null;
		//执行倒计时
		this.waitTime = 30;
		
		this.selector = selector || '';
		
		this.allToggleDom$ = null;
		
		//多语言对象
		this.lang=lang;
		
		for ( var i in options ) {
			this.options[i] = options[i];
		}	
		
		this._init(selector,this.options);
		this.options.ajaxdata=null;
	}
	
	FileDownload.prototype={	
		
		constructor:FileDownload,		
		
		popupTemplate:function(selector,option){
			//弹窗模板		
				
			
		},		
		htmlTemplate:function(selector,option){
			//模板
			/*
			 * selector:dom对象
			 * qryType:下载类型,0-全部下载，1-错误下载，必输
			 * fileType:下载文件类型，0-全部（异步下载），1-excel文件，2-txt文件
			 * sync: S同步，A异步
			 * showAllDown:是否显示全部下载，true-是，false-否
			 * showFailDown:是否显示失败下载，true-是，false-否
			 * allTotal:全部记录数，浮层模式中，若不设置，则浮层中不显示总笔数
	 		 * failTotal:失败记录数，浮层模式中，若不设置，则浮层中不显示总笔数
			*/
			var lang_filter=lang;				
			var _selectorId=String(selector).replace(/\#/g,'');
			var _htmlTemplate='';
				_htmlTemplate='<a id="'+ _selectorId +'-all-toggle" class="btn btn-primary droparea-toggle">'
								+ lang_filter.p00096	
								+ '</a>';
			if(option.showFailDown){
				 _htmlTemplate += '<a id="'+ _selectorId +'-fail-toggle" class="btn btn-primary droparea-toggle" style="cursor:pointer">'
								+ lang_filter.p00102
								+ '</a>';
			}	
				 _htmlTemplate +='<div id="' + _selectorId + '-filemenu" class="droparea-menu filedown-menu" role="menu">'
				 				+'<div class="panel panel-d front">'
				 				+'<div class="panel-heading">'
				 				+'<span id="'+ _selectorId +'-total-title">'+lang_filter.p00103 + '<span id="' + _selectorId + '-s-total"></span>'+lang_filter.p00104+'</span>'
				 				+'</div>'
				 				+'<div class="panel-body">'
				 				+'<div class="btns clearfix">'
				 				+'<div class="left">'
				 				+'<div class="right">'
				 				+'<ul class="btns-item">'
				 				+'<li>'
								+'<a id="' + _selectorId + '-exc-download" class="btn btn-link exc" style="cursor:pointer">'+ lang_filter.p00105 +'</a>'
				 				+'</li>'
				 				+'<li>'
			if(option.txtDown){
				if(option.pdfDown){
					 _htmlTemplate +='<a id="' + _selectorId + '-txt-download" class="btn btn-link txt" style="cursor:pointer">'+lang_filter.p00822+'</a>';
				}else{
					 _htmlTemplate +='<a id="' + _selectorId + '-txt-download" class="btn btn-link txt" style="cursor:pointer">'+lang_filter.p00106+'</a>';
				}
				
			}
				 				
				 _htmlTemplate +='</li>'
				 				+'</ul>'
				 				+'</div>'								
								+'</div>'
								+'</div>'
								+'</div>'
								+'<div class="btns clearfix">'
								+'<div class="left">'
								+'<div class="right">'
								+'<ul class="btns-item">'
								+'<li>'
								+'<button id="' + _selectorId +'-btn-cancle" class="btn droparea-dismiss" type="button">'+ lang_filter.p00071 +'</button>' //取消
								+'</li>'
								+'</ul>'
								+'</div>'
								+'</div>'
								+'</div>'
								+'</div>'
								+'<div class="panel panel-d reverse">'
								+'<div class="panel-heading">'
								+'<span id="'+ _selectorId +'-total-title">'+lang_filter.p00103+'<span id="' + _selectorId + '-a-total" class="w_sucTotalNum"></span>'+lang_filter.p00104+'</span>'
								+'</div>'
								+'<div class="panel-body">'
								+'<p id="' + _selectorId + '-sync-normal">'+ lang_filter.p00107 +'<span class="text-gold"></span></p>'
								+'<p id="' + _selectorId + '-sync-result" style="display:none" >'+ lang_filter.p00108 +'<span id="' + _selectorId + '-taskNo" class="text-gold"></span>'+ lang_filter.p00109 +'</p>'
								+'</div>'
								+'<div class="btns clearfix">'
								+'<div class="left">'
								+'<div class="right">'
								+'<ul class="btns-item">'
								+'<li>'
								+'<button id="' + _selectorId + '-sync-download" class="btn btn-primary droparea-submit" type="button">'+ lang_filter.p00111 +'</button>'
								+'</li>'
								+'<li>'
								+'<button id="' + _selectorId +'-sync-cancle" class="btn btn-default droparea-dismiss" type="button">'+ lang_filter.p00071 +'</button>'
								+'</li>'
								+'</ul>'
								+'</div>'
								+'</div>'
								+'</div>'
								+'</div>'
								+'</div>'					
								+'<div id="filePopMask" style="display:none;width:600px;height:400px;overflow:hidden;position:absolute;z-index:0;top:0px;left:0px;"></div>';
			return _htmlTemplate;
		},
		downloadFile:function(filepath){
			var lang_filter=lang;
			if (filepath) {
				window.location.href =fileDownURL + filepath;
				placeholderOlderIE();
			} else {
				alert(lang_filter.p00112);
			}
		},
		downloadAjax:function(selector,option){
			var _this=this;
			var _fileType=_this.fileType;
			main.ajax(
//			'app/json/recemanage/agency/download.json',	//本地模拟报文配置，测试和生产环境请注释
//			'get',	//本地模拟报文配置，测试和生产环境请注释
			commonUrl,	//测试生产地址时,请打开
			'post',		//测试生产地址时，请打开
			function(result) {
				var retExcelFilePath;
				var retTxtFilePath;
				if (result.retCode == "AAAAAAA") {
					
					/* 本地报文模拟sync和taskNo参数，
					 * 测试和生产环境请注释掉本段代码				 * 
					 */
//					if(_this.options.sync=="A"){
//						result.taskNo='12312';	
//					}			
					
					//处理结果
					if (result.taskNo) {//taskNo大文件下载号
						if(_this.options.sync=="S"){//同步下载
							$(".droparea-menu .front").hide();
							$(".droparea-menu .reverse").show();							
						}else{//异步下载	
							if(_this.options.popup){
								$(selector+' .popDownloadBtn-sync','bodyBontainer').hide();
								$(selector+' .popDownloadSync-normal','bodyBontainer').hide();
								$(selector+' .popDownloadSync-result','bodyBontainer').show();
								$(selector+' .syncTaskId','bodyBontainer').text(result.taskNo);
							}else{	
								$(selector+'-sync-normal','bodyBontainer').hide();
								$(selector+'-sync-result','bodyBontainer').show();
								$(selector+'-taskNo','bodyBontainer').text(result.taskNo);
								$(selector+'-sync-download','bodyBontainer').hide();							
							}
							$(selector+'-filemenu').show();	
						}
					}else{						
						retExcelFilePath=result.retExcelFilePath;
						retTxtFilePath=result.retTxtFilePath;
						
						if(_this.options.fileType=='1'){
							_this.addHref(selector+'-exc-download',{
								filePath:retExcelFilePath
							});
							_this.downloadFile(retExcelFilePath);
							
						}else if(_this.options.fileType=='2'){
							_this.addHref(selector+'-txt-download',{
								filePath:retTxtFilePath
							});
							_this.downloadFile(retTxtFilePath);
						}else{
							if(result.retOtherFilePath){
								_this.downloadFile(result.retOtherFilePath);
							}
						}
						
					}					
				}
				
			},JSON.stringify(option)
			);
			//隐藏下载框
			$(selector+'-filemenu').hide();	
			$('#filePopMask').hide();
			waitDownloadTime.call(this);
			
			
			
		},
		bindEvent:function(selector,option){
			//全部下载		
			var _this=this;
			
			$('#filePopMask').on('click',function(){
				$(selector+'-filemenu').hide();
				$('#filePopMask').hide();
			});
			$(selector+'-btn-cancle').on('click',function(){
				$(selector+'-filemenu').hide();	
				$('#filePopMask').hide();
			});		
			$(selector+'-sync-cancle').on('click',function(){
				$(selector+'-filemenu').hide();	
				$('#filePopMask').hide();
			});
			if(this.allToggleDom$){
				this.allToggleDom$.on('click',function(){	
					if($(this).hasClass('disabled')){
						$(selector+'-filemenu').hide();
						return;
					}
					$(selector+'-filemenu').attr('qryType','0');
					_this.options.qryType=$(selector+'-filemenu').attr('qryType');
					
					//写入值
					if(_this.options.allTotal!=''){
						$(selector+'-total-title').show();
						$(selector+'-s-total').text(option.allTotal);
						$(selector+'-a-total').text(option.allTotal);
					}
					else{
						$(selector+'-total-title').hide();
					}
									
					if(_this.options.qryType=='0' || _this.options.qryType==""){
						if(option.sync == 'N' || (option.noTypeSelectPop && option.sync == 'S')){
							$(selector+'-filemenu').hide();
							$('#filePopMask').hide();
						}else{
							$(selector+'-filemenu').toggle();
							$('#filePopMask').toggle();
						}
					}
					
					//if展示同步下载弹出框，else展示异步下载弹出框
					switch(option.sync){
						case 'S':
							if(option.noTypeSelectPop){
	//							$(selector).find(".droparea-menu .front").hide();
	//							$(selector).find(".droparea-menu .reverse").hide();
								//执行下载逻辑
								_this.downloadAjax(selector,option);
							}else{
								$(selector).find(".droparea-menu .front").show();
								$(selector).find(".droparea-menu .reverse").hide();
							}
							break;
						case 'A':
							$(selector+'-sync-normal').show();
							$(selector+'-sync-result').hide();
							$(selector+'-taskNo').text('');
							$(selector+'-sync-download').show();
							$(selector).find(".droparea-menu .front").hide();
							$(selector).find(".droparea-menu .reverse").show();
							break;
						case 'N':
							showTopInfoPop('下载数量过大，请缩小查询范围');
							break;
						default:
							break;
					}			
				});
			}
			
			
			//失败下载
			$(selector+'-fail-toggle').on('click',function(){	
				$(selector+'-filemenu').attr('qryType','1');
				_this.options.qryType=$(selector+'-filemenu').attr('qryType');				
				
				if(_this.options.qryType=='1' || _this.options.qryType==""){
					$(selector+'-filemenu').toggle();	
					$('#filePopMask').toggle();
				}
				
				//写入值
				if(_this.options.allTotal!=''){
					$(selector+'-total-title').show();
					$(selector+'-s-total').text(option.failTotal);
					$(selector+'-a-total').text(option.failTotal);
				}else{
					$(selector+'-total-title').hide();
				}
				
				
				//if展示同步下载弹出框，else展示异步下载弹出框
				if (option.sync == "S") {
					$(selector).find(".droparea-menu .front").show();
					$(selector).find(".droparea-menu .reverse").hide();
				} else if(option.sync=="A") {
					$(selector+'-sync-normal').show();
					$(selector+'-sync-result').hide();
					$(selector+'-taskNo').text('');
					$(selector+'-sync-download').show();
					$(selector).find(".droparea-menu .front").hide();
					$(selector).find(".droparea-menu .reverse").show();
				}			
			});
			
			//exc下载0-全部（异步下载），1-excel文件，2-txt文件
			$(selector+'-exc-download').off().on('click',function(){				
				_this.options.fileType='1';	
				_this.downloadAjax(selector,_this.options);
			});
			//txt下载0-全部（异步下载），1-excel文件，2-txt文件
			$(selector+'-txt-download').off().on('click',function(){
				_this.options.fileType='2';	
				_this.downloadAjax(selector,_this.options);
			});			
			//异步下载
			$(selector+'-sync-download').off().on('click',function(){
				_this.options.fileType='0';	
				_this.downloadAjax(selector,_this.options);
			});	
			
		},		
		popupEvent:function(selector,option){
			var _this=this;
			var _selector=selector;
			//exc下载0-全部（异步下载），1-excel文件，2-txt文件
			$(_selector,'bodyBontainer').find('.popDownloadBtn-exc').off().on('click',function(){		
				_this.options.fileType='1';	
				_this.downloadAjax(selector,_this.options);
			});
			//txt下载0-全部（异步下载），1-excel文件，2-txt文件
			$(_selector,'bodyBontainer').find('.popDownloadBtn-txt').off().on('click',function(){
				_this.options.fileType='2';	
				_this.downloadAjax(selector,_this.options);
			});			
			//异步下载
			$(_selector,'bodyBontainer').find('.popDownloadBtn-sync').off().on('click',function(){
				_this.options.fileType='0';	
				_this.downloadAjax(selector,_this.options);
			});	
		},
		popupBind:function(selector, option,lang){
			//弹窗模式
			var _selectorId=selector.replace(/\#/g,'');
			var _this=this;
			var lang_filter=_this.lang;
			var thatPopups=popups.popup({
				id:_selectorId,
			  	title:lang_filter.p00113,
			  	url:'app/templates/public/popDownloadTpl.html',
			  	isFooter:true,
			  	'zIndex':option.zIndex,
			  	complete:function(e){				  		
			  		//多语言处理
			  		$(selector+'-show','bodyBontainer').find('.popDownloadBtn-sync').text(lang_filter.p00107);
			  		$(selector+'-show','bodyBontainer').find('.popDownloadBtn-sync').text(lang_filter.p00111);
			  		$(selector+'-show','bodyBontainer').find('.popDownloadBtn-exc').text(lang_filter.p00105);
			  		
			  		if(_this.options.pdfDown){
			  			$(selector+'-show','bodyBontainer').find('.popDownloadBtn-txt').text(lang_filter.p00822);
			  		}else{
			  			$(selector+'-show','bodyBontainer').find('.popDownloadBtn-txt').text(lang_filter.p00106);
			  		}
			  		
			  		$(selector+'-show','bodyBontainer').find('.fileDownBtnCancel').text(lang_filter.p00071);
			  		$(selector+'-show','bodyBontainer').find('.fileDownBigDownTip').text(lang_filter.p00110);
			  		$(selector+'-show','bodyBontainer').find('.fileDownAppId').text(lang_filter.p00108);
			  		$(selector+'-show','bodyBontainer').find('.popDownload-text').html(lang_filter.p00114+'<span class="ec-jine-scc popDownloadTxt-total"></span>');
			  		
			  		if(_this.options.txtDown){
			  			$(selector+'-show','bodyBontainer').find('.popDownloadBtn-txt').show();
			  		}else{
			  			$(selector+'-show','bodyBontainer').find('.popDownloadBtn-txt').hide();
			  		}
			  		
			  		if(_this.options.sync=="S"){
			  			$(selector+'-show','bodyBontainer').find('.popDownloadSync-content').hide();
			  			$(selector+'-show','bodyBontainer').find('.popDownloadBtn').show();
			  			$(selector+'-show','bodyBontainer').find('.popDownloadSyncBtn').hide();
			  		}else if(_this.options.sync=="A"){
			  			$(selector+'-show','bodyBontainer').find('.popDownloadSync-content').show();
			  			$(selector+'-show','bodyBontainer').find('.popDownloadBtn').hide();
			  			$(selector+'-show','bodyBontainer').find('.popDownloadSyncBtn').show();			
			  		}		  		

			  		if(_this.options.qryType=='0'){
		  				$(selector+'-show','bodyBontainer').find('.popDownloadTxt-total').text(_this.options.allTotal);
			  		}else{
			  			$(selector+'-show','bodyBontainer').find('.popDownloadTxt-total').text(_this.options.failTotal);
			  		}	
			  		$(selector + '-show','bodyBontainer').find('.btn_gb').on('click', function() {
			  			$(selector + '-show','bodyBontainer').modal('hide');
			  		});			
			  		_this.popupEvent(selector+'-show',this.options);
			  	},
			  	befor:function(){				  		
			  		$(selector+'-show','bodyBontainer').find('.popDownloadBtn-sync').show();
					$(selector+'-show','bodyBontainer').find('.popDownloadSync-normal').show();
					$(selector+'-show','bodyBontainer').find('.popDownloadSync-result').hide();
					$(selector+'-show','bodyBontainer').find('.syncTaskId').text('');
					
					if(_this.options.txtDown){
			  			$(selector+'-show','bodyBontainer').find('.popDownloadBtn-txt').show();
			  		}else{
			  			$(selector+'-show','bodyBontainer').find('.popDownloadBtn-txt').hide();
			  		}
					
					if(_this.options.qryType=='0'){
		  				$(selector+'-show','bodyBontainer').find('.popDownloadTxt-total').text(_this.options.allTotal);
			  		}else{
			  			$(selector+'-show','bodyBontainer').find('.popDownloadTxt-total').text(_this.options.failTotal);
			  		}
					
　　				},
			  	submits:function(){
			  		//alert('提交回调')
				},
	 			cancle:function(){
					//alert('取消回调')
				}
			});	
			if($(selector).length > 0){
				$(selector).on('click',function(){
					thatPopups.show();
				})
			}else{
				$(selector,'bodyBontainer').on('click',function(){
					thatPopups.show();
				})
			}
			
			
		},			
		addHref:function(selector, option){
			//单个元素增加下载地址
			/*
			 * fileDownURL:文件下载域名及接口名
			 * filePath:文件路径及文件名
			 */
			var that = this;
			var _option = {};
			var lang_filter=lang;
			$.extend(_option, {
				fileDownURL:fileDownURL,
				filePath:''
			},option);				
			$(selector).attr("down-href", _option.fileDownURL+_option.filePath);
//			$(selector).off().on('click',function(){				
//				var _filePath=$(this).attr('down-href');
//				if (_option.filePath) {
//					window.location.href = $(selector).attr("down-href");
//					placeholderOlderIE();
//					//加入倒计时
//					waitDownloadTime.call(that);
//				} else {
//					alert(lang_filter.p00112);
//				}
//			});
			
		},		
		_init:function(selector, option){
			//初始化下载
			var _this=this;
			var lang_filter=_this.lang;
			
			$.extend(_this.options,option.ajaxdata);	

			//写入模板
			if(!this.options.popup){
				$(selector).html('');			
				$(selector).append(this.options.template || this.htmlTemplate(selector,this.options));	
				
				this.allToggleDom$ = $(selector+"-all-toggle");
				
				this.bindEvent(selector,this.options);
			}else{
				//弹窗模式
				this.popupBind(selector,this.options,lang_filter);
			}
			if(this.options.allTotal == '0' || this.waitDownLoadIntervalId){
				if(this.waitDownLoadIntervalId){
					clearInterval(this.waitDownLoadIntervalId);
					this.waitDownLoadIntervalId = null;
					if(this.waitTime > 0 &&　this.waitTime　< 30){
						waitDownloadTime.call(this);
					}
				}
				if(this.allToggleDom$){
					this.allToggleDom$.addClass("disabled").attr('disabled','disabled').css('cursor','not-allowed');
				}
				
			}
		}
	};
	
	function waitDownloadTime(){
		if(!this.allToggleDom$){
			return;
		}
		var selector = this.selector;
		var that = this;
		this.allToggleDom$.addClass("disabled").attr('disabled','disabled').text(lang.p05597+'('+that.waitTime+'s)').css('cursor','not-allowed');
		that.waitDownLoadIntervalId = setInterval(function(){
			that.waitTime--;
			if(that.waitTime <　1){
				clearInterval(that.waitDownLoadIntervalId);
				that.waitDownLoadIntervalId = null;
				that.waitTime = 30;
				that.allToggleDom$.text(lang.p00096);
				if(that.options){
					if(that.options.allTotal == '0'){
						return;
					}
				}
				that.allToggleDom$.removeClass("disabled").removeAttr('disabled').css('cursor','pointer');
				
			}else{
				that.allToggleDom$.text(lang.p05597+'('+that.waitTime+'s)');
			}
		},1000)
	}
	
	return FileDownload;

});