<template>
  <div>
    <div class="register">
      <div class="pw">
        <div class="header">
          <a href="/">
            <img src="https://passport.sfbest.com/images/logo.png" alt="">
          </a>
          <p>欢迎注册</p>
        </div>
        <div class="input">
          <div class="login-left">
            <img src="https://passport.sfbest.com/image/b1c64b1a/b1c64b1a208da4d53c5b5015b8aea900.png" alt="">
          </div>
          <div class="login-right">
            <p class="cl">
              <span class="fl">注册</span>
              <span class="fr"><router-link to="/login">立即登录</router-link></span>
            </p>
            <!--              <form >-->
            <!--&lt;!&ndash;                action="http://127.0.0.1:8080/v1/main" method="post"&ndash;&gt;-->
            <!--                <p>优选账号</p>-->
            <!--                <label>-->
            <!--                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;账号:-->
            <!--                  <input type="text" name="account" v-model="account">-->
            <!--                </label>-->
            <!--                <br>-->
            <!--                <label>-->
            <!--                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱:-->
            <!--                  <input type="text" name="email" v-model="email">-->
            <!--                </label>-->
            <!--                <br>-->
            <!--                <label>-->
            <!--                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密码:-->
            <!--                  <input type="password" name="rePwd" v-model="pwd">-->
            <!--                </label>-->
            <!--                <br>-->
            <!--                <label>-->
            <!--                  确认密码:-->
            <!--                  <input type="password" name="pwd" v-model="rePwd">-->
            <!--                </label>-->
            <!--                <input type="submit" value="注册" @click.prevent ="showData()">-->

            <!--              </form>-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
              </el-form-item>
              <el-form-item label="注册邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submit()">注册</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
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
  import footerIndex from './footerIndex/footerIndex'


  // import qs from 'qs'
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  // axios.interceptors.request.use(config => {
  //
  //   if(config.method === 'post'){
  //
  //     config.data = qs.stringify(config.data);
  //
  //   }
  //
  //   return config;
  //
  // }, error => {
  //
  //   return Promise.reject(error);
  //
  // });
    export default {
      name: "register",
      components:{
        footerIndex
      },
      data(){
          // return {
          //   account :"",
          //   pwd: "",
          //   rePwd : "",
          //   email : ""
          // }
          var checkUser = (rule, value, callback) => {
            setTimeout(() => {
              if (value === '') {
                callback(new Error('请输入用户名'));
              }
              if(String(value).length < 4){
                callback(new Error('用户名必须大于4个字符'));
              }else{
                callback();
              }
            }, 1000);
          };
        var checkEmail = (rule, value, callback) => {
          var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
          if (value === '') {
            callback(new Error('请输入绑定邮箱'));
          }
          setTimeout(() => {
            if (!reg.test(value)) {
              callback(new Error('邮箱格式不正确'));
            } else {
                callback();
            }
          }, 1000);
        };
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if(value.length < 5){
                callback(new Error('密码需大于等于6位'));
              }
              if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
              }
              callback();
            }
          };
          var validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
          return {
            ruleForm: {
              pass: '',
              checkPass: '',
              username: '',
              email: ''
            },
            rules: {
              pass: [
                { validator: validatePass, trigger: 'blur' }
              ],
              checkPass: [
                { validator: validatePass2, trigger: 'blur' }
              ],
              username: [
                { validator: checkUser, trigger: 'blur' }
              ],
              email: [
                { validator: checkEmail, trigger: 'blur' }
              ],
            }
          };
      },
      methods:{
        submit(){
          if(this.ruleForm.username === "" || this.ruleForm.pass ==="" || this.ruleForm.checkPass ==="" || this.ruleForm.email === ""){
            alert("请完善注册信息");
            return;
          }
          axios({
            method:"post",
            url:"http://49.233.165.235:8080/v1/register",
            // headers:{
            //   'Content-Type':'application/x-www-form-urlencoded'
            // },
            data:{
              account : this.ruleForm.username,
              pwd : this.ruleForm.pass,
              rePwd : this.ruleForm.checkPass,
              email : this.ruleForm.email
            },
          }).then((res)=>{
            let val = res.data;
            if(val.code === 0){
              // let localStore = {};
              // localStore.userName = res.data.userName;
              // localStorage.setItem('userName',JSON.stringify(localStore))
              alert(val.msg);
              this.$router.push('/login');
            }else{
              alert(val.msg);
              // this.$router.push('/register')
            }
          })
        },

        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped lang="less">
  .el-button{
    display: inline-block ;
  }
  .register{
    height: 600px;
    width: 100%;
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
            height: 470px;
            font-size: 17px;
            color: #83b933;
            width: 60%;
          }
        }
      }
    }
  }
</style>
