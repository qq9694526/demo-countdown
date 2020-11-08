// define方法，定义模块
// 定义独立模块，method1，method2
define(function () {
	return {
	    method1: function() {},
		method2: function() {},
    };
});

// 非独立模块
// 如果被定义的模块需要依赖其他模块，则define方法必须采用下面的格式。
define(['module1', 'module2'], function(m1, m2) {
    return {
        method: function() {
            m1.methodA();
			m2.methodB();
        }
    };
});

// 繁琐的依赖和模块关系
define(
    ['dep1', 'dep2', 'dep3', 'dep4', 'dep5', 'dep6', 'dep7', 'dep8'],
    function(dep1,   dep2,   dep3,   dep4,   dep5,   dep6,   dep7,   dep8){
        ...
    }
);

// 简化的写法
define(
    function (require) {
        var dep1 = require('dep1'),
            dep2 = require('dep2'),
            dep3 = require('dep3'),
            dep4 = require('dep4'),
            dep5 = require('dep5'),
            dep6 = require('dep6'),
            dep7 = require('dep7'),
            dep8 = require('dep8');

            ...
    }
});

// 定义的模块依赖math和graph两个库，然后返回一个具有plot接口的对象。
define(['math', 'graph'], 
    function ( math, graph ) {
        return {
            plot: function(x, y){
                return graph.drawPie(math.randomGrid(x,y));
            }
        }
    };
);

// 实际应用的示例
define(['math', 'graph'], 
    function ( math, graph ) {
		return {
            plot: function(x, y){
                return graph.drawPie(math.randomGrid(x,y));
            }
        }
    };
);

// 定义了一个中间模块，该模块先判断浏览器是否支持__proto__属性（除了IE，其他浏览器都支持）
// 如果返回true，就加载zepto库，否则加载jQuery库。
define(('__proto__' in {} ? ['zepto'] : ['jquery']), function($) {
    return $;
});
 
// require方法用于调用模块。它的参数与define方法类似。
require(['foo', 'bar'], function ( foo, bar ) {
    foo.doSomething();
});

// require方法的第一个参数，是一个表示依赖关系的数组。这个数组可以写得很灵活
require( [ window.JSON ? undefined : 'util/json2' ], function ( JSON ) {
    JSON = JSON || window.JSON;
    console.log( JSON.parse( '{ "JSON" : "HERE" }' ) );
});

// require方法也可以用在define方法内部。
define(function (require) {
    var otherModule = require('otherModule');
 });


// 动态加载依赖
define(function ( require ) {
    var isReady = false, foobar;
    
    // 内部通过require加载模块
    require(['foo', 'bar'], function (foo, bar) {
        isReady = true;
        foobar = foo() + bar();
    });
    
    // 返回一个模块
    return {
        isReady: isReady,
        foobar: foobar
    };
});

// JSONP，指定JSONP的callback参数为define
require( [ 
    "http://someapi.com/foo?callback=define"
], function (data) {
    console.log(data);
});

// require方法允许添加第三个参数，即错误处理的回调函数。
require(
    [ "backbone" ], 
    function ( Backbone ) {
        return Backbone.View.extend({ /* ... */ });
    }, 
    function (err) {
		// ...
    }
);

// require对象还允许指定一个全局性的Error事件的监听函数。
// 所有没有被上面的方法捕获的错误，都会被触发这个监听函数。
requirejs.onError = function (err) {
    // ...
};

// jQuery+JsRender
//模板
<script type="text/x-jsrender" id="j-specCard">
   <table>
    <tr>
        <td>Name: {{:name}}</td>
        <td>Age: {{:age}}</td>
    </tr>
   </table>
</script>
//逻辑
(function(jq, g) {
//传入一个简单对象
    var data = {
            'name': 'alice',
            'age': 18
        },
        //获取模板
        jsRenderTpl = $.templates('#j-specCard'),
        //末班与数据结合
        finalTpl = jsRenderTpl(data);

    $('.box').html(finalTpl);
})(jQuery, window);

// jsRender 官方示例
<!DOCTYPE html>
<html>
<head>
  <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
  <script src="https://www.jsviews.com/download/jsrender.js"></script>
</head>
<body>
  <!-- 模版内容输出位置 -->
  <div id="result"></div>

  <!-- 定义模版: -->
  <script id="myTmpl" type="text/x-jsrender">{{:name}}</script>

  <script>
    var tmpl = $.templates("#myTmpl"); // 获取编译后的模版
    var data = {name: "Jo"};           // 定义数据模型
    var html = tmpl.render(data);      // 基于数据渲染模版为html
    $("#result").html(html);           // 将html插入指定的节点
  </script>
</body>
</html>

// 未使用模版
var i = 1;
$(my.vm.movies).each(function () {
  var movie = this;
  $("#movieContainer1").append(
    "<div>" + i++ + ": " + movie.
name + " ("
    + movie.releaseYear + ")</div>");
});

// 使用模版
<script id="myMovieTemplate" type="text/x-jsrender ">
  <div>{{:#index+1}}: {{:name}} ({{:releaseYear}})</div>
</script>
<script>
$("#movieContainer").html($("#myMovieTemplate").render(my.vm.movies));
</script>

// 工程入口文件，引入reuqirejs
<script data-main="js/app.js" src="js/require.js"></script>

// app.js 全局设置
requirejs.config({
    baseUrl: 'js/lib',
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
        "jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery", "js/jquery"],
        "index" : "js/index"   
    },
    // 第三方模块
    shim: {
        "underscore" : {
            exports : "_";
        },
        "jquery.form" : {
            deps : ["jquery"]
        }
    }
})
require(["jquery", "underscore", "index"], function ($, _, index) {
    // do something after loading index.js
})

// 立即执行函数
(function () {
	//插件所有功能都写在这个函数下
})();

// 插件参数
var options = {
    color: '#333333',
    key2: para2,
	key3: para3,
	...
	keyn: paran
}

// 插件API，参数设置和监听
var api = {
	config: function (ops) {
		//....
		return this;
	},
	listen: function listen(elem) {
		//...
		return this;
	},
	feature1: function() {
		//...
	},
	feature2: function() {
		//...
	}
}
this.pluginName = api;

// config设置函数的写法
config: function (opts) {
	//没有参数传入，直接返回默认参数
	if(!opts) return options;
	//有参数传入，通过key将options的值更新为用户的值
	for(var key in opts) {
		options[key] = opts[key];
	}
	return this;
}

// 监听事件
listen: function listen(elem) {
	//这里通过typeof设置监听的元素需为字符串调用，实际可根据需要进行更改
	if (typeof elem === 'string') {
		//这里使用ES5的querySelectorAll方法获取dom元素
		var elems = document.querySelectorAll(elem),
			i = elems.length;
			//通过递归将listen方法应用在所有的dom元素上
			while (i--) {
				listen(elems[i]);
			}
			return
	}
	//在这里，你可以将插件的部分功能函数写在这里
	return this;
}

// js插件的基本结构
(function () {
    var api = {
        //插件参数设定
        config: function (opts) {
            if(!opts) return options;
            for(var key in opts) {
                options[key] = opts[key];
            }
            return this;
        },
        //插件监听
        listen: function listen(elem) {
            if (typeof elem === 'string') {
                var elems = document.querySelectorAll(elem),
                    i = elems.length;
                    while (i--) {
                        listen(elems[i]);
                    }
                    return
            }
            //插件功能函数可以写在这
            return this;
        }
    }
    //将API赋值给插件名字
    this.pluginName = api;
})();

// 调用方式
pluginName.listen('#demo');
// 链式调用
pluginName.config({key: 'para'})
          .listen('#demo');


// 将系统变量以变量形式传递到插件内部
;(function($,window,document,undefined){
    //想要实现的功能的代码
})(jQuery,window,document);

// $.extend
$.extend({
    sayHello: function(name) {
        console.log('Hello,' + (name ? name : 'test') + '!');
    }
})
$.sayHello(); //Hello,test
$.sayHello('yusys'); //Hello,yusys

$.extend({
    log: function(message) {
        var now = new Date(),
            y = now.getFullYear(),
            m = now.getMonth() + 1, //！JavaScript中月分是从0开始的
            d = now.getDate(),
            h = now.getHours(),
            min = now.getMinutes(),
            s = now.getSeconds(),
            time = y + '/' + m + '/' + d + ' ' + h + ':' + min + ':' + s;
        console.log(time + ' My App: ' + message);
    }
})
$.log('initializing...'); //调用

//

// $.fn
$.fn.pluginName = function() {
    //your code here
}

// 调用
$(".ele").pluginName(options);

// 支持链式调用
$.fn.changeStyle = function(colorStr){
    this.css("color",colorStr);
    return this;
}

// 链式调用
$("p").changeStyle("red").addClass("red-color");

// 接受参数的jQuery插件
(function($){
    $.fn.changeStyle = function(option){
         var defaultSetting = { colorStr:"green",fontSize:12};
         var setting = $.extend(defaultSetting,option);
         this.css("color",setting.colorStr).css("fontSize",setting.fontSize+"px");        
        return this;
    }
}(jQuery));

// 另一种写法
(function($){
    $.fn.extend({         
        changeStyle:function(option){             
        var defaultSetting = { colorStr:"green",fontSize:12};
        var setting = $.extend(defaultSetting,option);
        this.css("color",setting.colorStr).css("fontSize",setting.fontSize+"px");        
        return this; 
         }
    });
}(jQuery));

// 面向对象的jQuery插件，并用自执行匿名函数封装
;(function($, window, document,undefined) {
    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            'color': 'red',
            'fontSize': '12px',
            'textDecoration': 'none'
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义Beautifier的方法
    Beautifier.prototype = {
        beautify: function() {
            return this.$element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            });
        }
    }
    //在插件中使用Beautifier对象
    $.fn.myPlugin = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(this, options);
        //调用其方法
        return beautifier.beautify();
    }
})(jQuery, window, document);

// 调用
$(function() {
    $('a').myPlugin({
        'color': '#2C9929',
        'fontSize': '20px'
    });
})