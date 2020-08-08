/* eslint-disable no-unused-vars */
<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.txt"
          :class="{ current: item.current }"
          @click="menuToggle(item)"
        >{{ item.txt }}</li>
      </ul>
      <!-- 表单 -->
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="login-form"
        size="medium "
      >
        <el-form-item prop="username" class="item-form">
          <label for>邮箱</label>
          <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for>密码</label>
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-show="model === 'register'">
          <label for>确认密码</label>
          <el-input
            type="password"
            v-model="loginForm.passwords"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label for>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="loginForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="code-btn block">验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('loginForm')" class="login-btn block">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// vue3.0用啥就需要引用啥
import { reactive, ref, toRefs, isRef, onMounted } from '@vue/composition-api'

export default {
  name: 'Login',
  setup (props, { refs }) {
    // 用户名校验
    let validateUsername = (rule, value, callback) => {
      //邮箱规则
      let regEmail = /^([a-zA-Z0-9_-])+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-])+/
      if (value === '') {
        callback(new Error('请输出邮箱'))
      } else {
        if (!regEmail.test(value)) {
          callback(new Error('请输出正确的邮箱格式'))
        }
        callback()
      }
    }

    // 密码校验
    let validatePassword = (rule, value, callback) => {
      // 密码规则 （密码至少包含 数字和英文，长度6-20）
      // eslint-disable-next-line no-unused-vars
      let regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!regPassword.test(value)) {
        callback(new Error('请输入至少包含 数字和英文，长度6-20的密码!'))
      } else {
        callback()
      }
    }

    // 确认密码校验
    let validatePasswords = (rule, value, callback) => {
      // 如果 登录页面时 login, 直接通过
      if (model.value === 'login') {
        callback()
      }
      // 密码规则 （密码至少包含 数字和英文，长度6-20）
      // eslint-disable-next-line no-unused-vars
      let regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== loginForm.password) {
        callback(new Error('请输入相同的密码'))
      } else {
        callback()
      }
    }

    // 验证码校验
    let checkCode = (rule, value, callback) => {
      // 验证码规则 (6位数的字母+数字)
      let regCode = /^[a-zA-Z0-9]{6}$/
      if (value === '') {
        return callback(new Error('验证码不能为空'))
      } else {
        if (!regCode.test(value)) {
          callback(new Error('请输入6位数的字母+数字的验证码'))
        } else {
          callback()
        }
      }
    }

    // 这里面放置 data数据、 生命周期、自定义函数
    // 单一对象使用
    let menuTab = reactive([
      { txt: '登录', current: true, type: 'login' },
      { txt: '注册', current: false, type: 'register' }
    ])
    // 取值方式 menuTab.txt 就可以取到

    // 登录表单数据
    let loginForm = reactive({
      username: '',
      password: '',
      passwords: '',
      code: ''
    })
    // 校验规则
    let rules = reactive({
      username: [{ validator: validateUsername, trigger: 'blur' }],
      password: [{ validator: validatePassword, trigger: 'blur' }],
      passwords: [{ validator: validatePasswords, trigger: 'blur' }],
      code: [{ validator: checkCode, trigger: 'blur' }]
    })

    // 单一基础数据类型
    // 模块
    let model = ref('login')

    /**
     * 声明函数
     * **/
    // 菜单切换
    let menuToggle = data => {
      console.log(data)
      // 重置表单数据
      loginForm.username = ''
      loginForm.password = ''
      loginForm.passwords = ''
      loginForm.code = ''

      // 循环遍历，取消所有的current状态
      menuTab.forEach(elem => {
        elem.current = false
      })
      // 设置切换状态
      data.current = true
      // 设置模块
      model.value = data.type
    }
    // 提交表单
    let submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          alert('submit')
        } else {
          console.log('error submit')
          return false
        }
      })
    }
    /**
     * 生命周期
     * **/
    // 挂机完成后
    onMounted(() => { })

    // 暴露给模板
    return {
      menuTab,
      loginForm,
      model,
      rules,
      menuToggle,
      submitForm
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;

  .login-wrap {
    width: 330px;
    margin: auto;
  }

  .menu-tab {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
    }
    .current {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  // 表单
  .login-form {
    .item-form {
      label {
        display: block;
        margin-top: 19px;
        margin-bottom: 3px;
        font-size: 14px;
        color: #fff;
      }
      // 验证码按钮
      .code-btn {
        line-height: 34px;
        font-size: 14px;
      }
    }

    // 提交
    .login-btn {
      margin-top: 19px;
      line-height: 36px;
      font-size: 14px;
    }

    .block {
      display: block;
      width: 100%;
    }
  }
}
</style>
