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
    $el.html(this.time)
    clearInterval(this._timer)
    this._isRunning = true
    this._timer = setInterval(() => {
      this.time -= 1
      $el.html(this.time)
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
    if (this._isRunning) {
      return
    }
    this.init()
  }

  reset() {
    this.time = this.options.time
    this.init()
  }
}
window.CountDown = CountDown