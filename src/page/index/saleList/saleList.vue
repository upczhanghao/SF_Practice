<template>
    <div class="saleList">
      <div class="pw">
        <div v-for="item in type" :key="item.Id">
          <div class="listTop">
            <img src="http://004.sfimg.cn/web/255d1b2f/255d1b2ff58a4c74a9b8daaf2f4a71ee.jpg" alt="">
          </div>
          <div class="listBottom cl">
            <div class="bottomLeft">
              <div class="intro">
                <b></b>
                <span>{{item.Name}}</span>
              </div>
              <div class="pic">
                <img :src=item.Image alt="">
              </div>
            </div>
            <div class="bottomCenter">
              <ul>
                <li  v-for="idle in list" :key="idle.Id" v-if="idle.GoodsType.Id === item.Id">
                  <div class="addCart">
                    <a href="" :num = "idle.Id" @click.prevent="add(idle.Id)"><s></s>加入购物车</a>
                  </div>
                  <img :src=idle.Image alt="">
                  <p class="text">{{idle.Name}}</p>
                  <p class="price">￥{{idle.Price}}</p>
                </li>
              </ul>
            </div>
            <div class="bottomRight fr">
              <ul>
                <li>瓜类</li>
                <li>梨</li>
                <li>苹果</li>
                <li>榴莲</li>
                <li>芒果</li>
                <li>桃</li>
                <li>橙</li>
                <li>荔枝</li>
                <li>火龙果</li>
              </ul>
              <img src="http://001.sfimg.cn/web/765a2d3f/765a2d3f8a5804811d984e3339e40f77.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
      name: "saleList",
      data(){
        return {
          list :{},
          type :{},
        }
      },
      mounted() {
        axios.get('http://49.233.165.235:8080/v1/list', {

        })
          .then((response) => {
            if(response.data.code === 0){
              let data = response.data;
              this.list = data.list;
              this.type = data.type;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      methods:{
        add(id){
          axios.get('http://49.233.165.235:8080/v1/addCart', {
            params:{id : id,userName : localStorage.getItem('userName')}
          })
            .then((res) => {
              let val = res.data;
              if(val.code === 0){
                this.$store.state.num = val.num;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
</script>

<style scoped lang="less">
  .saleList{
    position: relative;
    height: 4430px;
    .pw{
      height: 100%;
      .listTop{
        margin-top: 30px;
        height: 100px;
        img{
          width: 1200px;
          height: 100px;
        }
      }
      .listBottom{
        margin-top: 30px;
        height: 470px;
        border-top: 1px solid #83b933;
        border-top-left-radius: 11px;
        box-sizing: border-box;
        display: flex;
        .bottomLeft{
          width: 250px;
          .intro{
            height: 50px;
            background-color: #83b933;
            border-top-left-radius: 10px;
            text-align: center;
            color: white;
            font-size: 16px;
            line-height: 50px;
            b{
              background: url("http://i.sfimg.cn/html/images/index_icon_new.png") no-repeat -97px -295px;
              width: 15px;
              height: 16px;
              display: inline-block;
            }
          }
          .pic{
            width: 250px;
            height: 420px;
            img{
              width: 260px;
              height: 420px;
              margin-left: -10px;
            }
          }
        }
        .bottomCenter{
          width: 730px;
          height: 469px;
          padding: 7px 10px;
          box-sizing: border-box;
          border-bottom: 1px solid #83b933;
          ul{
            width: 100%;
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            li{
              width: 176px;
              height: 228px;
              padding: 8px;
              box-sizing: border-box;
              position: relative;
              &:hover{
                .addCart{
                  opacity: 1;
                }
              }
              img{
                width: 160px;
                height: 160px;
              }
              .text{
                font-size: 12px;
                padding: 5px 0;
              }
              .price{
                font-size: 14px;
                color: #f33f00;
                padding: 5px 0;
              }
              .addCart{
                width: 160px;
                height: 24px;
                line-height: 24px;
                border-radius: 2px;
                text-align: center;
                background: #76ac25;
                position: absolute;
                bottom: 55px;
                opacity: 0;
                transition: all 0.5s;
                a{
                  color: white;
                  font-size: 12px;
                  padding-left: 20px;
                  height: 24px;
                  position: relative;
                  s{
                    background: url("http://i.sfimg.cn/html/images/indexsprite.png") no-repeat -66px -177px;
                    display: inline-block;
                    font-size: 20px;
                    width: 24px;
                    height: 24px;
                    position: absolute;
                    left: 0;
                  }
                }
              }
            }
          }
        }
        .bottomRight{
          width: 220px;
          height: 469px;
          position: relative;
          background: #f4f4f4;
          ul{
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            width: 200px;
            height: 200px;
            position: absolute;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            li{
              width: 58.5px;
              height: 58.5px;
              box-sizing: border-box;
              margin: 4px;
              text-align: center;
              border-radius: 50%;
              background-color: #fff;
              line-height: 55px;
            }
          }
          img{
            width: 200px;
            height: 239px;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
</style>
