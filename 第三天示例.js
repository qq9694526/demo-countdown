// js
function WebSocketTest() {
    if ("WebSocket" in window)
    {
        alert("您的浏览器支持 WebSocket!");
        
        // 打开一个 web socket
        var ws = new WebSocket("ws://localhost:9998/echo");
        
        ws.onopen = function()
        {
            // Web Socket 已连接上，使用 send() 方法发送数据
            ws.send("发送数据");
            alert("数据发送中...");
        };
        
        ws.onmessage = function (evt) 
        { 
            var received_msg = evt.data;
            alert("数据已接收...");
        };
        
        ws.onclose = function()
        { 
            // 关闭 websocket
            alert("连接已关闭..."); 
        };
    }

    else
    {
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!");
    }
}

// AMD模块
define(function () {
    // 代码内容
    return webSock
});

// js插件
(function (window) {
    // 代码内容
    this.pluginName = webSock;
})(window);


// 心跳机制
define(function () {
    var ws = null
    var lockReconnect = false;  //避免ws重复连接
    var globalCallback = null
    var wsUrl = 'ws://121.40.165.18:8800'

    //心跳检测
    var heartCheck = {
        timeout: 60000,        //1分钟发一次心跳
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function(){
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            return this;
        },
        start: function(){
            var self = this;
            this.timeoutObj = setTimeout(function(){
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            ws.send({
                data: "ping"
            });
            console.log("尝试重新连接ping!")
            self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
                console.log('服务器关闭连接')
                ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout)
            }, this.timeout)
        }
    }

    window.onbeforeunload = function() {
    ws.close();
    }  

    function reconnect(url) {
        if(lockReconnect) return;
        lockReconnect = true;
        setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
            webSock.initWebSocket();
            lockReconnect = false;
        }, 2000);
    }

    var webSock = {
        initWebSocket: function() {
            // console.log('socket', swan)
            // ws ws://121.40.165.18:8800
            try{
                if ('WebSocket' in window && lockReconnect === false) {
                // swan SocketTask对象
                var that = this
                ws = swan.connectSocket({
                    url: wsUrl,
                    success (res) {
                    lockReconnect = true
                    console.log('创建连接成功', res)
                    },
                    error (res) {
                    lockReconnect = false
                    console.log('创建连接失败', res)   
                    }
                })
                }
            } catch (e) {
                reconnect(wsUrl)
                console.log('错误重试', e)
            }
        },
        onMessage: function(callback) {
            // 数据接收,获取到数据后重置
            var cb = callback
            
            ws.onMessage(function (res) {
                console.log('onmsg-收到服务器内容：', res.data);
                heartCheck.reset().start();
                cb(res)
            })
        },
        sendData: function(data, callback) {
            // 数据发送
            reconnect(wsUrl);
                if(lockReconnect === true){
                    console.log('发送数据开始', data)
                    ws.send({
                        data: data,
                        success (data) {
                            console.log('发送数据成功', data)
                            // 成功回调
                            callback(data)
                        }
                    })
            }
        },
        onClose: function(data) {
            // 连接关闭回调
            lockReconnect = false
            heartCheck.reset()
            reconnect(wsUrl);
            console.log('连接关闭', data)
        },
        onOpen (e) {
            // 连接打开回调
            lockReconnect = true
            console.log('连接成功')
            heartCheck.start()
        },
        close: function() {
            // 关闭连接
            lockReconnect = false
            ws.close();
        }
        
    }

return webSock
});

// 调用
webSock.initWebSocket()