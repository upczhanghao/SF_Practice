<template>
  <h1><router-link to="/login">立即登录</router-link></h1>
</template>

<script>
  import axios from 'axios'
    export default {
      name: "active",
      created() {
        let attr = window.location.href.split("?")[1];
        this.id = attr.split("=")[1]
      },
      data() {
        return {
          msg: "激活中",
          id: -1
        }
      },
      mounted() {
        axios.get('http://49.233.165.235:8080/v1/active', {
          params: {
            id: this.id
          }
        })
          .then(function (response) {
            alert(response.data.errorMsg);
          })
          .catch(function (error) {
            alert(error)
          });
      }
    }
</script>

<style scoped lang="less">
  h1{
    font-size: 30px;
    line-height: 50px;
    background-color: yellow;
    border: 1px solid #ccc;
  }
</style>
