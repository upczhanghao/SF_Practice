<template>
    <div class="cart">
      <headerCart></headerCart>
      <centerCart></centerCart>
      <footerCart></footerCart>
    </div>
</template>

<script>
  import headerCart from './headerCart/headerCart'
  import centerCart from './centerCart/centerCart'
  import footerCart from './footerCart/footerCart'
    export default {
        name: "cart",
      components:{
          headerCart,
        centerCart,
        footerCart
      },
      mounted() {
        if(localStorage.getItem('userName') === "" || localStorage.getItem('userName') == null){
          this.$router.push('/login');
        }
      }
    }
</script>

<style scoped>

</style>
