<template>
  <div class="misa-header">
    <div class="misa-header--left">
      <div class="misa-header__toggle"></div>
      <div class="misa-header__branch">công ty tnhh sản xuất - thương mại - dịch vụ quy phúc</div>
    </div>
    <div class="misa-header--right">
      <div
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
export default {
  name: "TheHeader"
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
  }
}
</style>