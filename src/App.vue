<template>
  <div id="app" class="misa-app">
    <div :class="leftSide">
      <Menu :menuToggled="menuToggled"/>
    </div>
    <div :class="rightSide">
      <Header @onMenuToggled="toggleMenu"/>
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

  data() {
    return {
      menuToggled: false
    }
  },

  components: {
    Content,
    Header,
    Menu
  },

  computed: {
    leftSide: function() {
      return this.menuToggled ? 'misa-app--left-shrink' : 'misa-app--left';
    },

    rightSide: function() {
      return this.menuToggled ? 'misa-app--right-expand' : 'misa-app--right';
    }
  },

  methods: {
    /**
     * Phương thức thay đổi trạng thái của menu thành thu gọn
     * Author: NQMinh (02/09/2021)
     */
    toggleMenu() {
      this.menuToggled = !this.menuToggled;
    }
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

    &-shrink {
      width: 52px;
    }
  }

  &--right {
    width: calc(100vw - 178px);

    &-expand {
      width: calc(100vw - 52px);
    }
  }
}
</style>
