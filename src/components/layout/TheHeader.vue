<template>
  <div class="misa-header">
    <div class="misa-header--left">
      <div
          class="misa-header__toggle"
          :class="buttonActivated"
        @click="toggleMenu"
      />
      <div class="misa-header__branch">công ty tnhh sản xuất - thương mại - dịch vụ quy phúc</div>
      <div class="misa-header__arrow"></div>
    </div>
    <div class="misa-header--right">
      <div
          class="misa-header__icon"
      />
      <div class="misa-header__user">
        <div class="misa-header__user-profile"></div>
        <div class="misa-header__user-name">Nguyễn Quang Minh</div>
        <div class="misa-header__arrow"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",

  created() {
    const isAlreadyToggled = localStorage.getItem('menuToggled');
    if (isAlreadyToggled === 'toggled') {
      this.$emit('onMenuToggled');
    }
  },

  data() {
    return {
      isToggled: localStorage.getItem('menuToggled') === 'toggled'
    }
  },

  emits: ['onMenuToggled'],

  computed: {
    buttonActivated: function() {
      return this.isToggled === true ? 'misa-header__toggle--activated' : '';
    }
  },

  methods: {
    /**
     * Phương thức kích hoạt chế độ thu gọn của menu
     * Author: NQMinh (02/09/2021)
     */
    toggleMenu: function() {
      this.isToggled = !this.isToggled;
      if (this.isToggled === true) {
        localStorage.setItem('menuToggled', 'toggled');
      } else {
        localStorage.setItem('menuToggled', 'untouched');
      }
      this.$emit('onMenuToggled');
    }
  }
}
</script>

<style lang="scss">
.misa-header {
  width: 100%;
  height: 48px;
  padding: 0 20px 0 10px;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &--left {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  &--right {
    display: flex;
    align-items: center;
  }

  &__toggle {
    width: 24px;
    height: 24px;
    background-image: url('../../assets/icon/misa-toggle.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;

    &--activated {
      background-image: url('../../assets/icon/misa-menu-toggled.svg');
      position: absolute;
      left: 14px;
    }
  }

  &__arrow {
    width: 16px;
    height: 16px;
    background-image: url('../../assets/icon/misa-arrow-bottom-dark-2.svg');
    background-size: cover;
    background-position: center;
  }

  &__branch {
    font-size: 14px;
    text-transform: uppercase;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 600;
    text-overflow: ellipsis;
  }

  &__icon {
    width: 24px;
    height: 24px;
    margin: 0 10px;
    background-image: url('../../assets/icon/misa-notify.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    cursor: pointer;
  }

  &__user {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 0 16px;

    &-profile {
      width: 32px;
      height: 32px;
      margin-right: 6px;
      background-image: url('../../assets/icon/misa-avatar.svg');
      border-radius: 50%;
    }

    &-name {
      font-size: 14px;
      font-weight: 600;
      padding: 5px 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    & .misa-header__arrow {
      width: 14px;
      height: 14px;
      margin-left: 16px;
    }
  }
}
</style>