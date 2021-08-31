<template>
  <div class="misa-content__header">
    <h1>Nhân viên</h1>
    <MisaButton
        buttonId="button-add"
        buttonType="primary"
        buttonText="Thêm mới nhân viên"
        @click.native="clickAddButton"
    />
  </div>
</template>

<script>
import EmployeesAPI from "@/api/components/EmployeesAPI";

export default {
  name: "MisaContentHeader",

  data() {
    return {
      newCode: null
    }
  },

  emits: ['onInsertMode'],

  methods: {
    /**
     * Phương thức sinh mã mới và báo cho component cha biết để mở popup modal
     * Author: NQMinh (30/08/2021)
     */
    clickAddButton() {
      EmployeesAPI.getNewCode().then(res => {
        this.newCode = res.data;
        this.$emit('onInsertMode', this.newCode);
      }).catch(error => {
        console.log(error);
        this.$emit('onInsertMode', "");
      })
    }
  }
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