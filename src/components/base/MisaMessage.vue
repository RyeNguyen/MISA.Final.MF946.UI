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

    <!-- Footer của popup có 2 nút -->
    <div
        v-if="popupMessageName === 'warning'"
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

    <!-- Footer của popup có 1 nút -->
    <div
        v-else-if="popupMessageName === 'error'"
        class="misa-message__footer misa-message__footer--secondary"
    >
      <MisaButton
          buttonId="button-submit"
          buttonText="Đóng"
          @click.native="cancelRequest"
      />
    </div>

    <!-- Footer của popup có 3 nút -->
    <div
        v-else-if="popupMessageName === 'verify'"
        class="misa-message__footer"
    >
      <MisaButton
          buttonId="button-cancel"
          buttonText="Hủy"
          buttonType="secondary"
          @click.native="cancelRequest"
      />

      <div class="misa-message__footer-buttons">
        <MisaButton
            buttonId="button-submit"
            buttonText="Không"
            buttonType="secondary"
            @click.native="destroyRequest"
        />

        <MisaButton
            buttonId="button-submit"
            buttonText="Có"
            @click.native="confirmRequest"
        />
      </div>
    </div>

    <MisaToast
        :showToast="showToast"
        :toastMessage="toastMessage"
        :toastType="toastType"
        @onToastHidden="showToast = false"
    />
  </div>
</template>

<script>
import EmployeesAPI from "@/api/components/EmployeesAPI";

export default {
  name: "MisaPopupMessage",

  mounted (){
    this.popupIcon = `misa-${this.popupMessageName}.svg`;
  },

  data() {
    return {
      popupIcon: 'misa-info.svg',

      showToast: false,

      toastMessage: '',

      toastType: 'default'
    }
  },

  props: {
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

  watch: {
    popupMessageName: function() {
      this.popupIcon = `misa-${this.popupMessageName}.svg`;
    }
  },

  computed: {
    /**
     * Phương thức kiểm tra điều kiện của popup
     * Author: NQMinh (01/09/2021)
     */
    popupCondition: function() {
      //Nếu như đây là popup xóa thì phải kiểm tra danh sách xóa có rỗng không, rỗng => không hiện
      if (this.popupMessageName === 'warning') {
        return this.employeesToDelete.length > 0;
      }
      //Nếu đây không phải popup xóa, tức là popup cảnh báo thông thường thì hiện popup bình thường
      return true;
    },

    /**
     * Phương thức kiểm tra điều kiện của popup để hiển thị thông báo tương ứng
     * Author: NQMinh (31/08/2021)
     */
    displayMessage: function() {
      if (this.popupMessageName === 'warning') {
        return `Bạn có thực sự muốn xóa Nhân viên <${this.employeesToDelete[0]['EmployeeCode']}> không?`;
      } else {
        return this.popupMessageText;
      }
    }
  },

  emits: ['onMessageCancel', 'onMessageDestroyed', 'onMessageSubmit'],

  methods: {
    /**
     * Phương thức xử lý sự kiện khi click vào nút Hủy
     * Author: NQMinh (01/09/2021)
     */
    cancelRequest() {
      this.$emit('onMessageCancel');
    },

    /**
     * Phương thức xử lý sự kiến khi click vào nút Đóng
     * Author: NQMinh (01/09/2021)
     */
    destroyRequest() {
      this.$emit('onMessageDestroyed');
    },

    /**
     * Phương thức xử lý sự kiện khi click vào nút Đồng ý
     * Author: NQMinh (01/09/2021)
     */
    confirmRequest() {
      //Nhấn submit khi ở popup xóa thì sẽ thực hiện xóa
      if (this.employeesToDelete) {
        //API chỉ nhận mảng các ID nên phải tạo mảng clone trích xuất các ID từ mảng chính
        let deleteIdList = [];

        this.employeesToDelete.forEach(employee => {
          deleteIdList.push(employee['EmployeeId']);
        })

        EmployeesAPI.delete(deleteIdList).then(() => {
          this.$emit('onMessageSubmit');
          const toastMessage = this.$responseData.MsgSuccessDeleteEmployee;
          this.handleSuccess(toastMessage);
        }).catch(error => {
          this.handleError(error);
        })
      }
      //Nếu không phải popup xóa thì sẽ truyền event lên để component cha xử lý
      else {
        this.$emit('onMessageSubmit');
      }
    },

    /**
     * Phương thức xử lý phản hồi thành công
     * @param toastMessage
     * Author: NQMinh (03/09/2021)
     */
    handleSuccess(toastMessage) {
      this.toastMessage = toastMessage;
      this.toastType = 'success';
      this.showToast = true;
    },

    /**
     * Phương thức xử lý phản hồi lỗi
     * @param response
     * Author: NQMinh (03/09/2021)
     */
    handleError(response) {
      const statusCode = response.response.status;

      if (statusCode >= 500) {
        this.toastMessage = this.$responseData.MsgErrorServer;
        this.toastType = 'error';
      } else if (statusCode >= 400 && statusCode < 500) {
        this.toastMessage = response.response.data['userMsg'];
        this.toastType = 'error';
      }

      this.showToast = true;
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

    &-buttons {
      display: flex;
      gap: 8px;
    }

    &--secondary {
      justify-content: center;
    }
  }
}
</style>