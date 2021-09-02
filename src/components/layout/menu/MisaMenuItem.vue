<template>
  <div
      :class="[activeClass, {'misa-menu__item--shrink': menuToggled}]"
      class="misa-menu__item"
  >
    <div
        :style="{backgroundImage: 'url(' + require(`@/assets/icon/${this.itemIcon}`) + ')'}"
        class="misa-menu__item-icon"
        :class="displayIcon"
    />
    <div
        class="misa-menu__item-text"
        :class="displayText"
    >
      {{ itemText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MisaMenuItem",

  props: {
    activeClass: {
      type: Object
    },

    itemIcon: {
      type: String,
      required: true
    },

    itemText: {
      type: String,
      required: true
    },

    itemPath: {
      type: String,
      required: true,
      default: '/'
    },

    menuToggled: {
      type: Boolean
    }
  },

  computed: {
    displayIcon: function() {
      return this.menuToggled === true ? 'misa-menu__item-icon--shrink' : '';
    },

    displayText: function() {
      return this.menuToggled === true ? 'misa-hidden' : 'misa-show';
    }
  }
}
</script>

<style lang="scss">
.misa-menu__item {
  height: 42px;
  width: 100%;
  padding: 0 14px 0 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-content-text);
  cursor: pointer;
  transition: 0.2s all ease-in-out;
  border-left: 6px solid transparent;

  &:hover {
    background-color: var(--color-tertiary-hover);
  }

  &--active {
    background-color: var(--color-tertiary-hover);
    font-weight: bold;
    border-left-color: var(--color-primary);
  }

  &-icon {
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-right: 8px;

    &--shrink {
      margin-right: 0 !important;
    }
  }

  &-text {
    color: var(--color-white);
    white-space: nowrap;
  }
}
</style>