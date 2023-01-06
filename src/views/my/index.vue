<template>
    <div class="my-container">

        <div class="header user-info" v-if="user">
            <div class="base-info">
                <div class="left">
                    <van-image class="avatar" :src="userInfo.photo" round fit="contain" />
                    <span class="name">{{userInfo.name}}</span>
                </div>
                <div class="right">
                    <van-button size="mini" round>修改资料</van-button>
                </div>
            </div>
            <div class="user-stats">
                <div class="stats-item">
                    <div class="count">{{userInfo.art_count}}</div>
                    <div class="text">头条</div>
                </div>
                <div class="stats-item">
                    <div class="count">{{userInfo.follow_count}}</div>
                    <div class="text">关注</div>
                </div>
                <div class="stats-item">
                    <div class="count">{{userInfo.fans_count}}</div>
                    <div class="text">粉丝</div>
                </div>
                <div class="stats-item">
                    <div class="count">{{userInfo.like_count}}</div>
                    <div class="text">获赞</div>
                </div>
            </div>

        </div>

        <div class="header" v-else>
            <div class="not-login">
                <div class="login-btn" @click="$router.push('/login')">
                    <img class="img" src="~@/assets/mobile.png">
                    <span class="text">登录 / 注册</span>
                </div>
            </div>
        </div>

        <!-- 导航 -->
        <van-grid class="grid-nav" clickable column-num="2">
            <van-grid-item class="grid-item">
                <i slot="icon" class="toutiao toutiao-shoucang"></i>
                <span class="text" slot="text">收藏</span>
            </van-grid-item>
            <van-grid-item class="grid-item">
                <i slot="icon" class="toutiao toutiao-lishi"></i>
                <span class="text" slot="text">历史</span>
            </van-grid-item>
        </van-grid>

        <van-cell-group>
            <van-cell title="个人中心" is-link />
            <van-cell title="小智同学" is-link />
        </van-cell-group>
        <van-button v-if="user" class="btn-back" @click="loginOut" block>退出登录</van-button>
    </div>

</template>

<script>
import { mapState } from 'vuex'
import { removeItem } from '@/utils/storge'
import { getUserInfoAPI } from '@/api'
export default {
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    loginOut () {
      this.$dialog
        .confirm({
          title: '确定退出吗？'
        })
        .then(() => {
          this.$store.commit('setUser', null)
          removeItem('TOUTIAO_USER')
        })
        .catch(() => {
          this.$dialog.close()
        })
    }
  },
  async created () {
    if (this.user) {
      const { data: { data } } = await getUserInfoAPI()
      this.userInfo = data
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 181.5px;
    background-image: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    height: 181.5px;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img {
        width: 61px;
        height: 61px;
      }
      .text {
        font-size: 14px;
        color: white;
      }
    }
  }
}
.user-info {
  .base-info {
    height: 125.5px;
    padding: 38px 16px 16.5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 60px;
        height: 60px;
        margin-right: 23px;
        border: 4px solid #fff;
      }
      .name {
        color: white;
        font-size: 15px;
      }
    }
  }
  .user-stats {
    height: 65px;
  }
  .user-stats {
    display: flex;
    .stats-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      .count {
        font-size: 18px;
      }
      .text {
        font-size: 16.5px;
      }
    }
  }
}

.grid-nav {
  .grid-item {
    height: 70.5px;
    i.toutiao {
      font-size: 23.5px;
    }
    span.text {
      font-size: 14px;
    }
    .toutiao-shoucang {
      color: #eb5235;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
  }
}
.btn-back {
  margin-top: 20px;
  color: red;
}
</style>
