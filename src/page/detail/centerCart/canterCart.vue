<template>
    <div class="detail" style="height: 750px;margin-top: 50px;margin-bottom: 50px">
      <div class="orderMain">
        <form >
          <h3 class="orderHd">填写并核对订单信息</h3>
          <div id="userAddrId" class="orderTbody ">
            <a name="userAddr"></a>
            <h3 class="orderTitle">收货人信息：
              <span class="addrAlter" style="display:inline;">[修改]</span></h3>
            <div class="orderItem">
              <div class="orderCurr" id="userAddress" style=" display:block; ">
                <ul>
                  <li>{{address.Receiver}}&nbsp;&nbsp;&nbsp;{{address.Phone}}&nbsp;&nbsp;&nbsp;&nbsp;{{address.Addr}}</li>
                </ul>
              </div>
            </div>
          </div>


          <div id="userInvoiceId" class="orderTbody">
            <a name="userInvoice"></a>
            <h3 class="orderTitle">发票信息：<span class="addrAlter" id="invoice_edit">[修改]</span></h3>
            <div class="orderItem">
              <div class="orderCurr invMsg">
                <div id="p_inv_type">开票提示:<br>如使用优选卡/现金券/优选单优惠/积分支付全额抵扣订单金额，不支持开具发票。<br>
                  为响应环保，顺丰优选自营全面启用电子发票，如商品由第三方卖家销售，发票类型及内容将由该卖家决定。<br>
                  如您需要补开发票，请到我的优选-补开发票，自助申请补开电子发票。</div>
                <div id="p_inv_title"></div>
                <div id="p_inv_content"></div>
              </div>
            </div>
          </div>

          <div id="giverAddrId" class="orderTbody">
            <input type="hidden" name="need_giver" value="">
            <a name="giverAddr"></a>
            <input type="hidden" id="card_service" value="让收货人知道我">
            <h3 class="orderTitle" style="position:relative;z-index:2;">让收货人知道我： &nbsp;&nbsp;&nbsp;&nbsp;<span class="gTip"></span>
              <div class="gCont" style="display:none;">
                <div class="dmItem">
                  <div class="dt">
                    您可以设置寄货人信息和选择购物清单上是否显示订单金额
                  </div>
                </div>
                <div class="spArror">
                  <span class="aBg"></span>
                  <span class="aCt"></span>
                </div>
              </div>
              <span class="addrAlter" style="display:inline;">[修改]</span>
            </h3>
            <div class="red">提示：寄件人和商品信息，会以短信通知到对方，自营发货后也在快递单上展现</div>
          </div>

          <div class="orderTbody" style="width:958px;border-bottom:0 none;">
            <a name="products"></a>
            <div class="backToCart">
              <a style=" text-decoration:underline;" @click.prevent="cart">返回修改购物车</a>
            </div>
            <h3 class="orderTitle">商品信息：</h3>
            <span class="clear"></span>
            <div class="orderPItem">
              <div id="producthtml">
                <div id="chaidanorder2" class="">

                  <div class="orderItem">
                    <div class="dateShow">
                      <strong>订单1：</strong>商品下单后尽快为您发货
                      <span class="orderSend">下单后尽快为您发货</span>
                    </div>
                    <div class="orderTbl">
                      <div class="orderThead">
                        <div class="tCol pGoods">商品名称</div>
                        <div class="tCol pPrice">单价</div>
                        <div class="tCol pPromotion">返现</div>
                        <div class="tCol pQuantity">数量</div>
                        <div class="tCol pWeight">重量(含包装)</div>
                        <div class="tCol pSubtotal">小计</div>
                      </div>
                      <div class="orderPInfo" v-for="item in list" :key="item.id">
                        <div class="pItem pGoods">
                          <a href="http://www.sfbest.com/html/products/274/4500273987.html" target="_blank">
                            {{item.name}}
                          </a>
                        </div>
                        <input name="ecards" type="hidden" value="">
                        <div class="pItem pPrice" style="position:relative;z-index:98">
                          ￥{{item.price}}                                        <p></p>
                        </div>
                        <div class="pItem pPromotion">
                          ￥0                                    </div>
                        <div class="pItem pQuantity">
                          {{item.count}}
                        </div>
                        <div class="pItem pWeight">
                          {{item.weight / 1000}}kg
                        </div>
                        <div class="pItem pSubtotal">
                          ¥{{item.itemPrice}}
                        </div>
                        <span class="clear"></span>
                      </div>


                      <div class="orderPInfo order_xj">
                        <span class="sp1">总重量：</span>
                        <span class="sp2">
                                    {{totleUnite / 1000 }}kg
                                </span>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
      </div>
      <div class="orderTFoot">
          <div class="orderAccount">
            <span class="t">应付总额：</span>
            <span class="p">¥</span><span id="countPrice" class="p">{{totlePrice}}</span>
            <input type="submit" value="提交订单" @click.prevent="submit" ref="sub">
          </div>
          <span class="clear"></span>
      </div>
        </form>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
      name: "canterCart",
      data(){
          return {
            addressId : -1,
            arrId : [],
            address : {},
            list : {},
            totlePrice : 0,
            totleUnite : 0
          }
      },
      created() {
        if(sessionStorage.getItem("value") !== "" && sessionStorage.getItem("arrId") !== ""){
          this.addressId = this.$store.state.addressId = sessionStorage.getItem("value");
          this.arrId = this.$store.state.arrId = JSON.parse(sessionStorage.getItem("arrId"));
        }
        axios.get('http://49.233.165.235:8080/v1/detail',{
          params:{
            addressId : this.addressId,
            arrId : this.arrId.toString(),
            userName : localStorage.getItem('userName'),
          }
        })
          .then((res) => {
            console.log(res.data);
            if(res.data.code === 0){
              this.address = res.data.address;
              this.list = res.data.list;
              this.totleUnite = res.data.totleUnite;
              this.totlePrice = res.data.totlePrice;
            }
          })
          .catch((err) => {
            alert(err)
          })
      },
      methods:{
        cart(){
          this.$router.push('/cart');
        },
        submit(){
          if(this.arrId.length <= 0){
            this.$refs.sub.disabled = true;
            alert("订单中无商品");
            this.$router.push('/cart');
            return;
          }
          axios.get('http://49.233.165.235:8080/v1/submit',{
            params:{
              addressId : this.addressId,
              arrId : this.arrId.toString(),
              userName : localStorage.getItem('userName'),
              totlePrice : this.totlePrice,
              totleUnite : this.totleUnite
            }
          })
            .then((res) => {
              console.log(res.data);
              if(res.data.code === 0){
                sessionStorage.setItem("arrId","");
                sessionStorage.setItem("value","");
                alert(res.data.msg);
                this.$router.push('/cart');
              }
            })
            .catch((err) => {
              alert(err)
            });
        }
      }
    }
</script>

<style scoped>
  .detail{
    font-family: Arial, Helvetica, sans-serif;;
  }
  .orderTFoot> .orderAccount>input{
    background-color: #6E9B0C;
    color: #FFFFFF;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    height: 40px;
    text-align: center;
    width: 150px;
    margin-left: 20px;
  }
  .hide{display:none;}
  .label{ color: #666666;float: left;height: 26px;line-height: 26px;margin-right: 5px;_display:inline;width:100px;text-align:right;}
  .label b{line-height:26px;font-weight:normal;margin-right:5px;font-family:å®‹ä½“;color:#ff4800;font-size:12px;}
  .text{border: 1px solid #CCCCCC;font-family: Arial,"å®‹ä½“",sans-serif;height: 16px;padding: 4px 3px;width: 138px;font-size:12px;}
  .inputTips{color:#c2c2c2;}
  .btnConfirm{float:left;background-color:#6e9b0c;color: #FFFFFF;cursor: pointer;font-size: 12px;margin-right:8px;padding:8px 20px;}
  input.btnSave{background-color:#6E9B0C;color: #FFFFFF;cursor: pointer;font-size: 12px;margin: 0;padding:0px 8px;font-size:12px;height:26px;line-height:26px;}
  .orderMain{width:1000px;margin:0 auto;}
  .orderHd{color:#565656;font-size:16px;margin:0;overflow:hidden;padding:0 0 0 15px;border: 1px solid #dddddd;height: 34px;line-height: 34px;background-color:#eeeeee;}
  .orderTbody{padding:10px 20px 0 20px;border:1px solid #dddddd;border-top:0 none;zoom:1;}
  .orderTitle{color:#565656;line-height:26px;font-size:14px;}
  .cfmPrev{padding:5px 0 15px 0;}
  .cfmPrev .orderTip{color:#b0b0b0;}
  .backToCart{float:right;line-height:26px;color:#629201;}
  .backToCart a:link,.backToCart a:visited{color:#629201;}
  .stepCurr{border:3px solid #6c9c0a;}
  .orderShow,.orderCurr{padding:10px 20px;color:#666666;}
  .orderCurr .payment{ border-bottom:1px dashed #ddd; height:30px; line-height:30px;}
  .shipment .ct{padding:10px 0; border-bottom:1px dashed #ddd;}
  .payment .cm{padding-top:5px;}
  .shipment .cm,.shipment .shipWay{padding-top:10px;*padding-top:5px;}
  .payment .ct{ height:30px; line-height:30px; border-bottom:1px dashed #ddd;}
  .shipment .shipPrice{margin-bottom:5px;}
  .shipment .shipPrice span{font-size:14px;font-weight:bold;color:#f14f4f;font-family:å®‹ä½“;}
  .shipment .shipTxt{color:#bab9b9;}
  .shipment .shipChai{padding:5px 0 5px 0;}
  .shipCurr{margin-top:15px;}
  .shipCurr .sOrders{margin-bottom:0;line-height:22px;}
  .shipChai .sct,.shipChai .scm{padding:0;margin-bottom:10px;}
  .shipChai .scm span{margin-left:10px;}
  .sOrders{margin-bottom:10px;position:relative;}
  .sOrders .scon{ float:left; display:block; border-bottom:1px dashed #ddd; line-height:22px; width:904px; padding:0 0 10px 10px;*padding:0 0 5px 10px; overflow:hidden;}
  .sOrders .tLabel{float:left;line-height:26px;}
  .sOrders .tOrder{color:#2a791c;cursor:default; height:30px; line-height:30px;}
  .addrAlter{font-size:12px;color:#5a8c35;font-weight:normal;cursor:pointer;}
  .addrAlter:hover{text-decoration:underline;}
  .orderTip{font-size:12px;color:#fb8e19;font-weight:normal;}
  .orderTip2{font-size:12px;color:#b0b0b0;font-weight:normal;}
  .addrItem{overflow:hidden;zoom:1;}
  .addrItem a.deladdr{display:none;}
  .addrItem .addrs{height:28px;line-height:28px;margin-bottom:5px;}
  .addrItem .curr{background-color:#fff3e8;}
  .addrItem .curr a.deladdr{display:block;}
  .addrItem .i,.addrItem .l,.addrItem a{float:left;margin-right:8px;_display:inline;}
  .addrItem .i{margin-top:8px;margin-left:5px;}
  .addrItem .deladdr{color:#5A8C35;margin-left:10px;}
  .addrItem .changecity{color:#ff0000;}
  .addrItem .addrTip{color:#fb8e19;padding-left:25px;margin-bottom:5px;}
  .addrItem .addrTip a:link,.addrItem .addrTip a:visited{color:#fb8e19;}
  .addrShow{overflow:hidden;zoom:1;margin:0 0 0 2px;}
  *html .addrShow{margin:0 0 0 8px;}
  .addrShow .open,.addrShow .close{position:relative;padding:0 0 0 25px;line-height:30px;height:30px;display:block;float:left;cursor:pointer;color:#5A8C35;}
  .addrShow b{position:absolute;width:18px;height:18px;overflow:hidden;left:0;top:5px;}
  .orderForm input{float:left;}
  .orderForm select{height: 22px;margin: 2px 5px 0 0;}
  .orderForm .formList{overflow:hidden;zoom:1;padding:5px 0;}
  .orderForm .field{float: left;height: 26px;line-height: 26px;}
  .orderForm .fullAddress span{float:left;}
  .orderForm .fullAddress input{width:308px;}
  .orderForm .fmError,.orderForm .fmError1{color:#FB8E19;float: left;height: 26px;line-height: 26px;padding-left: 6px;}
  .couponForm input{float:left;}
  .couponForm select{height: 22px;margin: 2px 5px 0 0;}
  .couponForm .formList{overflow:hidden;zoom:1;padding:5px 0;}
  .couponForm .field{float: left;height: 26px;line-height: 26px;}
  .couponForm .fullAddress span{float:left;}
  .couponForm .fullAddress input{width:308px;}
  .couponForm .fmError{color:#FB8E19;float: left;height: 26px;line-height: 26px;padding-left: 6px;}
  .phone span{float:left;padding-left:5px;}
  .phone .text{width:152px;}
  .orderBtn{margin:10px 0 0 0;overflow:hidden;zoom:1;}
  .addrSave{margin:5px;}
  .addrToCurr{padding:5px 16px;line-height:26px;color:#555555;}
  .orderShiping li,.orderPay li,.orderCurr li{line-height:26px;}
  .orderShiping .label,.orderCurr li .label{float:left;width:85px;text-align:right;margin-right:5px;_display:inline;}
  .orderPay label{margin-left:20px;}
  .orderPay a:link,.orderPay a:visited{margin-left:20px;color:#5A8C35;text-decoration:none;}
  .shipZt{padding-top:10px;}
  .shipZtCont .sct,.shipZtCont .scm{overflow:hidden;zoom:1;}
  .shipZtCont .tArea,.shipZtCont .cArea{float:left;width:215px;overflow:hidden;border-right:1px solid #efefef;}
  .shipZtCont .tInfo,.shipZtCont .cInfo{float:left;width:698px;overflow:hidden;}
  .shipZtCont .tArea,.shipZtCont .tInfo{height:30px;line-height:30px;background-color:#eeeeee;text-align:center;}
  .shipZtCont .cArea,.shipZtCont .cInfo{text-align:center;border-bottom:1px solid #efefef;line-height:22px;height:22px;}
  .shipZtCont .cInfo{text-align:left;padding:0 0 0 50px;width:648px;}
  .showMore{font-size: 0;height: 0;margin-bottom: 34px;_margin-bottom:0;overflow: visible;position: relative;text-align: center;}
  .showMore .showExtra{border:1px solid #dbdbdb;border-top:0 none;cursor: pointer;display: inline-block;font-size: 12px;height: 24px;margin-top: -1px;position: relative;text-align: right;background-color:white;*display:inline;+zoom:1;}
  .showMore .showExtra div {height: 24px;line-height: 24px;padding: 0 25px 0 10px;position: relative;_display:inline;_zoom:1;color:#6c9c0a;}
  .shipProduct{position:absolute;width:310px;border:1px solid #dadada;background-color:white;z-index:5;}
  .spItem{padding:10px;}
  .spItem .sct,.goodsItem{overflow:hidden;_zoom:1;}
  .spGoods,.spQuantity{float:left;text-align:center;height:25px;line-height:25px;background-color:#eeeeee;overflow:hidden;}
  .spGoods,.goodsItem .pName{width:75%;}
  .spQuantity,.goodsItem .pNum{width:24%;}
  .goodsItem .pName,.goodsItem .pNum{float:left;border-bottom:1px solid #f2f2f2;height:27px;line-height:27px;overflow:hidden;}
  .goodsItem .pNum{text-align:center;}
  .package .pName,.package .pNum{border-bottom:1px dashed #cdcdcd;background-color:#fcfcfc;}
  .spArror{position: absolute;top:-8px;width: 8px;left:30px;}
  .spArror .aBg,.spArror .aCt {display: block;font-size: 0;height: 0;line-height: 0;overflow: hidden;width: 0;}
  .spArror .aBg{border-right: 7px dashed rgba(0, 0, 0, 0);border-right: 7px dashed white\0;border-bottom: 7px solid #999999;border-left: 7px dashed rgba(0, 0, 0, 0);border-left: 7px dashed white\0;position: relative;border-top:0 none;}
  .spArror .aCt{border-right: 7px dashed rgba(0, 0, 0, 0);border-right: 7px dashed white\0;border-bottom: 7px solid #FFFFFF;border-left: 7px dashed rgba(0, 0, 0, 0);border-left: 7px dashed white\0;position: relative;border-top:0 none;margin:-6px 0 0 0px}
  :root .spArror .aBg{border-right: 7px dashed rgba(0, 0, 0, 0);border-left: 7px dashed rgba(0, 0, 0, 0);}
  :root .spArror .aCt{border-right: 7px dashed rgba(0, 0, 0, 0);border-left: 7px dashed rgba(0, 0, 0, 0);}
  *+html .spArror .aBg{border-right: 7px dashed white;border-left: 7px dashed white;}
  *+html .spArror .aCt{border-right: 7px dashed white;border-left: 7px dashed white;}
  *html .spArror .aBg{border-right: 7px dashed white;border-left: 7px dashed white;}
  *html .spArror .aCt{border-right: 7px dashed white;border-left: 7px dashed white;}
  .fapiao{line-height:30px;text-align: left; }
  .fapiao input,.invNeed input,.orderPay input{margin:0 3px 0 8px;}
  .invNeed,.invCont{overflow:hidden;zoom:1;padding:5px 0;}
  .invNeed span,.invType span,.invCont span{float:left;margin-right:10px;_display:inline;}
  .invType{overflow:hidden;zoom:1;padding:5px 0;}
  .invTip{color:#EA5405;}
  .invBody{overflow:hidden;zoom:1;}
  .invItem{padding-left:40px;}
  .invTop{zoom:1;position:relative;}
  .invTop span{float:left;margin-right:10px;_display:inline;}
  .invTop .btnSave{margin:0;}
  .invBtn{display:block; text-decoration:underline;}
  .inv_memory{background-color: #FCF8EF;border: 1px solid #F4E1BA;margin: 10px 10px 5px 20px;padding: 5px;width: 650px;}
  .invList{overflow:hidden;zoom:1;}
  .invMsg{overflow:hidden;zoom:1;line-height:30px;}
  .invMsg div {display: inline;float: left;margin-right: 20px;}
  .orderItem{padding-bottom:10px;}
  .orderNum{font-size:14px;font-weight:bold;line-height:30px;padding:5px 0 0 15px;}
  .orderTbl{padding:0 0 0 15px;}
  .orderThead{width:968px;overflow:hidden;zoom:1;}
  .tCol{float:left;height:34px;line-height:34px;background-color:#eeeeee;color:#666666;text-align:center;}
  .pGoods{width:318px;padding:0 0 0 40px;}
  .pPrice{width:105px;}
  .pPromotion{width:90px;}
  .pIntegral{width:80px}
  .pQuantity{width:90px;}
  .pInventory{width:90px;}
  .pWeight{width:100px;}
  .pSubtotal{width:110px;}
  .orderPInfo{zoom:1;padding:4px 0;line-height:20px;border-bottom:1px solid #f2f2f2;height: 20px}
  .pItem{float:left;text-align:center;line-height:20px;}
  .orderPInfo .pGoods{text-align:left;}
  .nmPiece td{text-align:center;}
  .nmPiece td.pGoods{text-align:left;}
  .groupBuy,.groupBuy dt,.groupBuy dd{padding:0;margin:0;}
  .zengp{color:#629201;font-weight:bold;}
  .orderWeight{text-align:right;width:200px;}
  .dateShow{padding:5px 0 10px 0;overflow:hidden;zoom:1;}
  .dateShow strong{padding-left:15px;float:left;}
  .dateSelect{float:left;position:relative;}
  .order_xj{ text-align:right; color:#000;}
  .order_xj span{ display:inline-block;}
  .order_xj .sp1{ width:200px;}
  .order_xj .sp2{ width:100px; color:red; text-align:center;}



  /*é‡æ–°é€‰æ‹©é…é€æ—¶é—´*/
  .datechange{width:237px;position:absolute;z-index:5;background-color:#FFF;left:433px;_left:auto;margin-top:-170px;border:1px solid #c1dcf2;padding:5px;}
  .dateTop{overflow:hidden;zoom:1;}
  .dateTop h3{float:left;}
  .datetbl{border-top:1px solid #c1dcf2;border-left:1px solid #c1dcf2;}
  .datetbl div{width:58px;height:40px;border-bottom:1px solid #c1dcf2;}
  .datetbl .w{float:left;text-align:center;line-height:18px;color:#333;width:58px;border-right:1px solid #c1dcf2;}
  .datetbl .dateTh .w{background-color:#eaf3fe;height:35px;padding:5px 0;border-bottom:1px solid #c1dcf2;}
  .datetbl .dateTh,.datetbl .dateTbody{overflow:hidden;zoom:1;}
  .datetbl td{padding:3px;}
  .datetbl .cur{background-color:#e47911;color:#FFF;line-height:40px;}
  .datetbl .disable{background-color:#eeeeee;}
  .datetbl .available{cursor:pointer;line-height:40px;}
  .datetbl .available:hover{border:2px solid #e47911;width:54px;height:37px;overflow:hidden;line-height:37px;}
  .datebox{text-align:center;font-weight:bold;color:#000;padding:0;line-height:20px;}
  .dateclose{float:right;width:40px;height:20px;line-height:20px;margin:0px 0 5px 0;display:inline;cursor:pointer;text-align:center;color:#FFF;color:#000;border:1px solid #f0f0f0;background-color:#eeeeee;overflow:hidden;}
  /*ä¼˜æƒ åˆ¸æ·»åŠ */
  .coupon_list{margin:10px 0;}
  .tbl_list{}
  .tbl_list td{border-bottom:1px solid #dadada; background:#fff;padding:4px;line-height:18px;}
  .tbl_list td span{color: #EA5405;}
  .couponList{height:35px;overflow:hidden;zoom:1;line-height:34px;}
  ul.couponTab{float:left;overflow:hidden;zoom:1;width:280px;}
  ul.couponTab li{clear:none;float:left;padding:0;height:34px;line-height:34px;width:124px;font-size:14px;text-align:center;background-color:#ffffff;border:1px solid #dddddd;border-bottom:0 none;color:#333333;cursor:pointer;font-family:"å¾®è½¯é›…é»‘";_display:inline;}
  ul.couponTab li.on{background-color:#69af05;border:1px solid #69af05;border-bottom:0 none;color:white;}
  a.couponCL:hover{color:#0f83d8;}
  .coupon_desc{position:relative;}
  .brandshow{position:absolute;width:330px;border:1px solid #dadada;background-color:#FFF;margin-left:-240px;_margin-left:-280px;z-index:99;padding:15px 0 0 0;overflow:hidden;}
  a.bClose{background-color:#1b6147;width:15px;height:15px;display:block;position:absolute;right:5px;top:5px;color:#FFF;cursor:pointer;text-align:center;line-height:15px;}
  a.bClose:hover{color:#FFF;text-decoration:none;}
  .linkshow{display:block;height:20px;}
  .brandlist{overflow:hidden;zoom:1;padding:5px;margin:0;}
  .brandlist dt{float:left;color:#565656;font-weight:bold;text-align:right;width:95px;}
  .brandlist dd{overflow:hidden;zoom:1;text-align:left;margin:0;}
  .brandlist dd div{float:left;margin-right:8px;white-space:nowrap;text-align:left;}
  .orderSeparate{padding:5px 16px;}
  .orderSeparate h3{font-size:12px;line-height:30px;}
  .orderSeparate div{padding:5px 20px;}
  .promoList{width:630px;}
  .promoItem{margin-bottom:10px;}
  .order-info{width:500px;position:absolute;right:0;line-height:24px;}
  *html .order-info{right:20px;}
  .priceitem{text-align:left;}
  .commPage {background-color: #ffffff;border: 1px solid #dadada;left: -25px;position: absolute;width: 385px;z-index: 5;top:24px;line-height: 20px;display: none;}
  .commPage .dd {text-indent: 25px;margin-bottom: 10px;}
  *html .dmTip{top:-3px;left:90px;}
  .dmCont{position:absolute;top:35px;left:75px; background-color: #FFFFFF;border: 1px solid #DADADA;width: 310px;z-index:5;}
  *+html .dmCont{top:40px;}
  *html .dmCont{left:-605px;top:40px;zoom:1;}
  .dmItem{padding:10px;}
  .dmItem .dt{margin-bottom:10px;}
  .dmLink{text-align:right;color:#6E9B0C;}
  .dmLink a:link,.dmLink a:visited{text-align:right;color:#6E9B0C;}
  .priceitem dl,.priceitem dd,.priceitem dt{margin:0;padding:0;}
  .priceitem dl{width:300px;}
  .priceitem dd {overflow:hidden;zoom:1;}
  .priceitem dd div{float:left;width:180px;text-align:right;}
  .priceitem dd .priceArea{display:block;overflow:hidden;zoom:1;text-align:right;font-family:å¾®è½¯é›…é»‘;}
  .priceitem strong{color:#EA5405}
  .orderAccount{color:#666666;line-height:26px;padding:10px 10px 0 0;float:right;}
  .orderAccount .t{font-size:14px;font-weight:bold;}
  .orderAccount .p{font-size:20px;color:#e33d3f;font-family:å¾®è½¯é›…é»‘;}
  .orderAccount .y{font-size:14px;font-weight:bold;}
  .ordercoupon{text-align:right;color:#EA5405}
  .orderCoupon{overflow:hidden;zoom:1;}
  .sfbtn{color:#666666;cursor:pointer;line-height:30px;position:relative;padding:0 0 0 20px;overflow:hidden;}
  *html .sfbtn b{top:-2px;left:-20px;}
  .sfbtn_in{padding:10px 20px 10px;}
  .sfbtn_in p{line-height:30px;}
  h4.t{line-height:26px;font-size:12px;}
  .red{color:#EA5405;}
  .orderSubmit{float:right;}
  .submitBtn{background-color:#6E9B0C;color: #FFFFFF;cursor: pointer;font-size: 16px;font-weight: bold;height: 40px;text-align: center;width: 150px;}
  .submitDisable{border:1px solid #dddddd;background-color:white;color:#cfcfcf;height: 40px;text-align: center;width: 150px;font-size: 16px;cursor:not-allowed;}
  .paySay{color:#6B6B6B;margin-left:20px;}
  .payment2{border-bottom:1px solid #F4E1BA;padding: 0px 0px 0px 80px;}
  .onError{padding:0;margin-left:5px;font-size:13px;color:#FB8E19;}
  .orderTFoot{border-left:1px solid #dddddd;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;}
  .orderTFoot .ct{text-align:right;padding:78px 10px 5px 10px;color:#fb8e19;line-height:18px; }
  .orderTFoot .ct a:link,.orderTFoot .ct a:visited{color:#4c9810;}
  .submitOrder{padding:10px;background-color:#fafafa;}
  .orderLetKnow{padding:5px 0;position:relative;}
  *+html .gTip{top:0px;}
  *html .gTip{top:0px;}
  .gCont{position:absolute;top:25px;left:86px; background-color: #FFFFFF;border: 1px solid #DADADA;width: 220px;z-index:5;zoom:1;font-size:12px;font-weight:normal;line-height:18px;}
  .pShowOrNot{padding:5px 0;}
  .pShowOrNot span{margin-right:50px;}
  .pShowOrNot .ct{font-weight:bold;}
  .cdzhigong{overflow:hidden;zoom:1;}
  .cdzhigong .zhigong{float:left;margin-right:10px;_display:inline;}
  .cdzhigong .shippingTime{overflow:hidden;zoom:1;}
  .shippingTime .ct{padding:0;float:left;}
  .shippingTime .cm{padding:0;overflow:hidden;zoom:1;}
  .shippingTime .cm span{display:block;padding:0 0 5px 0;}
  .shippingTime .cm .i{margin-right:5px;}
  .bankers{width:440px;left: 240px;position:absolute;top: -1px;}
  .showbanker{background-color: #FFFFFF;border: 1px solid #DDDDDD;height: 180px;left: 0;overflow-x: hidden;overflow-y: auto;padding: 5px;position: absolute;z-index: 4;width:440px;}
  .showbanker img{width:100px;height:30px;}
  .showbanker td{padding:3px;}
  .giverCard{width:608px;}
  .giverInput{background:0 none;padding:5px;position:relative;}
  .inputArea{width:612px;height:100px;border:1px solid #eeeeee;resize:none;font-size:12px;padding:2px 5px;line-height:18px;color:#666666;}
  .giverTip{color:#fa9600;float:right;}
  .giverShow{color:#4c9810;margin-left:10px;cursor:default;}
  .inputArea.inputTips{color:#c2c2c2;}
  .giverItem{display:none;position:absolute;border:1px solid #999999;padding:15px;width:300px;top:0;left:150px;background-color:white;line-height:24px;}
  .new-color{ color:#ff3d3d;}
  .new-pwd-link{ color:#669900; text-decoration:none;}
  .new-pwd-link:hover{ color:#669900; text-decoration:underline;}
  .payment-new0 label, .payment-new0 .payment_pwdLink{ display:inline-block; line-height:24px;}
  .payment-new0 .payment_pwd{ width:147px; height:24px; line-height:24px; border-left:2px solid #dcdcdc; border-top:2px solid #dcdcdc; border-right:1px solid #dcdcdc; border-bottom:1px solid #dcdcdc; padding:0 5px; margin-right:10px;}
  .payment-new0 .payment_pwdLink{ color:#969696; text-decoration:none;}
  .payment-new0 .payment_pwdLink{ color:#969696; text-decoration:underline;}
  .mini-charge{overflow:hidden;zoom:1;padding-right:10px;}
  .mini-charge span{float:right;color:#ff3d3d;height:20px;border:1px solid #fa9600;line-height:20px;padding:0 5px;}
  .floatleft {float: left; }
  .order_xj{ text-align:right; color:#000;}
  .order_xj span{ display:inline-block;}
  .order_xj .sp1{ width:200px;}
  .order_xj .sp2{ width:100px; color:red; text-align:center;}



  .mask_box {width:425px;height:350px;background:#fff;position: fixed;left: 50%;top:50%;margin-left: -212px;margin-top: -175px;z-index: 1002;}
  #mask_con {position: absolute; top: 0px; filter: alpha(opacity=50); background-color: #777;z-index: 1000; left: 0px;opacity:0.5; -moz-opacity:0.5;}
  .mask_box .mask_close{width: 20px;height: 20px;position: absolute;right: 20px;top:20px;cursor: pointer;}
  .mask_box p{text-align: center;color: #000;font-weight: bold;font-size: 16px;}
  .mask_box .mask_go_define{width: 100%;height: 35px;line-height: 35px;margin:0 auto;background: #69af05;color: #fff;display: block;text-align: center; margin-top: 30px;}
  .message_div {width:100%;margin-top: 30px;}
  .message_div input{width:60%;}
  .message_div a {position:absolute;width:40%;height:37px;text-align: center;background-color:#69af05;color:#fff;right:-1px;top:0px; line-height: 37px;}
  .message_div a.time_clock{background-color: #969696;}
  .mask_box_con {width:320px;margin:0 auto;margin-top: 70px;}
  .mask_box_con input {border:1px solid #dcdcdc;height:35px;text-indent: 20px;}
  .mask_box_con input.phone_div_phone{margin-top: 30px;width:100%;}
  .mask_box_con .warn_text {color:#fb8e19;font-size: 12px;text-align: left;text-indent: 20px;font-weight: normal;margin-top: 5px;position:absolute;}
  .commPage-1 {background-color: #ffffff;border: 1px solid #dadada;left: -25px;position: absolute;width: 385px;z-index: 5;top:24px;line-height: 20px;display: none;}
  .promoItem_deductible{display:block;margin-bottom: 10px;}
  .promoItem_nondeductible{display:none;margin-bottom: 10px;}
  .usecard_num_total  {color:#ff0000;margin-left: 5px;margin-right: 5px;width: 57px;display:inline-block;height:22px;line-height: 22px;overflow:hidden;vertical-align:middle;}
  .promoItem_deductible input {display:inline-block;width:50px;height:20px;border:1px solid #dcdcdc;text-align: center;color:#969696;margin:0 5px;}
  .promoItem_deductible .warning {display:inline-block;margin-left: 20px;color:#fb8e19;}
  .mask_box_con input.inp {color: #ccc;}

  .payment-new0 {margin:10px 0;}
  .youxuan .usecard_price_total_1{max-width: 56px;overflow: hidden; display: inline-block;height: 14px; vertical-align: middle;line-height: 14px;}
  .message_div a.mask_go_default{background:#666;cursor:default;pointer-events:none;}
  .mask_box a.mask_go_default {background:#666;cursor:default;pointer-events:none;}
  .mask_box a.mask_go_on {background:#69af05;cursor:default;pointer-events:none;}

  .mask_box p.mask_sure_tip{color:#fb8e19;font-size: 12px;text-align: left;text-indent: 20px;font-weight: normal;margin-top: 5px;}

  /*ä¼˜å…ˆå›½é™…æ ·å¼*/
  .yxgj_addrTips{ padding:5px 90px; color:#FB8E19; position:relative;}
  .yxgj_addrIdTips{ position:absolute; left:280px; top:17px; padding:12px; width:252px; min-height:90px; background:#fff; color:#454240; border:1px solid #dcdcdc;}
  .yxgj_addrIdTips .content{ line-height:18px; padding-bottom:12px; }
  .yxgj_addrIdTips .btn{ display:block; margin:0 auto; width:90px; height:22px; line-height:22px; background:#6d9c0b; color:#fff; text-align:center;}
  .yxgj_tipsTitle{ color:#FB8E19; padding:10px 0;}
  .htsy{ height:30px; line-height:30px; font-size:12px; text-align:right; padding-right:10px; color:#fb8e19; background:#eeeeee;}
  .htInvoice{ line-height: 36px; padding-left: 20px; display:block;}

  /*ä»˜è´¹ä¼šå‘˜ ä¼˜æƒ åˆ¸*/
  .my_card{padding:30px 0 0px 0;background-color:#f5f5f5;font-family:"å¾®è½¯é›…é»‘";}
  .my_card .yhq,.my_card .myq{display:block;width:400px;padding-left:12px;}
  .my_card .t{font-size:16px;color:#5e5e5e;padding-left:4px;padding-bottom:16px;display:block;}
  .t_top1{text-align:center;padding-top:15px;color:#fff;display:block;font-size:60px;height:70px;}
  .t_top1 sup{font-size:30px;display:inline-block;margin-top:-20px;}
  .t_top1 b{font-family:Arial, Helvetica, sans-serif;}
  .t_top2{text-align:center;display:block;font-size:14px;color:#fff;margin-top:-2px;}
  .t_bot{padding:35px 0 0 24px;font-size:12px;color:#777777;line-height:24px;display:block;}
  .coupon_c .t_bot{color:#c7c7c7;}
  .t_bot em{display:block;font-style:normal;}
  .my_card .yhq li,.my_card .myq li{width:192px;height:242px;margin:0 4px 16px 4px;}
  .my_card .t_bot{padding:36px 0 0 28px;}
  .myq .t_top1{font-size:60px;}
  .my_page{background-color:#f5f5f5;padding:0 16px 35px 0;height:26px;line-height:26px;text-align:right;font-family:"å¾®è½¯é›…é»‘";font-size:14px;color:#969696;}
  a.my_prev,a.my_next{display:inline-block;width:72px;height:24px;text-align:center;line-height:24px;font-size:14px;color:#595959;background:#fff;border:#dcdcdc 1px solid;margin:0 15px;}
  a.my_prev:hover,a.my_next:hover,a.my_confirm:hover{text-decoration:none;}
  .my_in{width:24px;border:#dcdcdc 1px solid;text-align:center;height:24px;}
  a.my_confirm{display:inline-block;width:56px;text-align:center;line-height:24px;height:24px;border:#dcdcdc 1px solid;background-color:#f5f5f5;color:#595959;}
  .my_type{height:33px;border:#f5f5f5 1px solid;background-color:#fff;margin-top:8px;padding:20px 28px 26px 28px;font-size:16px;font-family:"å¾®è½¯é›…é»‘";color:#5e5e5e;}
  .my_type .sel1{width:158px;height:32px;padding-left:20px;line-height:30px;border:#dcdcdc 1px solid;font-size:16px;color:#5e5e5e;margin:0 84px 0 34px;line-height:30px;}
  .my_type .sel2{width:170px;height:32px;padding-left:20px;line-height:30px;border:#dcdcdc 1px solid;font-size:16px;color:#5e5e5e;margin:0 0px 0 34px;}
  .w730{width:730px;}
  .cred1{color:#ff0000;}
  .cblue{color:#74d3d4;}
  .coupon_box{font-family:'microsoft yahei',Verdana,Arial,Helvetica,sans-serif;background-color:#f7f7f7;border:#dddddd 1px solid;}
  .coupon_h li{float:left;font-size:14px;color:#333333;padding-top:9px;text-align:center;font-family:"å¾®è½¯é›…é»‘";}
  .coupon_h{border-bottom:#dddddd 1px solid;}
  .coupon_h1{min-width:130px;line-height:26px;cursor:pointer;}
  .coupon_h1.on{border-bottom:#77ac26 2px solid;color:#77ac26;}
  .coupon_c{padding:0px 0px 0 10px;width:100%;box-sizing:border-box;height:295px;overflow-y:auto;background:#f7f7f7;}
  .coupon_c li{margin:16px 5px 0px 5px;float:left;position:relative;width:242px;height:242px;cursor:pointer;}

  .p_num{height:36px;line-height:36px;padding-left:16px;border-top:#dadada 1px solid;font-size:14px;}
  .p_num_c{display:inline-block;color:#ff0000;font-size:18px;font-weight:bold;padding-right:33px;}
  .coupon_mjq li .t_top1{font-size:50px;}
  .orderSend{padding-left:16px;font-size:12px;color:#fc8f00;}

  /*ä¼˜é€‰å›½é™…æ ·å¼*/
  .yxgj_addrTips{ padding:5px 90px; color:#FB8E19; position:relative;}
  .yxgj_addrIdTips{ position:absolute; left:280px; top:17px; padding:12px; width:252px; min-height:90px; background:#fff; color:#454240; border:1px solid #dcdcdc;}
  .yxgj_addrIdTips .content{ line-height:18px; padding-bottom:12px; }
  .yxgj_addrIdTips .btn{ display:block; margin:0 auto; width:90px; height:22px; line-height:22px; background:#6d9c0b; color:#fff; text-align:center;}
  .yxgj_tipsTitle{ color:#FB8E19; padding:10px 0;}
  .htsy{ height:30px; line-height:30px; font-size:12px; text-align:right; padding-right:10px; color:#fb8e19; background:#eeeeee;}
  .htInvoice{ line-height: 36px; padding-left: 20px; display:block;}

  /*ä¼˜é€‰å¤§ç¤¼åŒ…css*/
  .spree_order span{ display:block; padding-top:10px;}
  .spree_strong{ display:block;}
  .spree_c0{ color:#ff3636;}
  .spree_c1{ padding:5px 0 5px 25px; color:#fa6400;}
  .spree_c2{ color:#bab9b9;}
  .spree_c3{ color:#595959; font-size:14px; }
  .spree_c4{ margin-right:10px;}
  .spree_c5{ margin:0 10px 0 26px;}

  /*è´¦æˆ·èžåˆ*/
  .bind_phone{display:inline-block;font-size:12px;padding-left:10px;color:#565656;}
  .bind_phone a:link,.bind_phone a:visited{color:#4eab00;}
  /*å‘ç¥¨ä¿®æ”¹*/

  .invoice_0 dl .grName .dt_0{line-height: 28px;}
  .err_c{position:absolute;top:8px;left:-30px;font-style: normal;display:none;z-index:9;}
  .err_c .c_b{width:235px;height:70px;border:#dedede 1px solid;line-height: 24px;color:#565656;background:#fff;padding:10px;}
  .ml-20{margin-left:-20px;}
  .ml-44{margin-left:-44px;}
  .ml-24{margin-left:-24px;}
  /*ä¸Šä¼ èº«ä»½è¯*/
  .yxgj-order-m{ padding-left:20px;}
  .yxgj-order-m1{ padding-left:104px;}
  .yxgj-order-m2{ margin-right:12px}
  .yxgj-order-error{ display:inline-block; height:20px; line-height:20px; color:#ea5405;font-size: 12px; font-weight: normal;}
  .yxgj-order-error i{ display:inline-block; width:14px; height:14px; margin-right:4px;}
  .ID-number div{ width:170px; height:106px;}
  .ID-number div.sty{ border:1px solid #ccc; border-radius:6px; position:relative; }
  .ID-number div img{ width:170px; height:106px; border:none;}
  .ID-number div span{ display:block; text-align:center;}
  .ID-number div .order-file{ position:absolute; left:0; top:0; margin-left:10%; margin-top:10%; width:80%; height:80%; background: transparent; opacity: 0; cursor: pointer;}


  .greenborder{border:2px solid #6c9c0a;}
  .ck-tip{color:#ff0000;position: relative;padding-left:40px;margin-top:10px;}
  .ck_mask{position:fixed;top: 0;bottom: 0;right: 0;left: 0;background-color: #000;opacity: 0.7;z-index: 100;display: none;height: 100%;width: 100%}
  .ck_zhiyin{position: absolute;top:-80px;left:-15px;width:420px;height:217px;z-index: 101;}
  .close_zhiyin{position:absolute;top:145px;left:90px;width:90px;height:50px;cursor: pointer;z-index:102;}

  .invoice-tip{text-align:right;height:30px;line-height:30px;background-color:#eaeaea;color:#999999;padding-right:10px;}

  /*é¢„å”®å‘è´§æ—¶é—´*/
  .selectTime .ct{padding: 10px 0;border-bottom: 1px dashed #ddd;}
  .selectTime .cm{position:relative;padding-left:10px;}
  .presell-step-txt{text-align:center;color:#999999;width:120px;line-height:18px;}
  .presell-time{height:35px;margin-top:10px;margin-left:20px;position:relative;}
  .presell-time-txt{color:#999999;height:34px;line-height:34px;}
  .presell-time-txt1{color:#666666;}
  .presell-change{color:#659901;margin-left:30px;cursor:pointer;}
  .window-daytime{width:525px;height:255px;background-color:white;position:absolute;z-index:93;border:1px solid #CECBCE;}
  .daytime-title{padding-top:10px;margin-left:14px;margin-bottom:10px;line-height:20px;}
  .daytime-body{width:482px;height:154px;margin-top:10px;margin-left:30px;overflow:hidden;overflow-y:auto;}
  .daytime-inner{border-left:1px solid #eeeeee;border-top:1px solid #eeeeee;max-width:462px;}
  .daytime-td{float:left;width:65px;height:40px;border-right:1px solid #eeeeee;border-bottom:1px solid #eeeeee;text-align:center;padding-top:10px;cursor:pointer;}
  .daytime-button{margin-top:10px;margin-right:30px;text-align:right;}
  .daytime-button-cancl,.daytime-button-ok,a.daytime-button-cancl:visited,a.daytime-button-ok:visited,a.daytime-button-cancl:hover,a.daytime-button-ok:hover{display:inline-block;width:76px;height:35px;line-height:35px;margin-left:12px;border-radius:3px;text-align:center;}
  .daytime-button-ok,a.daytime-button-ok:visited,a.daytime-button-ok:hover{border:1px solid #679a03;background-color:#679a03;color:white;}
  .daytime-button-cancl,a.daytime-button-cancl:visited,a.daytime-button-cancl:hover{background-color:white;border:1px solid #dddddd;color:#333333;}
  .day-on{background-color:#6c9c0b;color:white;cursor:default;}


  /*åœ°å€ç±»åž‹*/
  .address-type{display: inline-block;font-size: 12px;padding:0 9px;cursor:pointer;border:#969696 1px solid;border-radius: 6px;background: #fff;height: 20px;line-height: 20px;color:#969696;margin-right: 10px;}
  .address-type.active{background: #FA9600;border-color: #FA9600;color:#fff;}
  .address-type1{display: inline-block;font-size: 12px;padding:0 9px;border-radius: 6px;background: #FA9600;height: 22px;line-height: 22px;color:#fff;margin-left: 10px;float: left;}


</style>
