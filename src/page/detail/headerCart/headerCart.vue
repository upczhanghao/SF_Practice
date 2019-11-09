<template>
  <div class="topMenu">
    <div class="pw cl">
      <ul class="topTh fl">
        <li>冷链配送</li>
        <li>顺丰到家</li>
        <li>送至:</li>
        <li>天津</li>
      </ul>
      <ul class="topTh fr">
        <li>嘿，欢迎来顺丰优选！</li>
        <li class="user" @load="disappear"  ref="login">
          <router-link to="/login"><p>请登录</p></router-link>
        </li>
        <li class="show" ref="show">|</li>
        <li class="user" @load="disappear"  ref="register">
          <router-link to="/register"><p>免费注册</p></router-link>
        </li>
        <li>
          <a href="" @click.prevent="addaddr">添加地址</a>
        </li>
        <li>
          <a href="" @click.prevent="addr">我的地址</a>
        </li>
        <li><a href="" @click="logout">退出登录</a></li>
        <li>关于我们</li>
        <li>帮助中心</li>
        <li>网站导航</li>
      </ul>
    </div>
    <div class="pw cart-bottom cl">
      <div class="logo fl">
        <a href="/"><img src="http://i.sfimg.cn/html/images/indexLogo2019.png" alt=""></a>
      </div>
     <div class="cart fr">
       <img src="http://i.sfimg.cn/com/images/step_01.jpg" alt="">
     </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "headerCart",
      mounted() {
        if (localStorage.getItem('userName') !== "" || localStorage.getItem('userName') == null){
          this.disappear();
        }
      },
      methods:{
        disappear(){
          this.$refs.login.style.display = "none";
          this.$refs.register.style.display = "none";
          this.$refs.show.innerHTML = "你好," + localStorage.getItem('userName')
        },
        logout(){
          localStorage.setItem("userName","")
        },
        addr(){
          if(localStorage.getItem('userName') === "" || localStorage.getItem('userName') == null){
            this.$router.push('/login');
          }else{
            this.$router.push('/addr');
          }
        },
        addaddr(){
          if(localStorage.getItem('userName') === "" || localStorage.getItem('userName') == null){
            this.$router.push('/login');
          }else{
            this.$router.push('/addaddr');
          }
        }
      }
    }
</script>

<style scoped lang="less">
  .topMenu{
    width: 100%;
    height: 115px;
    text-align: center;
    background: #f7f7f7;
    border-bottom: 1px solid #eeeeee;
    position: relative;
    .pw{
      position: absolute;
      height: 33px;
      z-index: 999;
      .topTh{
        list-style: none;
        li{
          position: relative;
          height: 100%;
          float: left;
          line-height: 33px;
          padding-left: 5px ;
          padding-right: 5px ;
          z-index: 999;
          &:hover{
            a{
              color: #669900;
            }
          }
        }
      }
    }
    .cart-bottom{
      position: absolute;
      height: 80px;
      margin-top: 34px;
      .logo{
        width: 240px;
        height: 74px;
        padding-top: 5px;
      }
      .cart{
        width: 650px;
        height: 33px;
        padding-top: 30px;
      }
    }
  }

</style>
