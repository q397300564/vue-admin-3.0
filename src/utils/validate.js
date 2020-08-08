/**
 * 过滤掉特殊字符
 * */
export function textFilter (str) {
  let pattern = new RegExp(
    "[`~!@#$^&*()=|{}'%:;',\\[\\].<>/?~！@\"#￥……&*（）——|{}【】‘；：”“'。，、？ ]"
  )
  let rs = ''
  for (let i = 0; i < str.length; i++) {
    rs += str.substr(i, 1).replace(pattern, '')
  }
  return rs
}

/**
 * 邮箱验证
 * **/
export function validateE (value) {
  //邮箱规则
  let regEmail = /^([a-zA-Z0-9_-])+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-])+/
  if (!regEmail.test(value)) {
    return false
  } else {
    return true
  }
}

/**
 * 密码验证 （数字+字母  长度6-20位）
 * **/

export function validateP (value) {
  //邮箱规则
  let regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  if (!regPassword.test(value)) {
    return false
  } else {
    return true
  }
}

/**
 * 验证验证码 （数字+字母  长度6位）
 * **/

export function validateC (value) {
  //邮箱规则
  let regCode = /^[a-zA-Z0-9]{6}$/
  if (!regCode.test(value)) {
    return false
  } else {
    return true
  }
}
