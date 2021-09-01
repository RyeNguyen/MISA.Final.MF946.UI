<template>
  <div class="misa-message">
    <div
        v-if="employeesToDelete.length > 0"
        class="misa-message__body"
    >
      <div
          class="misa-message__icon"
          :style="{backgroundImage: 'url(' + require(`@/assets/icon/${this.popupIcon}`) + ')'}"
      />
      <div class="misa-message__text">
        Bạn có thực sự muốn xóa Nhân viên {{employeeCodeToDelete}} không?
      </div>
    </div>

    <div class="misa-message__separator"/>

    <div class="misa-message__footer">
      <MisaButton
          buttonId="button-cancel"
          buttonText="Không"
          buttonType="secondary"
          @click.native="cancelRequest"
      />

      <MisaButton
          buttonId="button-submit"
          buttonText="Có"
          @click.native="confirmRequest"
      />
    </div>
  </div>
</template>

<script>
import EmployeesAPI from "@/api/components/EmployeesAPI";

export default {
  name: "MisaPopupMessage",

  props: {
    popupIcon: {
      type: String,
      required: true
    },

    employeesToDelete: {
      type: Array
    }
  },

  computed: {
    employeeCodeToDelete: function() {
      return `<${this.employeesToDelete[0]['EmployeeCode']}>`;
    }
  },

  emits: ['onMessageCancel', 'onMessageSubmit'],

  methods: {
    /**
     * Phương thức xử lý sự kiện khi click vào nút Hủy
     * Author: NQMinh (01/09/2021)
     */
    cancelRequest() {
      this.$emit('onMessageCancel');
    },

    /**
     * Phương thức xử lý sự kiện khi click vào nút Đồng ý
     * Author: NQMinh (01/09/2021)
     */
    confirmRequest() {
      let deleteIdList = [];

      this.employeesToDelete.forEach(employee => {
        deleteIdList.push(employee['EmployeeId']);
      })

      EmployeesAPI.delete(deleteIdList).then(res => {
        console.log(res);
        this.$emit('onMessageSubmit');
      }).catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style lang="scss">
.misa-message {
  width: 444px;
  min-width: 444px;
  height: auto;
  background-color: var(--color-white);
  padding: 32px;

  &__body {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 32px;
  }

  &__icon {
    height: 48px;
    width: 48px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__text {
    margin-top: 12px;
  }

  &__separator {
    height: 1px;
    background-color: var(--color-scroll-thumb);
    margin-bottom: 20px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>