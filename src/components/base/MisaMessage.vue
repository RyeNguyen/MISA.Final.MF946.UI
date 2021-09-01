<template>
  <div class="misa-message">
    <div
        v-if="popupCondition"
        class="misa-message__body"
    >
      <div
          class="misa-message__icon"
          :style="{backgroundImage: 'url(' + require(`@/assets/icon/${this.popupIcon}`) + ')'}"
      />
      <div class="misa-message__text">
        {{ displayMessage }}
      </div>
    </div>

    <div class="misa-message__separator"/>

    <div
        v-if="popupMessageName === 'delete'"
        class="misa-message__footer"
    >
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

    <div
        v-else
        class="misa-message__footer misa-message__footer--secondary"
    >
      <MisaButton
          buttonId="button-submit"
          buttonText="Đóng"
          @click.native="cancelRequest"
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
    },

    popupMessageName: {
      type: String,
      required: true
    },

    popupMessageText: {
      type: String
    }
  },

  computed: {
    /**
     * Phương thức kiểm tra điều kiện của popup
     * Author: NQMinh (01/09/2021)
     */
    popupCondition: function() {
      //Nếu như đây là popup xóa thì phải kiểm tra danh sách xóa có rỗng không, rỗng => không hiện
      if (this.popupMessageName === 'delete') {
        return this.employeesToDelete.length > 0;
      }
      //Nếu đây không phải popup xóa, tức là popup cảnh báo thông thường thì hiện popup bình thường
      return true;
    },

    /**
     * Phương thức kiểm tra điều kiện của popup để hiển thị thông báo tương ứng
     */
    displayMessage: function() {
      if (this.popupMessageName === 'delete') {
        return `Bạn có thực sự muốn xóa Nhân viên <${this.employeesToDelete[0]['EmployeeCode']}> không?`;
      } else {
        return this.popupMessageText;
      }
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
      //API chỉ nhận mảng các ID nên phải tạo mảng clone trích xuất các ID từ mảng chính
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
  width: 444px !important;
  min-width: 444px;
  height: auto;
  background-color: var(--color-white);
  padding: 32px;

  &__body {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  &__icon {
    height: 48px;
    width: 48px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__text {
    margin: 12px 0 32px;
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

    &--secondary {
      justify-content: center;
    }
  }
}
</style>