<template>
  <div class="detail">
    <headerCart></headerCart>
    <centerCart></centerCart>
    <footerCart></footerCart>
  </div>
</template>

<script>
  import headerCart from './headerCart/headerCart'
  import footerCart from './footerCart/footerCart'
  import centerCart from './centerCart/canterCart'
    export default {
        name: "detail",
      components:{
          headerCart,
          centerCart,
          footerCart,
      }
    }
</script>

<style scoped>

</style>
