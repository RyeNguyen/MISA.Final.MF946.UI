<template>
  <div
    class="misa-menu"
  >
    <div class="misa-menu__header">
      <div class="misa-menu__button" :class="elementShrink"/>
      <div class="misa-menu__logo" :class="elementShrink"/>
    </div>
    <div class="misa-menu__item-container">
      <MisaMenuItem
          v-for="(item, index) in menuItems"
          :key="item['menuItemId']"
          :itemIcon="item['menuItemIcon']"
          :itemText="item['menuItemText']"
          :itemPath="item['menuItemPath']"
          :activeClass="{'misa-menu__item--active': currentIndex === index}"
          :menuToggled="menuToggled"
          @click.native="activeItem(index)"
      />
    </div>
  </div>
</template>

<script>
import MenuModel from "@/models/MenuModel";

import MisaMenuItem from "@/components/layout/menu/MisaMenuItem";

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

  props: {
    menuToggled: {
      type: Boolean
    }
  },

  components: {
    MisaMenuItem
  },

  computed: {
    elementShrink: function() {
      return this.menuToggled === true ? 'misa-hidden' : 'misa-show';
    }
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
  width: 100%;
  height: calc(100vh);
  background-color: var(--color-tertiary);

  &__header {
    width: 100%;
    height: 48px;
    padding: 14px 14px 14px 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__button {
    width: 24px;
    height: 24px;
    background-image: url('../../../assets/icon/misa-menu-btn.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__logo {
    width: 96px;
    height: 32px;
    background-image: url('../../../assets/logo.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__item-container {
    height: calc(100vh - 48px);
    padding-top: 14px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--color-scroll);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-scroll-thumb);
    }
  }
}
</style>