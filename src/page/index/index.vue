<template>
  <div class="index">
    <topMenu></topMenu>
    <search :count="num"></search>
    <banner></banner>
    <saleList></saleList>
    <footerIndex></footerIndex>
  </div>
</template>

<script>
  import topMenu from './topMenu/topMenu'
  import search from './search/search'
  import banner from './banner/banner'
  import saleList from './saleList/saleList'
  import footerIndex from './footerIndex/footerIndex'
    export default {
      name: "index",
      components:{
        topMenu,
        search,
        banner,
        saleList,
        footerIndex
      },
      data(){
        return {
          num : 0
        }
      },
      mounted() {
        setInterval(()=>{
          this.num = this.$store.state.num;
        },1000)
      }
    }
</script>

<style scoped>

</style>
