<template>
  <div
    class="misa-menu"
  >
    <div class="misa-menu__header">
      <div class="misa-menu__button"></div>
      <div class="misa-menu__logo"></div>
    </div>
    <div class="misa-menu__item-container">
      <MisaMenuItem
          v-for="(item, index) in menuItems"
          :key="item['menuItemId']"
          :itemIcon="item['menuItemIcon']"
          :itemText="item['menuItemText']"
          :itemPath="item['menuItemPath']"
          :activeClass="{'misa-menu__item--active': currentIndex === index}"
          @click.native="activeItem(index)"
      />
    </div>
  </div>
</template>

<script>
import MenuModel from "@/models/MenuModel";

import MisaMenuItem from "@/components/base/MisaMenuItem";

export default {
  name: "TheMenu",

  mounted () {
    this.menuItems = MenuModel.initData();
  },

  data() {
    return {
      menuItems: [],
      currentIndex: -1
    }
  },

  components: {
    MisaMenuItem
  },

  methods: {
    activeItem(index) {
      this.currentIndex = index;
    }
  }
}
</script>

<style lang="scss">
.misa-menu {
  width: 178px;
  height: calc(100vh);
  background-color: var(--color-tertiary);
  overflow: auto;
  transition: var(--transition-value);

  &__header {
    width: 100%;
    padding: 14px 14px 14px 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__button {
    width: 24px;
    height: 24px;
    background-image: url('../../assets/icon/misa-menu-btn.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__logo {
    width: 96px;
    height: 32px;
    background-image: url('../../assets/logo.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__item-container {
    margin-top: 14px;
  }

  &--shrink {
    width: 64px;
  }
}
</style>