<template>
    <div class="search">
      <div class="pw">
        <div class="searchTop cl">
          <div class="topLeft fl">
            <a href="/">
              <img src="http://i.sfimg.cn/html/images/indexLogo2019.png" alt="">
            </a>
          </div>
          <div class="topRight fr">
            <s></s>
<!--            <a href="" @click="shopCart">我的购物车</a>-->
            <router-link to="/cart">我的购物车</router-link>
            <b>{{count}}</b>
          </div>
          <div class="topcenter">
            <form action="#">
              <label>
                <input type="text" placeholder="冰激凌"><input type='submit' value="搜索">
              </label>
            </form>
            <p>
              <span>松茸</span>
              <span>小龙虾</span>
              <span>桃</span>
              <span>牛奶</span>
              <span>虾</span>
              <span>糖果</span>
              <span>大米</span>
              <span>葡萄酒</span>
              <span>油</span>
            </p>
          </div>
        </div>
        <div class="searchBottom ">
          <ul class="cl">
            <li><a href="">精选商品分类</a></li>
            <li><a href="">首页</a></li>
            <li><a href="">优选生鲜</a></li>
            <li><a href="">优选服务</a></li>
            <li><a href="">优选国际</a></li>
            <li><a href="">企业专区</a></li>
            <li><a href="">优选会员</a></li>
          </ul>
          <img src="http://004.sfimg.cn/web/7a80fda9/7a80fda907bf5107f6967add2a304a51.jpg" alt="">
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
      name: "search",
      props:["count"],
      created() {
        let userName = localStorage.getItem('userName');
        // if(userName === "" || userName === null){
        //   this.$router.push('/login');
        // }
        axios.get("http://49.233.165.235:8080/v1/cart",{
          params:{userName : userName}
        })
          .then((res) => {
            let val = res.data;
            if(val.code === 0){
              this.$store.state.num = val.num;
            }
          })
          .catch((err) => {
            alert(err)
          })
      },
    }
</script>

<style scoped lang="less">
  .search{
    width: 100%;
    height: 136px;
    position: relative;
    .pw{
      .searchTop{
        height: 104px;
        .topLeft{
          padding-top: 5px ;
          img{
            width: 220px;
            height: 69px;
          }
        }
        .topRight{
          border: 2px solid #efefef;
          width: 160px;
          height: 30px;
          line-height: 35px;
          /*background-color: red;*/
          position: relative;
          margin-top: 29px;
          font-size: 12px;
          text-align: center;
          s{
            display: inline-block;
            background: url("http://i.sfimg.cn/html/images/header.png") no-repeat -54px -16px;
            width: 23px;
            height: 21px;
            position: absolute;
            left: 15px;
            top: 7px;
          }
          b{
            display: inline-block;
            width: 35px;
            height: 35px;
            color: white;
            background-color: #fa9600;
            text-align: center;
            font-size: 20px;
            position: absolute;
            right: 0;
            top: -3px;
          }
        }
        .topcenter{
          line-height: 90px;
          height: 100%;
          padding-left: 360px;
          input[type="text"]{
            border: 1px solid #669900;
            width: 425px;
            height: 34px;
            line-height: 34px \9;
            padding: 0 0 0 4px;
            vertical-align: middle;
          }
          input[type="submit"]{
            border: 1px solid #669900;
            color: white;
            background-color: #669900;
            width: 70px;
            height: 36px;
            line-height: 34px \9;
            vertical-align: middle;
          }
          p{
            height: 20px;
            line-height: 20px;
            position: absolute;
            bottom: 50px;
          }
        }
      }
      .searchBottom{
        height: 32px;
        border-bottom: 2px solid #76ac25;
        position: relative;
        ul{
          list-style: none;
          li{
            float: left;
            width: 104px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            font-family: Microsoft YaHei;
            &:hover{
              a{
                color: #669900;
              }
            }
          }
          li:nth-child(1){
            width: 200px;
            a{
              color: white;
            }
            background-color: #76ac25;
          }
        }
        img{
          width: 196px;
          height: 32px;
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
  }

</style>
