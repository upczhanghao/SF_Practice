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
            <p>收货地址</p>
            <span>(收货地址上限100个)</span>
            <table cellspacing="0" cellpadding="0" border="0" class="list list1">
              <thead>
              <tr>
                <th width="5%"><input type="checkbox" class="scheckbox" v-model="scheckbox" @click="checkAll(scheckbox)"></th>
                <th width="10%">收货人姓名</th>
                <th width="30%">地址</th>
                <th width="10%">地址类型</th>
                <th width="15%">座机/手机号</th>
                <th width="12%">邮编</th>
                <th width="10%">是否默认</th>
                <th width="8%">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in list" :key="item.Id" >
                <td><input type="checkbox" class="sfcheckbox" :id=item.Id @click="sfcheckbox()"></td>
                <td>{{item.Receiver}}</td>
                <td>{{item.Addr}}</td>
                <td>{{leixing[item.AddType]}}</td>
                <td>{{item.Phone}}</td>
                <td>{{item.Code}}</td>
                <td><input name="addr" type="radio" id="addr" value="14132993" :checked=item.IsDefault @click="editDefault(item.Id)"></td>
                <td><a href="" class="f003" @click.prevent="edit(item.Id)">编辑</a></td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td colspan="6">
                  <input type="button" value=" 删除 " class="submit1" @click="del">&nbsp;&nbsp;
                  <input value="新增收货地址" class="submit1" type="button" @click.prevent="addaddr">
                </td>
              </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
      name: "addre",
      inject:['reload'],
      data(){
        return {
          list : {},
          leixing:["公司","家","其他"],
          scheckbox : false,
        }
      },
      mounted() {
        axios.get('http://49.233.165.235:8080/v1/addr', {
            params: {userName : localStorage.getItem('userName')}
        })
          .then((response) => {
            if(response.data.code === 0){
              let data = response.data;
              this.list = data.addrList
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      methods:{
        addaddr(){
          if(localStorage.getItem('userName') === "" || localStorage.getItem('userName') == null){
            this.$router.push('/login');
          }else{
            this.$router.push('/addaddr');
          }
        },
        edit(id){
          if(localStorage.getItem('userName') === "" || localStorage.getItem('userName') == null){
            this.$router.push('/login');
          }else{
            this.$router.push({
              name:"edit",
              params:{id : id}
            })
          }
        },
        editDefault(id){
          axios.get('http://49.233.165.235:8080/v1/def', {
            params: {Id : id}
          })
            .then((response) => {
              if(response.data.code === 0){
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        checkAll(scheckbox){
          let oin = document.querySelectorAll(".sfcheckbox");
          if(scheckbox === false){
            for(let i = 0 ; i < oin.length ;i ++){
              oin[i].checked = "checked";
            }
          }else{
            for(let i = 0 ; i < oin.length ;i ++){
              oin[i].checked = "";
            }
          }
        },
        sfcheckbox(){
          let oin = document.querySelectorAll(".sfcheckbox");
          let oou = document.querySelector(".scheckbox");
          let temp = 0;
          for(let i = 0; i < oin.length ; i++){
            if(oin[i].checked === true){
              temp += 1;
            }else{
              temp -= 1;
            }
          }
          let count = this.list.length;
          oou.checked = temp === count;
        },
        del(){
          let arr = [];
          let oin = document.querySelectorAll(".sfcheckbox");
          for(let i = 0; i < oin.length ; i++){
            if(oin[i].checked === true){
              arr.push(oin[i].id)
            }
          }
          console.log(arr);
          if(arr.length === 0){
            alert("请选择需要删除的地址列表!");
            return;
          }
         axios.get('http://49.233.165.235:8080/v1/addrDel',{
           params:{id: arr.toString()}
         })
           .then(() => {
             this.reload()
           })
           .catch((err) => {
             alert(err)
           })
        }
      },
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
        p{
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
        span{
          display: block;
          height: 30px;
          line-height: 30px;
          font-size: 13px;
          color: red;
          margin-left: 10px;
          text-indent: 1em;
          background-color: #f5f5f5;
        }
        table{
          margin-left: 10px;
          width: 100%;
          border: 1px solid #dddddd;
          background: #f5f5f5;
          border-collapse: collapse;
          border-spacing: 0;
          thead{
            display: table-header-group;
            vertical-align: middle;
            border-color: inherit;
            tr{
              display: table-row;
              vertical-align: inherit;
              border-color: inherit;
              th{
                background: #81a84a;
                font-size: 12px;
                text-align: center;
                padding: 6px;
                color: #fff;
              }
            }
          }
          tbody{
            background: #f5f5f5;
            display: table-row-group;
            vertical-align: middle;
            border-color: inherit;
            tr{
              display: table-row;
              vertical-align: inherit;
              border-color: inherit;
              td{
                text-align: center;
                padding: 6px;
                border-bottom: 1px solid #dddddd;
                border-left: none;

              }
            }
          }
          tfoot{
            display: table-footer-group;
            vertical-align: middle;
            border-color: inherit;
            tr{
              display: table-row;
              vertical-align: inherit;
              border-color: inherit;
              td{
                padding: 6px;
                text-align: right;
                line-height: 18px;
                .submit1{
                  font-size: 12px;
                  background-color: #6c9c0a;
                  color: #fff;
                  border: none;
                  margin: 0px 0px 0px 0px;
                  padding: 0px 4px 0px 4px;
                  height: 22px;
                  line-height: 22px;
                  cursor: pointer;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
