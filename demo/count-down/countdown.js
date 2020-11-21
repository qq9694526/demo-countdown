(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global = global || self, global.CountDown = factory());
}(this, function () {
  'use strict';
  class CountDown {
    _defaultOptions = {
      el: 'body',
      time: 10
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
      // 绑定事件
      $(el).on('touchZero', onTouchZero)
      // 初始化进度条
      this._initHtml()
    }

    stop() {
      clearInterval(this._timer)
      this._isRunning = false
    }

    play() {
      if (this._isRunning) { // 防止重复init
        return
      }
      this._initTimer()
    }

    reset() {
      this.stop()
      this.time = this.options.time
      this._initHtml()
    }

    _initTimer() {
      clearInterval(this._timer)
      this._isRunning = true
      this._timer = setInterval(() => {
        this.time -= 1
        $("#c-countnum").html(this._getShowText(this.time))
        this._moveProcess()
        if (this.time <= 0) {
          this._turnOver()
        }
      }, 1000);
    }

    _initHtml() {
      this.$el.html(this._getWraperHtmls(this._getShowText(this.time)))
    }

    _getShowText(timestamp) {
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

    _fillZero(value) {
      return value < 10 ? '0' + value : value
    }

    _getWraperHtmls(defaultValue) {
      let htmls = ""
      const { audioPath, type } = this.options
      if (type === 'mini') {
        htmls = `<div class="c-count-wrap">
          <span id="c-countnum" class="c-count-num">${defaultValue}</span>
          <audio preload id="c-music">
            <source src="${audioPath}/music.mp3" type="audio/mpeg">
          </audio>
        </div>`
      } else {
        htmls = `<div class="c-count-wrap">
        <svg xmlns="http://www.w3.org/200/svg" height="110" width="110">
          <circle cx="55" cy="55" r="50" fill="none" stroke="#ccc" stroke-width="5" stroke-linecap="round" />
          <circle id="c-count-process" class="c-count-process" cx="55" cy="55" r="50" fill="none" stroke="#ff9800" stroke-width="5" />
        </svg>
        <span id="c-countnum" class="c-count-num">${defaultValue}</span>
        <audio preload id="c-music">
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
      $('#c-count-process')[0].setAttribute("stroke-dasharray", "" + currentPercent * circleLength + ",10000");
    }

    _turnOver() {
      clearInterval(this._timer)
      this.$el.trigger('touchZero', this)
      if (this.options.needRing) {
        $("#c-music")[0].play()
      }
    }
  }
  return CountDown;
}));