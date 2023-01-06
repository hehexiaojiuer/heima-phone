<template>
    <!-- 头部 -->
    <div>

        <div id="header">
            <van-nav-bar  title="登录" fixed placeholder >
              <van-icon name="arrow-left" slot="left" @click="$router.back()"/>
              </van-nav-bar>
        </div>

        <!-- 中间位置 -->
        <div id="container">
            <van-form class="form" ref="formOne">
                <van-row gutter="20" class="inp">
                    <van-col span="1" class="tb">
                        <i class="toutiao toutiao-shouji"></i>
                    </van-col>
                    <van-col span="24" offset="2">
                        <van-field v-model="user.mobile" placeholder="手机号" name="mobile" :rules="userFormRules.validatorMobile" type="number" maxlength="11" />
                    </van-col>

                </van-row>

                <van-row>
                    <van-col span="2" class="tb">
                        <i class="toutiao toutiao-yanzhengma"></i>
                    </van-col>
                    <van-col span="16">
                        <van-field v-model="user.code" type="number" placeholder="验证码" class="inp-yzm" :rules="userFormRules.validatorCode" maxlength="6" />
                    </van-col>
                    <van-col span="6">
                        <van-count-down :time="time" class="down" v-if="isShow" @finish="codeFinish" format=" ss 秒" />
                        <van-button round type="info" v-else tag="span" ref="codeBtn" native-type="button" size="mini" @click="getCode" class="message-btn"> 获取验证码</van-button>
                    </van-col>
                </van-row>

                <div style="margin: 16px;">
                    <van-button block type="info" color="#6db4fb" native-type="button" @click="login">登录</van-button>
                </div>
            </van-form>
        </div>

    </div>
</template>

<script>
import { loginAPI, getCodeAPI } from '@/api/index'

export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isShow: false,
      time: 10 * 1000,
      userFormRules: {
        validatorMobile: [
          {
            require: true,
            message: '手机号码不能为空！'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机格式错误'
          }
        ],
        validatorCode: [
          {
            require: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      }
    }
  },
  methods: {
    async login () {
      if (this.time < 0) {
        this.$toast('验证码已过期,请重新发送验证码')
        return
      }
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: false,
          duration: 0
        })
        const {
          data: { message, data }
        } = await loginAPI(this.user)
        if (message === 'OK') {
          this.$toast.success({
            message: '登录成功'
          },
          this.$store.commit('setUser', data),
          this.$router.back()
          )
        }
      } catch (err) {
        if (err.response.status === 400) {
          const { message } = err.response.data
          this.$toast.fail(message)
        } else {
          this.$toast.fail('登录失败，请重新登录')
        }
      }
    },
    async getCode () {
      try {
        await this.$refs.formOne.validate('mobile')
      } catch (error) {
        return this.$toast(error.message)
      }
      this.$toast.loading({
        message: '正在获取',
        forbidClick: false,
        duration: 0
      })
      this.isShow = true
      try {
        await getCodeAPI(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        console.log(1)
        this.isShow = false
        if (error.response.status === 429) {
          return this.$toast('发送太频繁了,稍后重试')
        } else {
          return this.$toast('发送失败,稍后重试')
        }
      }
    },
    codeFinish () {
      this.isShow = false
    }
  }
}
</script>
<style scoped lang="less">
#container {
  width: 100%;
  height: 91px;
  .tb {
    position: relative;
  }
  .toutiao {
    position: absolute;
    top: 22px;
    left: 15px;
  }
  .message-btn {
    width: 76px;
    margin: 15px 10px;
    background: #eeddee;
    border: 1px solid transparent;
    color: #666;
    font-size: 10px;
    height: 23px;
  }
  .inp {
    border-bottom: 1px solid #eee;
    margin-bottom: 5px;
  }
  .inp-yzm {
    border-right: 1px solid #eee;
  }
  .down {
    text-align: center;
    line-height: 40px;
  }

  //   .form{
  //       position: relative;
  //   }
  //   .message-btn{
  //       position: absolute;
  //       right: 0;
  //       bottom: -2;

  //   }
}
</style>
