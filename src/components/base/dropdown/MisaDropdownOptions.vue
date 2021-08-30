<template>
  <div
      :class="[
          {'dropdown__content--hidden': contentHidden}
      ]"
      class="dropdown__content"
  >
    <div
        v-for="(option, index) in dropdownOptions"
        :key="index"
        @click="optionActive(index)"
    >
      {{ option }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MisaDropdownOptions",

  created () {
    this.dropdownOptions = this.dropdownItems;
  },

  data() {
    return {
      currentIndex: -1,
      dropdownOptions: [],
      isActive: false
    }
  },

  props: {
    contentHidden: {
      type: Boolean
    },

    dropdownItems: {
      type: Array
    }
  },

  emits: ['dropdown-item-active'],

  methods: {
    //Hàm chọn một option trong số các options được xổ ra bởi dropdown
    //Author: NQMinh(29/07/2021)
    optionActive(index) {
      this.currentIndex = index;
      this.$emit('dropdown-item-active', this.dropdownOptions[this.currentIndex]);
    },

    //Hàm chuyển dropdown về trạng thái ban đầu (không chọn gì cả)
    //Author: NQMinh(29/07/2021)
    resetDropdown() {
      this.currentIndex = -1;
      this.$emit('dropdown-item-active');
    }
  }
}
</script>

<style lang="scss">
.dropdown__content {
  width: 100%;
  position: absolute;
  display: block;
  z-index: 1000;
  padding: 4px 0;
  background-color: var(--color-white);
  border-radius: 4px;
  box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.25);

  &.out-of-space {
    bottom: 40px;
  }

  &--hidden {
    display: none;
  }

  &--show {
    display: block;
  }

  & a {
    height: 40px;
    padding: 0 10px 0 33px;
    color: var(--color-content-text);
    text-decoration: none;
    display: flex;
    align-items: center;
    position: relative;
    transition: 0.2s all ease-in-out;

    &:hover {
      background-color: var(--color-secondary-hover);
      color: var(--color-content-text);
    }
  }

  &-link--active {
    background-color: var(--color-primary);
    color: var(--color-white) !important;

    &:hover {
      background-color: var(--color-primary-hover) !important;
      color: var(--color-white) !important;
    }

    & i {
      display: block !important;
    }
  }

  & a i {
    position: absolute;
    left: 10px;
    top: 13px;
    font-size: 13px;
    display: none;
    color: var(--color-white);
  }
}
</style>