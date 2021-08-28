<template>
  <div id="app" class="misa-app">
    <div class="misa-app--left">
      <Menu/>
    </div>
    <div class="misa-app--right">
      <Header/>
      <Content></Content>
    </div>
  </div>
</template>

<script>
import Content from "@/components/layout/content/TheContent";
import Header from "@/components/layout/TheHeader";
import Menu from "@/components/layout/TheMenu";

export default {
  name: 'App',

  components: {
    Content,
    Header,
    Menu
  }
}
</script>

<style lang="scss">
@import './assets/css/Fonts.css';
@import './assets/css/Variables.css';
@import './assets/css/Main';

.misa-app {
  display: flex;
  background-color: var(--color-background);

  &--left {
    width: 178px;
  }

  &--right {
    width: calc(100vw - 178px);
  }
}
</style>
