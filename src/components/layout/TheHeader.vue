<template>
  <div class="misa-header">
    <div class="misa-header--left">
      <div class="misa-header__toggle"></div>
      <div class="misa-header__branch">công ty cổ phần misa</div>
      <div class="misa-header__current-db">
        <div class="misa-header__current-db-icon"></div>
        <div>DC-01</div>
      </div>
    </div>
    <div class="misa-header--right">
      <MisaInput
          inputPlaceholder="Nhập từ khóa tìm kiếm"
          :isSearchable="true"
      />
      <div
          v-for="icon in headerIcons"
          :key="icon['headerIconId']"
          :id="icon['headerIconName']"
          :style="{backgroundImage: 'url(' + require(`@/assets/icon/${icon['headerIcon']}`) + ')'}"
          class="misa-header__icon"
      />
      <div class="misa-header__user">
        <div class="misa-header__user-profile"></div>
        <div class="misa-header__user-name">Nguyễn Quang Minh</div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderIconModel from '@/models/HeaderIconModel';

export default {
  name: "TheHeader",

  mounted() {
    this.headerIcons = HeaderIconModel.initData();
  },

  data() {
    return {
      headerIcons: []
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
  }

  &__branch {
    font-size: 14px;
    text-transform: uppercase;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 600;
    text-overflow: ellipsis;
  }

  &__current-db {
    height: 30px;
    margin: 0 10px 0 5px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid var(--color-border);
    border-radius: 40px;
    cursor: pointer;

    &-icon {
      width: 8px;
      height: 8px;
      background-color: var(--color-primary);
      border-radius: 50%;
      border: 1px solid var(--color-white);
      margin-right: 7px;
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
    margin: 0 10px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
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
      background-color: tomato;
      border-radius: 50%;
    }

    &-name {
      font-size: 14px;
      font-weight: 600;
      padding: 5px 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .misa-input {
    margin-right: 20px;
  }
}
</style>