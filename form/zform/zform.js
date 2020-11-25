(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global = global || self, global.Zform = factory());
}(this, function () {
  'use strict';
  let $root = null
  function Zform(options) {
    const _this = this
    this.options = options
    $root = $(options.el)
    this.items = options.items
    this._initWrapper()
    // 绑定事件-提交按钮
    $root.on('click', '.z-button--primary', () => {
      const formDom = $root.find('.z-form')[0]
      const formData = this.items.map(item => {
        return {
          name: item.name,
          value: formDom[item.name].value
        }
      })
      const validateResult = _this._validate()
      options.onSubmit && options.onSubmit(formData, validateResult)
    })
    // 绑定事件-重置按钮
    $root.on('click', '.z-button--default', () => {
      $root.find('.z-form')[0].reset()
      $root.find('.z-form-item').removeClass('is-error')
    })
    $root.on('blur', '.z-input__inner', (e) => {
      const name = e.target.name
      const rules = this.options.rules[name]
      _testRules(rules, name, e.target.value)
    })
    $root.on('change', '.z-select__inner', (e) => {
      const name = e.target.name
      const rules = this.options.rules[name]
      _testRules(rules, name, e.target.value)
    })
  }
  // 全部校验
  Zform.prototype._validate = function () {
    const rules = this.options.rules
    const formDom = $root.find('.z-form')[0]
    let results = []
    for (let key in rules) {
      const result = _testRules(rules[key], key, formDom[key].value)
      results.push(result)
    }
    return results.every(item => item)
  }
  // 校验某项输入的全部规则
  function _testRules(rules, name, value) {
    let result = true
    for (let index in rules) {
      if (!_testValue.call(this, rules[index], name, value)) {
        result = false
        break
      }
    }
    return result
  }
  // 校验某个值
  function _testValue(rule, key, value) {
    const $formItem = $root.find('[name=' + key + ']').closest('.z-form-item')
    if (rule.required && !value) {
      $formItem.addClass('is-error').find('.z-form-item__error').text(rule.message)
      return false
    }
    if (rule.reg && !rule.reg.test(value)) {
      $formItem.addClass('is-error').find('.z-form-item__error').text(rule.message)
      return false
    }
    $formItem.removeClass('is-error')
    return true
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
    $root.html(htmls)
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
    <select class="z-select__inner" name="${item.name}" value="${item.value}">
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