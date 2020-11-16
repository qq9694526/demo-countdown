//倒计时组件
(function (win, doc, $) {
  //   一个可复用的插件需要满足以下条件：
  // 插件自身的作用域与用户当前的作用域相互独立，也就是插件内部的私有变量不能影响使用者的环境变量；
  // 插件需具备默认设置参数；
  // 插件除了具备已实现的基本功能外，需提供部分API，使用者可以通过该API修改插件功能的默认参数，从而实现用户自定义插件效果；
  // 插件需提供监听入口，及针对指定元素进行监听，使得该元素与插件响应达到插件效果；
  // 插件支持链式调用。
  // jsrender

  // methods: init($el,time)
  // 事件：归零
  const myEvent = new CustomEvent('touchZero', {
    detail: { title: 'This is touchZero!' },
  });

  let defaultOptions={
    el:'body',
    time:10
  }
  let originOption= {}

  const countdown = {
    init: (options) => {
      originOption = options
      const { el, time, onTouchZero } = {...defaultOptions,...options}
      let originTime = time
      $(el).html(originTime)
      window.addEventListener('touchZero', onTouchZero)
      const timer = setInterval(() => {
        originTime -= 1
        $(el).html(originTime)
        if (originTime <= 0) {
          clearInterval(timer)
          window.dispatchEvent(myEvent);
        }
      }, 1000);
      return countdown
    },
    reset:()=>{
      this.init(originOption)
    }
  }
  window.countdown = countdown

}(window, document, $));