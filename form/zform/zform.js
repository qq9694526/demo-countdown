(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global = global || self, global.Zform = factory());
}(this, function () {
  'use strict';
  function Zform(options) {
    this.$el = $(options.el)
    this.items = options.items
    this._initWrapper()
    this.$el.on('click', '.z-button--primary', () => {
      const formDom = this.$el.find('.z-form')[0]
      const result = this.items.map(item => {
        return {
          name: item.name,
          value: formDom[item.name].value
        }
      })
      options.onSubmit && options.onSubmit(result)
    })
    this.$el.on('click', '.z-button--default', () => {
      this.$el.find('.z-form')[0].reset()
    })
  }

  Zform.prototype._initWrapper = function () {
    var htmls = `<form class="z-form">
    <div class="z-form-item">
      ${_itemHtmls(this.items)}
      <div class="z-form-item__content">
        <button type="button" class="z-button z-button--primary">提交</button>
        <button type="button" class="z-button z-button--default">重置</button>
      </div>
    </div>
  </form>`
    this.$el.html(htmls)
  }

  function _itemHtmls(items) {
    let htmls = ""
    items.forEach(item => {
      htmls += `<div class="z-form-item">
      <label class="z-form-item__label">${item.label}</label>
      <div class="z-form-item__content">
        ${item.type === 'select' ? _selectHtmls(item) : _inputHtmls(item)}
        <div class="z-form-item__error">
        </div>
      </div>
    </div>`
    })
    return htmls
  }
  function _inputHtmls(item) {
    return `<div class="z-input">
      <input class="z-input__inner" type="text" name="${item.name}" value="${item.value}">
    </div>`
  }
  function _selectHtmls(item) {
    return `<div class="z-select">
    <select class="z-select__inner z-input__inner" name="${item.name}" value="${item.value}">
      ${_optionHtmls(item.options)}
    </select>
  </div>`
  }
  function _optionHtmls(items) {
    let htmls = ""
    items.forEach(item => {
      htmls += `<option value="${item.value}">${item.name}</option>`
    })
    return htmls
  }


  return Zform
}));