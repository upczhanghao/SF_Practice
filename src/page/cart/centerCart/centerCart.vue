<template>
    <div class="cartCenter">
      <div class="pw">
        <div class="cartTop">
          <p>
            我的购物车
            <span>
            提示：请选择您的收货区域，查看更准确的信息
          </span>
          </p>
          <span>送至: </span>&nbsp;
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in address"
              :key="item.Id"
              :label="item.Addr"
              :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <div class="cartMiddle">
          <table cellspacing="0" cellpadding="0" border="0" class="list list1">
            <thead>
            <tr>
              <th width="15%"><input type="checkbox" class="scheckbox"  v-model="scheckbox" @click="checkAll(scheckbox)">全选</th>
              <th width="30%">商品</th>
              <th width="10%">单价</th>
              <th width="15%">数量</th>
              <th width="10%">重量</th>
              <th width="10%">小计</th>
              <th width="10%">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list" v-if="item">
              <td><input type="checkbox" class="sfcheckbox" :id=item.id @click="sfcheckbox(item)"></td>
              <td style="text-align: left">
                <img :src=item.image alt="">
                <span>{{item.name}}</span>
              </td>
              <td>{{item.price}}</td>
              <td class="cartCount">
                <a href="" @click.prevent="edCart(-1,item.id)">-</a>
                <input type="text" :value=item.count @change.prevent="editCart($event,item.id)" :ref=item.id>
                <a href="" @click.prevent="edCart(1,item.id)">+</a>
              </td>
              <td>{{item.unite * item.count  / 1000}} kg</td>
              <td>{{item.price * item.count}}</td>
              <td><a href="" class="f003" @click.prevent="del(item.id)">删除</a></td>
            </tr>
            <tr v-else>
              <td>购物车是空的,请先去购物</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="cartBottom">
          <p>
            <span>
              重量总计：{{totleUnite / 1000}}kg（含包装）
              （不含运费）
            </span>
            <span>
              商品总计：
            </span>
            <b>
              ¥{{totlePrice}}
            </b>
          </p>
          <div class="cartJsuan">
            <input class="goshop" value="继续购物" type="button" @click.prevent="toIndex">
            <input class="jiesuan youxuan" value="去结算" type="button" @click="detail">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
        name: "centerCart",
      data() {
        return {
          address : {},
          value : '',
          list : {},
          totlePrice : 0,
          totleUnite : 0,
          scheckbox : false,
          count : 0,
          arrId : []
        }
      },
      created() {
        let formdata = new FormData();
        formdata.append('userName',localStorage.getItem('userName'));
        axios({
          method: "post",
          url : 'http://49.233.165.235:8080/v1/cart',
          headers: {'Content-Type': 'multipart/form-data'},
          data:formdata,
        })
          .then((res) =>{
            if(res.data.code === 0){
              this.address = res.data.address;
              this.list = res.data.list;
              console.log(res.data);
            }
          })
          .catch((err) => {
            alert(err)
          })
      },
      methods:{
        checkAll(scheckbox){
          let oin = document.querySelectorAll(".sfcheckbox");
          console.log(scheckbox);
          if(scheckbox === false){
            for(let i = 0 ; i < oin.length ;i ++){
              oin[i].checked = "checked";
              //返回所有处于选中状态的input标签的id值
              if(this.arrId.includes(oin[i].id)){

              }else{
                this.arrId.push(oin[i].id);
              }
            }
          }else{
            for(let i = 0 ; i < oin.length ;i ++){
              oin[i].checked = "";
              this.arrId.pop();
            }
          }
          let formdata = new FormData();
          formdata.append('userName',localStorage.getItem('userName'));
          formdata.append('goodsId',this.arrId);
          axios({
            url:'http://49.233.165.235:8080/v1/cart',
            method:'post',
            headers: {'Content-Type': 'multipart/form-data'},
            data:formdata,
          })
            .then((res) =>{
              console.log(res.data);
              if(res.data.code === 0){
                this.totlePrice = res.data.totlePrice;
                this.totleUnite = res.data.totleUnite;
              }
            })
            .catch((err) => {
              alert(err)
            })


        },
        sfcheckbox(item){
          let price = item.count * item.price;
          let unite = item.count * item.unite;
          let oin = document.querySelectorAll(".sfcheckbox");
          let oou = document.querySelector(".scheckbox");
          let temp = 0;
          for(let i = 0; i < oin.length ; i++){
            if(oin[i].checked === true){
              temp += 1;
              //返回所有处于选中状态的input标签的id值
              if(this.arrId.includes(oin[i].id)){

              }else{
                this.arrId.push(oin[i].id);
              }
            }else{
              temp -= 1;
              if(this.arrId.includes(oin[i].id)){
                let res = this.arrId.indexOf(oin[i].id);
                this.arrId = this.arrId.slice(0, res).concat(this.arrId.slice(res + 1));
              }
            }
          }
          let count = oin.length;
          this.scheckbox = oou.checked = temp === count;

          let formdata = new FormData();
          formdata.append('userName',localStorage.getItem('userName'));
          formdata.append('goodsId',this.arrId);
          axios({
            url:'http://49.233.165.235:8080/v1/cart',
            method:'post',
            headers: {'Content-Type': 'multipart/form-data'},
            data:formdata,
          })
            .then((res) =>{
              console.log(res.data);
              if(res.data.code === 0){
                this.totlePrice = res.data.totlePrice;
                this.totleUnite = res.data.totleUnite;
              }
            })
            .catch((err) => {
              alert(err)
            })

        },
        editCart(e,id){
          console.log(id);
          let count = e.target.value;
          if(count <= 0){
            this.del(id);
            return;
          }
          //提交给服务器修改过后的数据 count id userName  Get方法
          axios.get('http://49.233.165.235:8080/v1/editCart',{
            params:{
              count : count,
              userName : localStorage.getItem('userName'),
              id : id
            }
          })
            .then((res) => {
              console.log(res.data);
              if(res.data.code === 0){
                //重新获取服务器数据,利用vue数据驱动界面的性质对界面数据进行部分更新
                let formdata = new FormData();
                formdata.append('userName',localStorage.getItem('userName'));
                formdata.append('goodsId',this.arrId);
                axios({
                  method: "post",
                  url : 'http://49.233.165.235:8080/v1/cart',
                  headers: {'Content-Type': 'multipart/form-data'},
                  data:formdata,
                })
                  .then((res) =>{
                    if(res.data.code === 0){
                      this.address = res.data.address;
                      this.totlePrice = res.data.totlePrice;
                      this.list = res.data.list;
                      this.totleUnite = res.data.totleUnite;
                    }
                  })
                  .catch((err) => {
                    alert(err)
                  })
              }
            })
            .catch((err) => {
              alert(err)
            })
        },
        edCart(code,id){
          let oId = id.toString();
          if(code === -1){
            if(this.$refs[oId][0].value <= 0){
              this.del(id);
              return;
            }else{
              this.$refs[oId][0].value = Number(this.$refs[oId][0].value) - 1;
            }
          }else if(code === 1){
            this.$refs[oId][0].value = Number(this.$refs[oId][0].value) + 1;
          }
          let count = this.$refs[oId][0].value;

          //提交给服务器修改过后的数据 count id userName  Get方法
          axios.get('http://49.233.165.235:8080/v1/editCart',{
            params:{
              count : count,
              userName : localStorage.getItem('userName'),
              id : id
            }
          })
            .then((res) => {
              console.log(res.data);
              if(res.data.code === 0){
                //重新获取服务器数据,利用vue数据驱动界面的性质对界面数据进行部分更新
                //重新获取服务器数据,利用vue数据驱动界面的性质对界面数据进行部分更新
                let formdata = new FormData();
                formdata.append('userName',localStorage.getItem('userName'));
                formdata.append('goodsId',this.arrId);
                axios({
                  method: "post",
                  url : 'http://49.233.165.235:8080/v1/cart',
                  headers: {'Content-Type': 'multipart/form-data'},
                  data:formdata,
                })
                  .then((res) =>{
                    if(res.data.code === 0){
                      this.address = res.data.address;
                      this.totlePrice = res.data.totlePrice;
                      this.list = res.data.list;
                      this.totleUnite = res.data.totleUnite;
                    }
                  })
                  .catch((err) => {
                    alert(err)
                  })
              }
            })
            .catch((err) => {
              alert(err)
            })
        },
        del(id){
          let count = 0;
          //提交给服务器修改过后的数据 id userName  Get方法
          axios.get('http://49.233.165.235:8080/v1/editCart',{
            params:{
              count : count,
              userName : localStorage.getItem('userName'),
              id : id
            }
          })
            .then((res) => {
              console.log(res.data);
              if(res.data.code === 0){
                //重新获取服务器数据,利用vue数据驱动界面的性质对界面数据进行部分更新
                let formdata = new FormData();
                formdata.append('userName',localStorage.getItem('userName'));
                formdata.append('goodsId',this.arrId);
                axios({
                  method: "post",
                  url : 'http://49.233.165.235:8080/v1/cart',
                  headers: {'Content-Type': 'multipart/form-data'},
                  data:formdata,
                })
                  .then((res) =>{
                    if(res.data.code === 0){
                      this.address = res.data.address;
                      this.totlePrice = res.data.totlePrice;
                      this.list = res.data.list;
                      this.totleUnite = res.data.totleUnite;
                    }
                  })
                  .catch((err) => {
                    alert(err)
                  })
              }
            })
            .catch((err) => {
              alert(err)
            })
        },
        toIndex(){
          this.$router.push('/');
        },
        detail(){
          sessionStorage.setItem("arrId",JSON.stringify(this.arrId));
          sessionStorage.setItem("value",this.value);
          this.$store.state.arrId = this.arrId;
          this.$store.state.addressId = this.value;
          console.log(this.$store);
          this.$router.push({
            name:"detail",
          })
        }
      },
    computed:{

    }
    }
</script>

<style scoped lang="less">
  .cartCenter{
    margin-top: 20px;
    width: 100%;
    height: 600px;
    position: relative;
    .pw{
      position: absolute;
      .cartTop{
        height: 80px;
        p{
          font-size: 20px;
          font-weight: bold;
          font-family: "Microsoft YaHei";
          line-height: 20px;
          margin-bottom: 10px;
          span{
            font-size: 13px;
            font-weight: normal;
            margin-left: 10px;
          }
        }
        span{
          font-size: 20px;
          font-weight: bold;
          font-family: "Microsoft YaHei";
          line-height: 20px;
          margin-bottom: 10px;
        }
      }
      .cartMiddle{
        margin-bottom: 10px;
        table{
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
                input{
                  vertical-align: middle;
                }
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
                height: 50px;
                line-height: 50px;
                padding: 6px;
                border-bottom: 1px solid #dddddd;
                border-left: none;
                img{
                  width: 50px;
                  height: 50px;
                }
              }
              .cartCount{
                input{
                  width: 30px;
                  height: 18px;
                  line-height: 50px;
                  text-align: center;
                  display: inline-block;
                  vertical-align: middle;
                }
                a{
                  display: inline-block;
                  width: 15px;
                  height: 15px;
                  line-height: 15px;
                  font-size: 15px;
                  text-align: center;
                  border: 1px solid #ccc;
                }
              }
            }
          }
        }
      }
      .cartBottom{
        p{
          height: 45px;
          border: 1px solid #ccc;
          line-height: 45px;
          text-align: right;
          padding: 0 20px;
          span{
            font-size: 15px;
            font-family: Arial, Helvetica, sans-serif;
            padding: 0;
            color: #565656;
          }
          b{
            color: #EA5404;
            font-size: 22px;
          }
        }
        .cartJsuan{
          height: 45px;
          padding: 10px;
          text-align: right;
          font-size: 13px;
          font-family: Arial, Helvetica, sans-serif;
          .goshop {
            background: url("http://i.sfimg.cn/pcfront/cart/images/header.png") no-repeat 0 -225px;
            height: 28px;
            width: 73px;
            border: 1px solid #a5cf69;
            color: #666666;
            margin: 0 10px 0 0;
            cursor: pointer;
          }
          .jiesuan {
            background: #6e9b0c;
            height: 45px;
            width: 150px;
            border: 0;
            color: #FFF;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
