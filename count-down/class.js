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
    // 初始化倒计时
    this.init()
  }

  init() {
    const $el = this.$el
    $el.html(this._getShowText(this.time))
    clearInterval(this._timer)
    this._isRunning = true
    this._timer = setInterval(() => {
      this.time -= 1000
      $el.html(this._getShowText(this.time))
      if (this.time <= 0) {
        clearInterval(this._timer)
        $el.trigger('touchZero', this)
      }
    }, 1000);
  }

  stop() {
    clearInterval(this._timer)
    this._isRunning = false
  }

  play() {
    if (this._isRunning) { // 防止重复init
      return
    }
    this.init()
  }

  reset() {
    this.time = this.options.time
    this.init()
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
}

window.CountDown = CountDown