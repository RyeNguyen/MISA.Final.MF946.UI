<template>
<div class="misa-content__search">
  <MisaInput
    inputPlaceholder="Tìm theo mã, tên nhân viên"
    :isSearchable="true"
  />
  <div class="misa-content__reload"></div>
</div>
</template>

<script>
export default {
  name: "MisaContentSearchSection"
}
</script>

<style lang="scss">
.misa-content__search {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.misa-content__reload {
  width: 24px;
  height: 24px;
  background-image: url('../../../assets/icon/misa-reload.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-left: 16px;
}
</style>