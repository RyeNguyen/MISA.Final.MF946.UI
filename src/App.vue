<template>
  <div id="app">
    <Menu/>
  </div>
</template>

<script>
import Menu from "@/components/layout/TheMenu";

export default {
  name: 'App',

  components: {
    Menu
  }
}
</script>

<style lang="scss">
@import './assets/css/Fonts.css';
@import './assets/css/Variables.css';
@import './assets/css/Main';
</style>
