<template>
  <div class="banner">
    <div class="pw">
      <div class="pd">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide><img src="http://003.sfimg.cn/web//209f2bb5/209f2bb585bab505c70979338b03bd57.jpg" alt="">
          </swiper-slide>
          <swiper-slide><img src="http://003.sfimg.cn/web//34772b7d/34772b7d8a2c1c00bb8f66d4e6839f16.jpg" alt="">
          </swiper-slide>
          <swiper-slide><img src="http://001.sfimg.cn/web//244e616d/244e616d93cbf79332a8e751511da251.jpg" alt="">
          </swiper-slide>
          <swiper-slide><img src="http://001.sfimg.cn/web//f8cd14b7/f8cd14b75bde809b3a8727fd70901421.jpg" alt="">
          </swiper-slide>
          <swiper-slide><img src="http://004.sfimg.cn/web//3422b57b/3422b57bcc7df700106d8afb10540686.jpg" alt="">
          </swiper-slide>
          <swiper-slide><img src="http://002.sfimg.cn/web//1a9c1b66/1a9c1b66206c89c59f26f857df1265ab.jpg" alt="">
          </swiper-slide>
          <swiper-slide><img src="http://001.sfimg.cn/web//1c938ef7/1c938ef756ee39409e1d42feb6e1e1cb.jpg" alt="">
          </swiper-slide>
          <swiper-slide><img src="http://001.sfimg.cn/web//2ca98463/2ca984635653bc787cb1567a5fd9df70.jpg" alt="">
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="bannerLeft">
          <ul class="mainul">
            <li class="mainli">
              <p class="icon"></p>
              <a href="">肉类海鲜</a>
              <ul>
                <li>牛肉</li>
                <li>羊肉</li>
                <li>参鲍</li>
                <li>鱼</li>
              </ul>
            </li>
            <li>
              <p class="icon"></p>
              <a href="">新鲜果蔬</a>
              <ul>
                <li>柑橘橙</li>
                <li>猕猴桃</li>
                <li>蔬菜</li>
              </ul>
            </li>
            <li>
              <p class="icon"></p>
              <a href="">速食冷藏</a>
              <ul>
                <li>速冻食品</li>
                <li>蛋</li>
                <li>冷冻甜点</li>
              </ul>
            </li>
            <li>
              <p class="icon"></p>
              <a href="">酒水饮料</a>
              <ul>
                <li>葡萄酒</li>
                <li>啤酒</li>
                <li>白酒</li>
                <li>牛奶</li>
              </ul>
            </li>
            <li>
              <p class="icon"></p>
              <a href="">休闲糖巧</a>
              <ul>
                <li>巧克力</li>
                <li>坚果</li>
                <li>曲奇</li>
              </ul>
            </li>
            <li>
              <p class="icon"></p>
              <a href="">粮油干货</a>
              <ul>
                <li>橄榄油</li>
                <li>泰国米</li>
                <li>枣</li>
              </ul>
            </li>
            <li>
              <p class="icon"></p>
              <a href="">冲调茶饮</a>
              <ul>
                <li>蜂蜜</li>
                <li>咖啡</li>
                <li>麦片</li>
                <li>茗茶</li>
              </ul>
            </li>
            <li>
              <p class="icon"></p>
              <a href="">优选国际</a>
              <ul>
                <li>奶粉</li>
                <li>彩妆</li>
                <li>营养</li>
                <li>家居用品</li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="bannerRight">
          <div class="r1">
            <a href="">
              <img src="http://004.sfimg.cn/web/2006b472/2006b47200a477140d0856bfaaa02dc8.jpg" alt="">
            </a>
          </div>
          <div class="r2">
            <a href="">
              <img src="http://004.sfimg.cn/web/173c5289/173c52897672ab1c3d161d4d7a7edc7a.jpg" alt="">
            </a>
          </div>
          <div class="r3">
            <a href="">
              <img src="http://001.sfimg.cn/web/e1a44c83/e1a44c83566ed5a1ed42cab0de3abb01.jpg" alt="">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  // require styles
  import 'swiper/dist/css/swiper.css'

  export default {
    name: "banner",
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          direction: 'horizontal',
          loop: true, // 循环模式选项
          autoplay: {
              disableOnInteraction : false,
              delay : 1500,
          },
          observer: true,
          observeParents: true,
          pagination: {
            el: '.swiper-pagination',
          },
        }
      }
    },
  }
</script>

<style scoped lang="less">
  .banner {
    height: 480px;
    position: relative;
    margin-top: 2px;
    font-family: Microsoft YaHei;
    .pw {
      height: 480px;
      margin-left: 200px;
      position: relative;
      .pd {
        width: 1000px;
        swiper{
          img {
            width: 1000px;
            height: 480px;
          }
        }
        .bannerLeft{
          width: 200px;
          height: 100%;
          background-color: #76ac25;
          position: absolute;
          left: -200px;
          bottom: 0;
          padding-top: 8px;
          padding-left: 10px;
          box-sizing: border-box;
          .mainul{
            list-style: none;
            li{
              position: relative;
              height: 58px;
              a{
                color: white;
                font-size: 14px;
                position: absolute;
                top: 5px;
                left: 30px;
                &:hover{
                  text-decoration: underline;
                }
              }
              ul{
                position: absolute;
                bottom: 10px;
                left: 30px;
                list-style: none;
                overflow: hidden;
                li{
                  float: left;
                  color: white;
                  height: 20px;
                  margin-right: 5px;
                  &:hover{
                    text-decoration: underline;
                  }
                }
              }
            }
            li:nth-child(1){
              &:hover{
                p{
                  background: url("http://i.sfimg.cn/html/images/left_lm_m.png") no-repeat 0 5px;
                  width: 16px;
                  height: 22px;
                  position: absolute;
                  top: 2px;
                  left: 8px;
                  font-size: 20px;
                }
                background-color: white;
                a{
                  color: #76ac25;
                }
                ul>li{
                  color: #76ac25;
                }
              }
              p{
                background: url("http://i.sfimg.cn/html/images/left_lm_m_a.png") no-repeat 0 5px;
                width: 16px;
                height: 22px;
                position: absolute;
                top: 2px;
                left: 8px;
                font-size: 20px;
              }
            }
            li:nth-child(2){
              &:hover{
                p{
                  background: url("http://i.sfimg.cn/html/images/left_lm_m.png") no-repeat 0 5px;
                  width: 16px;
                  height: 22px;
                  position: absolute;
                  top: 2px;
                  left: 8px;
                  font-size: 20px;
                }
                background-color: white;
                a{
                  color: #76ac25;
                }
                ul>li{
                  color: #76ac25;
                }
              }
              p{
                background: url("http://i.sfimg.cn/html/images/left_lm_m_a.png") no-repeat 0 -159px;
                width: 16px;
                height: 22px;
                position: absolute;
                top: 2px;
                left: 8px;
                font-size: 20px;
              }
            }
            li:nth-child(3){
              &:hover{
                p{
                  background: url("http://i.sfimg.cn/html/images/left_lm_m.png") no-repeat 0 5px;
                  width: 16px;
                  height: 22px;
                  position: absolute;
                  top: 2px;
                  left: 8px;
                  font-size: 20px;
                }
                background-color: white;
                a{
                  color: #76ac25;
                }
                ul>li{
                  color: #76ac25;
                }
              }
              p{
                background: url("http://i.sfimg.cn/html/images/left_lm_m_a.png") no-repeat 0 -324px;
                width: 16px;
                height: 22px;
                position: absolute;
                top: 2px;
                left: 8px;
                font-size: 20px;
              }
            }
            li:nth-child(4){
              &:hover{
                p{
                  background: url("http://i.sfimg.cn/html/images/left_lm_m.png") no-repeat 0 5px;
                  width: 16px;
                  height: 22px;
                  position: absolute;
                  top: 2px;
                  left: 8px;
                  font-size: 20px;
                }
                background-color: white;
                a{
                  color: #76ac25;
                }
                ul>li{
                  color: #76ac25;
                }
              }
              p{
                background: url("http://i.sfimg.cn/html/images/left_lm_m_a.png") no-repeat 0 -47px;
                width: 16px;
                height: 22px;
                position: absolute;
                top: 2px;
                left: 8px;
                font-size: 20px;
              }
            }
            li:nth-child(5){
              &:hover{
                p{
                  background: url("http://i.sfimg.cn/html/images/left_lm_m.png") no-repeat 0 5px;
                  width: 16px;
                  height: 22px;
                  position: absolute;
                  top: 2px;
                  left: 8px;
                  font-size: 20px;
                }
                background-color: white;
                a{
                  color: #76ac25;
                }
                ul>li{
                  color: #76ac25;
                }
              }
              p{
                background: url("http://i.sfimg.cn/html/images/left_lm_m_a.png") no-repeat 0 -106px;
                width: 16px;
                height: 22px;
                position: absolute;
                top: 2px;
                left: 8px;
                font-size: 20px;
              }
            }
            li:nth-child(6){
              &:hover{
                p{
                  background: url("http://i.sfimg.cn/html/images/left_lm_m.png") no-repeat 0 5px;
                  width: 16px;
                  height: 22px;
                  position: absolute;
                  top: 2px;
                  left: 8px;
                  font-size: 20px;
                }
                background-color: white;
                a{
                  color: #76ac25;
                }
                ul>li{
                  color: #76ac25;
                }
              }
              p{
                background: url("http://i.sfimg.cn/html/images/left_lm_m_a.png") no-repeat 0 -270px;
                width: 16px;
                height: 22px;
                position: absolute;
                top: 2px;
                left: 8px;
                font-size: 20px;
              }
            }
            li:nth-child(7){
              &:hover{
                p{
                  background: url("http://i.sfimg.cn/html/images/left_lm_m.png") no-repeat 0 5px;
                  width: 16px;
                  height: 22px;
                  position: absolute;
                  top: 2px;
                  left: 8px;
                  font-size: 20px;
                }
                background-color: white;
                a{
                  color: #76ac25;
                }
                ul>li{
                  color: #76ac25;
                }
              }
              p{
                background: url("http://i.sfimg.cn/html/images/left_lm_m_a.png") no-repeat 0 -213px;
                width: 16px;
                height: 22px;
                position: absolute;
                top: 2px;
                left: 8px;
                font-size: 20px;
              }
            }
            li:nth-child(8){
              &:hover{
                p{
                  background: url("http://i.sfimg.cn/html/images/left_lm_m.png") no-repeat 0 5px;
                  width: 16px;
                  height: 22px;
                  position: absolute;
                  top: 2px;
                  left: 8px;
                  font-size: 20px;
                }
                background-color: white;
                a{
                  color: #76ac25;
                }
                ul>li{
                  color: #76ac25;
                }
              }
              p{
                background: url("http://i.sfimg.cn/html/images/left_lm_m_a.png") no-repeat 0 -378px;
                width: 16px;
                height: 22px;
                position: absolute;
                top: 2px;
                left: 8px;
                font-size: 20px;
              }
            }
          }
        }
        .bannerRight{
          width: 260px;
          height: 100%;
          position: absolute;
          right: 200px;
          /*background-color: red;*/
          bottom: 0;
          z-index: 999;
          .r1{
            margin-top: 20px;
          }
          .r2{
            margin-top: 2px;
            margin-bottom: 2px;
          }
        }
      }
    }
  }
</style>
