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
    this.time = time;
    // 绑定事件
    $(el).on('touchZero', onTouchZero)
    // 初始化进度条
    this._initProcess()
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
    this._initProcess()
  }

  _initTimer() {
    const $el = this.$el
    clearInterval(this._timer)
    this._isRunning = true
    this._timer = setInterval(() => {
      this.time -= 1000
      this._rotateCircle()
      $("#c-countnum").html(this._getShowText(this.time))
      if (this.time <= 0) {
        clearInterval(this._timer)
        $el.trigger('touchZero', this)
      }
    }, 1000);
  }

  _initProcess() {
    this.circleLength = Math.floor(2 * Math.PI * 50);
    this.$el.html(this._svghtmls(this._getShowText(this.time)))
  }

  _getShowText(timestamp) {
    if (typeof timestamp !== 'number') {
      return "00:00"
    }
    const hour = parseInt(timestamp / 1000 / 60 / 60)
    const minute = parseInt(timestamp / 1000 / 60 % 60)
    const second = parseInt(timestamp / 1000 % 60)
    let rsult = `${this._fillZero(minute)}:${this._fillZero(second)}`
    if (hour > 0) {
      rsult = `${this._fillZero(hour)}:${rsult}`
    }
    return rsult
  }

  _fillZero(value) {
    return value < 10 ? '0' + value : value
  }

  _svghtmls(defaultValue) {
    return `<div class="c-count-wrap">
    <svg xmlns="http://www.w3.org/200/svg" height="110" width="110">
      <circle cx="55" cy="55" r="50" fill="none" stroke="#9e9e9e" stroke-width="5" stroke-linecap="round" />
      <circle id="c-count-process" class="c-count-process" cx="55" cy="55" r="50" fill="none" stroke="#ff9800" stroke-width="5" />
    </svg>
    <span id="c-countnum" class="c-count-num">${defaultValue}</span>
  </div>`
  }

  _rotateCircle() {
    const val = parseInt(this.time / this.options.time * 100)
    $('#c-count-process')[0].setAttribute("stroke-dasharray", "" + this.circleLength * val / 100 + ",10000");
  }

}

window.CountDown = CountDown