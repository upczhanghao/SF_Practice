<template>
    <div class="addr">
      <topmenu></topmenu>
      <search :count="num"></search>
      <addre></addre>
      <footerIndex></footerIndex>
    </div>
</template>

<script>
  import topmenu from './topmenu/topMenu'
  import search from './search/search'
  import addre from './editAddr/addre'
  import footerIndex from './footerIndex/footerIndex'
    export default {
        name: "addr",
      components:{
          topmenu,
        search,
        addre,
        footerIndex
      },
      data(){
        return {
          num : 0
        }
      },
      mounted() {
        if(localStorage.getItem('userName') === "" || localStorage.getItem('userName') == null){
          this.$router.push('/login');
        }else{
          this.$router.push('/edit');
        }
        setInterval(()=>{
          this.num = this.$store.state.num;
        },1000)
      }
    }
</script>

<style scoped>

</style>
