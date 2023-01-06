<template>
    <div class="layout-container">
        <router-view></router-view>
        <van-tabbar route  class="layout-tabbar" placeholder>
            <van-tabbar-item  replace to="/">
                <span class="text">首页</span>
                <template >
                    <i slot="icon"  class="toutiao toutiao-shouye"></i>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/qa">
                <span class="text">问答</span>
                <template>
                    <i slot="icon"  class="toutiao toutiao-wenda"></i>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/video">
                <span class="text">视频</span>
                <template >
                    <i slot="icon" class="toutiao toutiao-shipin"></i>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/my">
                <span class="text">{{$store.state.user?'我的':'未登录'}}</span>
                <template>
                    <i slot="icon" class="toutiao toutiao-wode"></i>
                </template>
            </van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 20px;
    }
    span.text{
        font-size: 10px;
    }
  }
}
</style>
