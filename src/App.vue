<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  name: 'app',
  components: {

  },
  methods:{
    ...mapMutations(["tableUser"]),
     async checkUser(){
       let {data} = await  this.axios.post("/api/loginCheck",{token:localStorage.getItem('token')})
       console.log(data)
       if (data.status){
          this.tableUser(data.data.user)
       }
    }
  },
  mounted() {
    this.checkUser()
  }
}
</script>

<style lang="scss">
.container{
  max-width: 1040px;
  margin: auto;
}
//body, dl, dd, dt, ul, li, ol {
//  padding: 0;
//  margin: 0;
//  list-style: none
//}
//
//.container {
//  max-width: 1000px;
//  margin: auto
//}
.router-link-exact-active{
  //background-color: red;
 color: black;
}
//
//
//a{
//  /*color: red !important;*/
//}
//.card {
//  margin: 10px 0;
//  border: solid 1px silver;
//& .card-header {
//    padding: 10px;
//    background-color: #efefef;
//
//  }
//& .card-body {
//    padding: 10px;
//    background-color: white;
//  }
//}
</style>
