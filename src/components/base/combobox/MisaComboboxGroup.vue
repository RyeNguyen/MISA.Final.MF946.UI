<template>
  <div class="misa-combobox-group">
    <span class="misa-combobox-group--left">Mã đơn vị</span>
    <span class="misa-combobox-group--right">Tên đơn vị</span>
  </div>
</template>

<script>
export default {
  name: "MisaComboboxGroup"
}
</script>

<style lang="scss" scoped>
.misa-combobox-group {
  display: flex;
  align-items: center;
  height: 100%;

  &--left {
    width: 30%;
  }

  &--right {
    width: 70%;
  }
}
</style>