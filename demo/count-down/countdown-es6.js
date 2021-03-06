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
  class CountDown {
    _defaultOptions = {
      el: 'body',
      time: 10, //单位秒
      type: "normal", // ['mini','normal'] 默认normal
      needRing: true,// 默认false
      audioPath: './count-down'//mp3资源路径
    }
    _timer = null
    _isRunning = false

    constructor(options) {
      // 参数合并
      const originOptions = { ...this._defaultOptions, ...options }
      // 初始赋值
      const { el, time, onTouchZero } = originOptions
      this.options = originOptions
      this.$el = $(el);
      this.time = parseInt(time);
      // 插入style
      this._appendStyle()
      // 初始化dom
      this._initWrapper()
      // 绑定倒计时归零事件
      $(el).on('touchZero', onTouchZero)
    }

    play() {
      if (this._isRunning) { // 防止重复init
        return
      }
      if (this.time <= 0) {
        return
      }
      this._initTimer()
      return this
    }

    stop() {
      clearInterval(this._timer)
      this._isRunning = false
      return this
    }

    reset() {
      this.stop()
      this.time = this.options.time
      this._initWrapper()
      return this
    }

    _initTimer() {
      clearInterval(this._timer)
      this._isRunning = true
      const $countNum = this.$el.find('.c-count-num')
      this._timer = setInterval(() => {
        this.time -= 1
        $countNum.html(this._getRemainingTime(this.time))
        this._moveProcess()
        if (this.time <= 0) {
          this._turnOver()
        }
      }, 1000);
    }

    _initWrapper() {
      this.$el.html(this._getWraperHtml(this._getRemainingTime(this.time)))
    }

    _getRemainingTime(timestamp) {
      if (typeof timestamp !== 'number') {
        return "00:00"
      }
      const hour = parseInt(timestamp / 60 / 60)
      const minute = parseInt(timestamp / 60 % 60)
      const second = parseInt(timestamp % 60)
      let result = `${this._fillZero(minute)}:${this._fillZero(second)}`
      if (hour > 0) {
        result = `${this._fillZero(hour)}:${result}`
      }
      return result
    }

    _getWraperHtml(defaultValue) {
      let htmls = ""
      const { audioPath, type } = this.options
      if (type === 'mini') {
        htmls = `<div class="c-count-wrap">
          <span class="c-count-num">${defaultValue}</span>
          <audio preload class="c-music">
            <source src="${audioPath}/music.mp3" type="audio/mpeg">
          </audio>
        </div>`
      } else {
        htmls = `<div class="c-count-wrap">
        <svg xmlns="http://www.w3.org/200/svg" height="110" width="110">
          <circle cx="55" cy="55" r="50" fill="none" stroke="#ccc" stroke-width="5" stroke-linecap="round" />
          <circle class="c-count-process" cx="55" cy="55" r="50" fill="none" stroke="#ff9800" stroke-width="5" />
        </svg>
        <span class="c-count-num">${defaultValue}</span>
        <audio preload class="c-music">
          <source src="${audioPath}/music.mp3" type="audio/mpeg">
        </audio>
      </div>`
      }
      return htmls
    }

    _moveProcess() {
      const { time: totalTime, type } = this.options
      if (type === 'mini') {
        return
      }
      const currentPercent = parseFloat(this.time / totalTime).toFixed(2)
      const circleLength = Math.floor(2 * Math.PI * 50);
      this.$el.find('.c-count-process')[0].setAttribute("stroke-dasharray", "" + currentPercent * circleLength + ",10000");
    }

    _turnOver() {
      clearInterval(this._timer)
      this.$el.trigger('touchZero', this)
      if (this.options.needRing) {
        this.$el.find('.c-music')[0].play()
      }
    }

    _fillZero(value) {
      return value < 10 ? '0' + value : value
    }

    _appendStyle() {
      const style = document.createElement('style');
      style.innerText = `.c-count-wrap {
        display: inline-block;
        position: relative;
        font-size: 0;
      }
      .c-count-wrap .c-count-num {
        position: absolute;
        display: inline-block;
        top: 50%;
        left: 0;
        width: 100%;
        text-align: center;
        transform: translateY(-50%);
        font-size: 14px;
        white-space: nowrap;
      }
      .c-count-wrap .c-count-process {
        transform-origin: 55px 55px;
        transform: rotate(-90deg);
      }`
      document.head.appendChild(style)
    }
  }

  return CountDown;
}));