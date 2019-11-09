<template>
    <div class="addr">
      <div class="pw">
        <div class="addr-top">
          <span class="my-sf">我的优选</span>
          >
          <a href="">收货地址</a>
        </div>
        <div class="cl">
          <div class="addr-left fl">
            <p>会员中心</p>
            <ul>
              <li>我的顺丰</li>
              <li>账户信息</li>
              <li>收货地址</li>
              <li>账户安全</li>
              <li>我的消息</li>
              <li>文章评论</li>
              <li>推荐有奖</li>
              <li>在线客服</li>
            </ul>
          </div>
          <div class="addr-right fr">
            <b>修改地址</b>
            <div class="list3">
              <ul>
                <li>
                  <h4>收货地址：</h4>
                  <p>
                    <input type="text" class="text"  size="40" maxlength="40" v-model="address">
                    <span id="e_addr">*</span>
                  </p>
                </li>
                <li>
                  <h4>收件人姓名：</h4>
                  <p>
                    <input type="text" class="text"  maxlength="10" v-model="name" >
                    <span id="e_name">*</span>
                  </p>
                </li>
                <li>
                  <h4>联系电话：</h4>
                  <p>
                    <input type="text" class="text" size="20" maxlength="11&quot;"  v-model="phone">
                    <span id="e_mobile">*</span>
                  </p>
                </li>
                <li>
                  <h4>邮编：</h4>
                  <p>
                    <input type="text" class="text" size="20" maxlength="11&quot;"  v-model="youbian">
                    <span id="e_email">*</span>
                  </p>
                </li>
                <li class="leixing">
                  <h4>地址类型：<span id="e_leixing">*</span></h4>
                  <p>
                    <input type="radio" class="text" name="leixing" value="0" v-model="leixing">
                    公司
                    <input type="radio" class="text" name="leixing" value="1" v-model="leixing">
                    家
                    <input type="radio" class="text" name="leixing" value="2" v-model="leixing">
                    其他
                  </p>

                </li>
                <li>
                  <p>
                    <input type="checkbox" v-model="IsDefault"> 设置为默认地址
                  </p>
                </li>
              </ul>
              <input type="button"  value="确认修改" class="submit1" @click="edit">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "editAddr",
      data(){
        return {
          address : "",
          name : "",
          phone : "",
          youbian : "",
          id : -1,
          IsDefault : false,
          leixing: "",
        }
      },
      created() {
        this.id = this.$route.params.id;
        console.log(this.id)
      },
      mounted() {
          //从后端获取地址信息
        axios.get('http://49.233.165.235:8080/v1/editAddr',{
          params:{id : this.id}
        })
          .then((res) => {
            let val = res.data;
            if(val.code === 0){
              let list = val.list;
              this.IsDefault = list.IsDefault;
              this.leixing = list.AddType;
              this.address = list.Addr;
              this.name = list.Receiver;
              this.phone = list.Phone;
              this.youbian = list.Code;
            }
          })
          .catch((err) => {
            alert(err)
          })
      },
      methods:{
          edit(){
            let formdata = new FormData();
            formdata.append('id',this.id);
            formdata.append('address',this.address);
            formdata.append('name',this.name);
            formdata.append('phone',this.phone);
            formdata.append('youbian',this.youbian);
            formdata.append('leixing',this.leixing);
            formdata.append('defa',this.IsDefault);
            //省略数据校验
            axios({
              url:'http://49.233.165.235:8080/v1/editAddr',
              method:'post',
              headers: {'Content-Type': 'multipart/form-data'},
              data:formdata,
            })
              .then((res)=>{
                let val = res.data;
                console.log(val);
                if(val.code === 0){
                  alert(val.msg);
                  this.$router.push('/addr')
                }else{
                  alert(val.msg)
                }
              })
              .catch((err)=>{
                alert(err)
              })
          }
      }
    }
</script>

<style scoped lang="less">
  .addr{
    width: 100%;
    height: 500px;
    position: relative;
    .pw{
      position: absolute;
      .addr-top{
        border-top: 2px solid #679800;
        height: 40px;
        line-height: 40px;
        .my-sf{
          color: #515151;
          font-size: 14px;
          font-family: "Microsoft YaHei";
        }
      }
      .addr-left{
        width: 155px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        p{
          font-size: 15px;
          font-family: "Microsoft YaHei";
          color: #515151;
          text-indent: 1em;
          height: 40px;
          line-height: 40px;
        }
        ul{
          list-style: none;
          text-align: center;
          width: 100%;
          li{
            height: 30px;
            line-height: 30px;
            font-size: 13px;
            &:hover{
              background-color: #6bc30d;
            }
          }
          li:nth-child(3){
            background-color: #69af05;
          }
        }
      }
      .addr-right{
        width: 1045px;
        b{
          display: block;
          font-size: 14px;
          color: #669900;
          font-family: 微软雅黑;
          font-weight: bold;
          text-indent: 1em;
          height: 40px;
          line-height: 40px;
          border-bottom: 2px solid #679800;
          margin-left: 10px;
        }
        .list3{
          margin-left: 10px;
          ul{
            margin-left: 30px;
            li{
              height: 60px;
              margin: 10px;
              span{
                color: red;
              }
              .text{
                font-size: 12px;
                border: 1px solid #dadada;
                margin: 0px;
                padding: 0px 0px 0px 4px;
                height: 20px;
                line-height: 20px;
              }
            }
            .leixing{
              p{
                height: 30px;
                line-height: 30px;
                input{
                  vertical-align: middle;
                  margin-left: 10px;
                }
              }
            }
            li:last-child{
              height: 20px;
            }
          }
          .submit1{
            font-size: 12px;
            background-color: #6c9c0a;
            color: #fff;
            border: none;
            padding: 0px 4px 0px 4px;
            height: 22px;
            line-height: 22px;
            cursor: pointer;
            vertical-align: middle;
            margin-left: 30px;
          }
        }
      }
    }
  }
</style>
