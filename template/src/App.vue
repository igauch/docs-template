<template>
  <div id="app" class="d-flex">
      <div class="docs-side-nav">
        <sidenav class="side-nav"></sidenav>
      </div>
      <div class="docs-main-views docs-flex-1">
        <router-view class="content"></router-view>
      </div>
  </div>
</template>

<script>
import Sidenav from "./components/sidenav";

export default {
  components: {Sidenav},
  name: 'app'
}
</script>

<style lang="scss">
  html,body,#app{
    height: 100%;
  }
  #app{
    min-width: 682px;
    overflow: hidden;
  }
  @import "styles/docs.scss";
</style>
