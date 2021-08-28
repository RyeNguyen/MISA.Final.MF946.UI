<template>
  <div class="misa-content__header">
    <h1>Nhân viên</h1>
    <MisaButton
        buttonId="button-add"
        buttonType="primary"
        buttonText="Thêm mới nhân viên"
    />
  </div>
</template>

<script>
export default {
  name: "MisaContentHeader"
}
</script>

<style lang="scss">
.misa-content__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
}
</style>