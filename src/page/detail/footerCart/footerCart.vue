<template>
  <div class="footer">
    <div class="footer-top">
      <div class="pw">
        <ul class="cl">
          <li class="fl"></li>
          <li class="fl"></li>
          <li class="fl"></li>
          <li class="fl"></li>
        </ul>
      </div>
    </div>
    <div class="footer-middle">
      <div class="pw">
        <ul class="cl">
          <li class="fl footer-left">
            <p>9533858</p>
            <p>周一至周日09:00-20:00</p>
          </li>
          <li class="fl cl">
            <ul class="fl">
              <li class="title">购物指南</li>

              <li><a rel="nofollow" href="http://help.sfbest.com/140/133.html" target="_blank">积分制度</a></li>

              <li><a rel="nofollow" href="http://help.sfbest.com/140/132.html" target="_blank">会员介绍</a></li>

              <li><a rel="nofollow" href="http://help.sfbest.com/140/128.html" target="_blank">购物流程</a></li>

              <li><a rel="nofollow" href="http://help.sfbest.com/140/138.html" target="_blank">常见问题</a></li>
              <li><a rel="nofollow" href="http://iocs.sf-express.com/live800/chatClient/chatbox.jsp?companyID=9052&amp;configID=16" target="_blank">在线客服</a></li>
            </ul>
            <ul class="fl">
              <li class="title">商家中心</li>
              <li><a rel="nofollow" href="http://help.sfbest.com/392/7232.html" target="_blank">商家规则</a></li>
              <li><a rel="nofollow" href="http://help.sfbest.com/392/8659.html" target="_blank">食品安全规范</a></li>
              <li><a rel="nofollow" href="" target="_blank">委托管理创业招募</a></li>
            </ul>
            <ul class="fl">
              <li class="title">配送服务</li>

              <li><a rel="nofollow" href="http://help.sfbest.com/141/134.html" target="_blank">配送政策</a></li>

              <li><a rel="nofollow" href="http://help.sfbest.com/141/136.html" target="_blank">开箱验货</a></li>

              <li><a rel="nofollow" href="http://help.sfbest.com/141/137.html" target="_blank">配送运费</a></li>

              <li><a rel="nofollow" href="http://help.sfbest.com/141/135.html" target="_blank">配送范围</a></li>
            </ul>
            <ul class="fl">
              <li class="title">支付方式</li>

              <li><a rel="nofollow" href="http://help.sfbest.com/143/139.html" target="_blank">货到付款</a></li>

              <li><a rel="nofollow" href="http://help.sfbest.com/143/141.html" target="_blank">在线支付</a></li>

              <li><a rel="nofollow" href="http://help.sfbest.com/143/131.html" target="_blank">优选卡</a></li>

              <li><a rel="nofollow" href="http://help.sfbest.com/143/142.html" target="_blank">发票制度</a></li>
            </ul>
            <ul class="fl">
              <li class="title">售后服务</li>

              <li><a rel="nofollow" href="http://help.sfbest.com/144/145.html" target="_blank">退款说明</a></li>

              <li><a rel="nofollow" href="http://help.sfbest.com/144/144.html" target="_blank">退换货流程</a></li>

              <li><a rel="nofollow" href="http://help.sfbest.com/144/143.html" target="_blank">退换货政策</a></li>

              <li><a rel="nofollow" href="http://help.sfbest.com/390/4643.html" target="_blank">隐私条款</a></li>
            </ul>
          </li>
          <li class="fl cl">
            <div class="phone fl">
              <p>
                手机客户端
              </p>
              <span></span>
            </div>
            <div class="wechat fl">
              <p>
                官方微信
              </p>
              <span></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="pw">
        <ul class="cl">
          <li class="fl">
            <img src="http://rr.knet.cn/static/images/logo/credit.png" alt="">
          </li>
          <li class="fl">
            <img src="https://icon.cecdc.com/cert.png" alt="">
          </li>
          <li class="fl">
            <img src="http://i.sfimg.cn/html/images/bottom_sm.png" alt="">
          </li>
          <li class="fl">
            <p>
              <span><a rel="nofollow" href="" target="_blank">关于我们</a></span>
              <span><a rel="nofollow" href="" target="_blank">联系我们</a></span>
              <span><a rel="nofollow" href="" target="_blank">招聘人才</a></span>
              <span><a href="" target="_blank">友情链接</a></span>
              <span>Copyright© 顺丰优选 sfbest.com 版权所有</span>
            </p>
            <p>
              <span>京公网安备11010502026831号</span>
              <span><a class="beian" rel="nofollow" target="_blank" href="http://www.miibeian.gov.cn">京ICP证150325号</a></span>
              <span><a class="beian" rel="nofollow" target="_blank" href="">食品经营许可证JY11113080533669号</a></span>
              <span><a class="beian" rel="nofollow" target="_blank" href="">企业营业执照</a></span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "footerCart"
    }
</script>

<style scoped lang="less">
  .footer{
    width: 100%;
    height: 100%;
    .footer-top{
      width: 100%;
      height: 120px;
      margin-top: 10px;
      position: relative;
      background-color: #F5F5F5;
      .pw{
        position: absolute;
        ul{
          list-style: none;
          height: 100%;
          li{
            width: 25%;
            height: 100%;
            background: url("http://i.sfimg.cn/html/images/foot/f1.png") no-repeat center center;
          }
          li:nth-child(2){
            background: url("http://i.sfimg.cn/html/images/foot/f2.png") no-repeat center center;
          }
          li:nth-child(3){
            background: url("http://i.sfimg.cn/html/images/foot/f3.png") no-repeat center center;
          }
          li:nth-child(4){
            background: url("http://i.sfimg.cn/html/images/foot/f4.png") no-repeat center center;
          }
        }
      }
    }
    .footer-middle{
      width: 100%;
      height: 150px;
      position: relative;
      margin-top: 20px;
      .pw{
        position: absolute;
        height: 100%;
        ul{
          list-style: none;
          height: 100%;
          li{
            height: 100%;
            width: 290px;
          }
          .footer-left{
            padding-top: 100px;
            background: url("http://i.sfimg.cn/html/images/foot/logo.jpg") no-repeat left top;
            p:nth-child(1){
              font-size: 20px;
              color: #646464;
              font-weight: bold;
              padding: 6px 0;
            }
            p:nth-child(2){
              line-height: 18px;
              color: #969696;
              width: 100%;
              font: 12px/150% Arial,Verdana,"宋体";
            }
          }
          li:nth-child(2){
            width: 645px;
            height: 150px;
            ul{
              width: 120px;
              height: 100%;
              .title{
                color: #707070;
                font-weight: bold;
                font-size: 14px;
              }
              li{
                height: 24px;
                line-height: 24px;
                width: 100%;
                text-align: left;
                font-family: Microsoft YaHei;
              }
            }
          }
          li:nth-child(3){
            width: 235px;
            height: 100%;
            .phone{
              width: 50%;
              p{
                font-family: Microsoft YaHei;
                color: #707070;
                font-weight: bold;
                font-size: 14px;
                height: 35px;
                line-height: 35px;
              }
              span{
                display: block;
                width: 80px;
                height: 80px;
                background: url("http://i.sfimg.cn/html/images/foot_bottom.png") no-repeat 0 0;
              }
            }
            .wechat{
              width: 50%;
              p{
                font-family: Microsoft YaHei;
                color: #707070;
                font-weight: bold;
                font-size: 14px;
                height: 35px;
                line-height: 35px;
              }
              span{
                display: block;
                width: 80px;
                height: 80px;
                background: url("http://i.sfimg.cn/html/images/foot_bottom.png") no-repeat -83px 0;
              }
            }
          }
        }
      }
    }
    .footer-bottom{
      height: 66px;
      width: 100%;
      position: relative;
      .pw{
        position: absolute;
        padding-top: 15px;
        box-sizing: border-box;
        border-top: 1px solid #ccc;
        ul{
          list-style: none;
          li{
            width: 94px;
            height: 33px;
            margin-right: 7px;
            img{
              width: 94px;
              height: 33px;
            }
          }
          li:last-child{
            width: 600px;
            margin-left: 20px;
            p{
              width: 100%;
              span{
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
</style>
