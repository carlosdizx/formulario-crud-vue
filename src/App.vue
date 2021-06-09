<template>
  <NavBar/>
  <div class="container"><router-view/></div>
</template>
<script>
import NavBar from "./components/NavBar";
export default {
  components:{
    NavBar:NavBar
  }
}
</script>
