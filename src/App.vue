<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<style lang="less">
    #app {
        height: 100%;
        width: 100%;
    }

    html, body {
        height: 100%;
        width: 100%;
      margin: 0;
      padding: 0;
    }
    .Tutorial .van-nav-bar__content{
      background: rgb(241,243,245)!important;
    }
    .van-nav-bar .van-icon{
      color: #000!important;
    }
    .van-nav-bar__content{
      display: block!important;
    }
    .van-nav-bar__title{
      margin: 0!important;
      line-height: 46px!important;
      max-width: 80% !important;
      text-align: left!important;
      padding-left: 40px!important;
    }
    *{
      moz-user-select: -moz-none;
      -moz-user-select: none;
      -o-user-select:none;
      -khtml-user-select:none;
      -webkit-user-select:none;
      -ms-user-select:none;
      user-select:none;
    }
</style>
