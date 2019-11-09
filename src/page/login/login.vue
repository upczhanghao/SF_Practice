<template>
  <div>
    <div class="login">
      <div class="pw">
        <div class="header">
          <a href="/">
            <img src="https://passport.sfbest.com/images/logo.png" alt="">
          </a>
          <p>欢迎登录</p>
        </div>
        <div class="input">
          <div class="login-left">
            <img src="https://passport.sfbest.com/image/b1c64b1a/b1c64b1a208da4d53c5b5015b8aea900.png" alt="">
          </div>
          <div class="login-right">
            <p class="cl">
              <span class="fl">登录</span>
              <span class="fr"><router-link to="/register">立即注册</router-link></span>
            </p>
            <!--            <form action="#">-->
            <!--              <p>优选账号</p>-->
            <!--              <label>-->
            <!--                账号:-->
            <!--              <input type="text" v-model="Name">-->
            <!--            </label>-->
            <!--              <label>-->
            <!--                密码:-->
            <!--              <input type="password" v-model="PassWord">-->
            <!--            </label>-->
            <!--              <input type="submit" value="登录" @click.prevent = "login">-->
            <!--            </form>-->
            <el-form label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="Name"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="PassWord" type="password"></el-input>
              </el-form-item>
<!--              <el-checkbox label="记住用户名" name="type" v-model="Remember" :aria-checked=Remember></el-checkbox>-->
              <label>
                <input type="checkbox" v-model="Remember"><span>记住用户名</span>
              </label>
              <el-button type="primary" @click="login()">登录</el-button>
            </el-form>
          </div>
        </div>
        <div class="footer"></div>
      </div>
    </div>
    <footerIndex></footerIndex>
  </div>
</template>

<script>
  import axios from 'axios'
  import {getCookie} from './../../api/methods'
  import footerIndex from './footerIndex/footerIndex'
    export default {
      name: "login",
      inject:['reload'],
      components:{
        footerIndex
      },
      data(){
          return {
            Name :"",
            PassWord : "",
            Remember : ""
          }
      },
      created(){
        let coo = getCookie("userName");
        let rem = getCookie("remember");
        this.Name = coo;
        this.Remember = rem;
      },
      methods:{
          login(){
            if(this.Remember === true){
              document.cookie = "userName=" + this.Name +";path=/";
              document.cookie = "remember=true;path=/";
            }else{
              document.cookie = "userName=;path=/";
              document.cookie = "remember=;path=/";
            }
            if(this.Name === ""){
              alert("请输入用户名!");
              this.reload();
            }
            if(this.PassWord === ""){
              alert("请输入密码!");
              this.reload();
            }
            axios({
              method:"post",
              url:"http://49.233.165.235:8080/v1/login",
              // headers:{
              //   'Content-Type':'application/x-www-form-urlencoded'
              // },
              data:{
                Name : this.Name,
                PassWord: this.PassWord,
              },
            }).then((res)=>{
              let val = res.data;
              if(val.code === 0){
                // let localStore = {};
                // localStore.userName = val.userName;
                // localStorage.setItem('userName',JSON.stringify(localStore));
                localStorage.setItem('userName',val.userName);
                alert(val.msg);
                this.$router.push('/');
              }else{
                alert(val.msg);
                this.reload();
                // this.$router.push('/register')
              }
            })
              .catch((err)=>{
                alert(err);
              })
          }
      }
    }
</script>

<style scoped lang="less">
  .el-button{
    display: block;
    margin-top: 18px;
  }
  label{
    text-align: left !important;
  }
  .login{
    width: 100%;
    height: 600px;
    position: relative;
    font-family: "Microsoft YaHei";
    .pw{
      position: absolute;
      .header{
        height: 90px;
        line-height: 90px;
        font-size: 25px;
        img{
          width: 240px;
          height: 69px;
          margin: 10px 0;
        }
        p{
          display: inline;
        }
      }
      .input{
        display: flex;
        height: 500px;
        .login-left{
          flex: 1;
          img{
            width: 520px;
            height: 340px;
            margin-top: 80px;
          }
        }
        .login-right{
          width: 600px;
          p{
            width: 60%;
            height: 40px;
            line-height: 40px;
            span:nth-child(1){
              font-size: 25px;
            }
            span:nth-child(2){
              font-size: 15px;
              a{
                color: deepskyblue;
              }
            }
          }
          form{
            margin-top: 40px;
            width: 60%;
            height: 470px;
            font-size: 17px;
            color: #83b933;
            input[type = "checkbox"]{
              display: inline-block;
              width: 14px ;
              height: 14px;
              margin-bottom: 10px;
              margin-top: 10px;
              vertical-align: middle;
            }
            span{
              font-size: 13px;
              height: 17px;
              line-height: 17px;
              font-family: "Microsoft YaHei";
              color: #666;
              margin-left: 7px;
            }
          }
        }
      }
    }
  }
</style>
