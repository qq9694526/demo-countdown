// 插件需要满足的条件
// 1. 插件自身的作用域与用户当前的作用域相互独立，也就是插件内部的私有变量不能影响使用者的环境变量；
// 2. 插件需具备默认设置参数；
// 3. 插件除了具备已实现的基本功能外，需提供部分API，使用者可以通过该API修改插件功能的默认参数，从而实现用户自定义插件效果；
// 5. 插件需提供监听入口，及针对指定元素进行监听，使得该元素与插件响应达到插件效果；
// 6. 插件支持链式调用。
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global = global || self, global.CountDown = factory());
}(this, function () {
  'use strict';
  var _defaultOptions = { // 默认配置
    el: 'body', // 挂载到的节点
    time: 10, // 倒计时时间，单位秒
    type: "normal", // 倒计时展示类型，['mini','normal'] 默认normal
    needRing: true,// 是否需要结束铃声，默认false
    audioPath: './count-down'// 铃声资源路径
  }
  function CountDown(customOptions) {
    // 合并配置项
    var options = $.extend({}, _defaultOptions, customOptions)
    // 初始赋值
    this.options = options
    this.$el = $(options.el)
    this.time = parseInt(options.time);
    this.timer = null
    this.isRunning = false
    // 初始化dom
    _initWrapper(this.options)
    // 绑定归零事件
    this.$el.unbind('touchZero').on('touchZero', options.onTouchZero)
  }
  // 开始
  CountDown.prototype.play = function () {
    if (this._isRunning) { // 防止多次点击开始，导致的重复初始化倒计时
      return
    }
    if (this.time <= 0) { // 时间不能小于0
      return
    }
    this._initTimer()
    return this // 支持连缀调用
  }
  // 暂停
  CountDown.prototype.stop = function () {
    clearInterval(this.timer)
    this._isRunning = false
    return this
  }
  // 重置
  CountDown.prototype.reset = function () {
    this.stop()
    this.time = this.options.time
    _initWrapper(this.options)
    return this
  }
  // 初始化倒计时的方法
  CountDown.prototype._initTimer = function () {
    var _this = this
    clearInterval(_this.timer)
    _this.isRunning = true
    var $countNum = _this.$el.find('.c-count-num')
    _this.timer = setInterval(function () {
      _this.time -= 1 // 时间-1s
      $countNum.html(_clacRemainingTime(_this.time)) // 更新页面上的数字
      _moveProcess(_this.time, _this.options)
      if (_this.time <= 0) {
        _this._turnOver()
      }
    }, 1000)
  }
  // 倒计时结束的处理
  CountDown.prototype._turnOver = function () {
    clearInterval(this.timer) // 清除定时器
    this.$el.trigger('touchZero', this)  // 派发归零事件
    if (this.options.needRing) { // 如果有结束铃声开始播放
      this.$el.find('.c-music')[0].play()
    }
  }
  // 计算当前剩余时间
  // 20 => '00:20'  3600 => '01:00:00'
  function _clacRemainingTime(time) {
    if (typeof time !== 'number') {
      return "00:00"
    }
    var hour = parseInt(time / 60 / 60)
    var minute = parseInt(time / 60 % 60)
    var second = parseInt(time % 60)
    var result = _fillZero(minute) + ":" + _fillZero(second)
    if (hour > 0) {
      result = _fillZero(hour) + ":" + result
    }
    return result
  }
  // 数字补零
  // 1 => '01'  10 => '10'
  function _fillZero(value) {
    return value < 10 ? '0' + value : value
  }
  // 初始化dom
  function _initWrapper(options) {
    var htmls = ""
    var remainingTime = _clacRemainingTime(options.time)
    var audioPath = options.audioPath
    htmls = '<div class="c-count-wrap">' +
      '<span class="c-count-num">' + remainingTime + '</span>' +
      '<audio preload class="c-music">' +
      '<source src="' + audioPath + '/music.mp3" type="audio/mpeg">' +
      '</audio>'
    if (options.type !== 'mini') {
      htmls += '<svg xmlns="http://www.w3.org/200/svg" height="110" width="110">' +
        '<circle cx="55" cy="55" r="50" fill="none" stroke="#ccc" stroke-width="5" stroke-linecap="round" />' +
        '<circle class="c-count-process" cx="55" cy="55" r="50" fill="none" stroke="#ff9800" stroke-width="5" />' +
        '</svg>'
    }
    htmls += '</div>'
    $(options.el).html(htmls)
  }
  // 移动环形进度条
  function _moveProcess(time, options) {
    var totalTime = options.time
    if (options.type === 'mini') {
      return
    }
    var currentPercent = parseFloat(time / totalTime).toFixed(2)
    var circleLength = Math.floor(2 * Math.PI * 50);
    $(options.el).find('.c-count-process')[0].setAttribute("stroke-dasharray", "" + currentPercent * circleLength + ",10000");
  }
  // 挂载style，省去单独引用
  function _appendStyle() {
    var style = document.createElement('style');
    style.innerText = ".c-count-wrap {display: inline-block;position: relative;font-size: 0;}" +
      ".c-count-wrap .c-count-num {position: absolute;display: inline-block;top: 50%;left: 0;width: 100%;text-align: center;transform: translateY(-50%);font-size: 14px;white-space: nowrap;}" +
      ".c-count-wrap .c-count-process {transform-origin: 55px 55px;transform: rotate(-90deg);}"
    document.head.appendChild(style)
  }
  _appendStyle()

  return CountDown;
}));