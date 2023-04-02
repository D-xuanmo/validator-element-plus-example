import validator from '@xuanmo/validator'

// 引入国际化词条
import zhCN from '@xuanmo/validator/locale/zh-CN.json'

// 注册词条
validator.localize(zhCN)

const wait = (wait: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, wait)
  })
}

// 扩展自定义规则
validator.extends({
  name: {
    message: '{#field}只能包含字母',
    // 正则模式
    regexp: /^[a-z]+$/i
  },
  cname: {
    message: '{#field}只能包含中文',
    regexp: /^[\u4e00-\u9fa5]+$/g
  },
  phone: {
    message: '手机号格式错误',
    // validator 函数模式
    validator(value) {
      if (value) return /^1[35789]\d{9}$/.test(<string>value)

      return true
    }
  },
  IDCard: {
    message: '身份证格式错误',
    validator(value) {
      if (value) {
        return /^[1-9]\d{5}1[89]\d{2}((0[1-9])|(1[012]))((0[1-9])|(([12])[0-9])|(3[01]))\d{3}(\d|X)$/i.test(<string>value)
      }

      return true
    }
  },
  asyncRule: {
    message: '异步校验失败',
    validator() {
      return new Promise(async (resolve) => {
        await wait(1500)
        resolve(false)
      })
    }
  }
})

// 执行校验方法
const validate = validator.validate

export default validate
