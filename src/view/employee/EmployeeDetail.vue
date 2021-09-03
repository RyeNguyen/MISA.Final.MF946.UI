<template>
  <div v-if="isPopupVisible" class="misa-modal">
    <div class="misa-modal__header">
      <h1>Thông tin nhân viên</h1>
      <div class="misa-modal__checkbox">
        <MisaCheckbox/>
        <div>Là khách hàng</div>
      </div>
      <div class="misa-modal__checkbox">
        <MisaCheckbox/>
        <div>Là nhà cung cấp</div>
      </div>
      <div class="misa-modal__widget-buttons">
        <div class="misa-modal__ask"/>
        <div class="misa-modal__close" @click="hideModal"/>
      </div>
    </div>

    <div class="misa-modal__body">
      <div class="misa-modal__body--top">
        <div class="misa-modal__body--half">
          <div class="misa-modal__body-part">
            <MisaInput
                ref="inputCode"
                :inputValue="employee['EmployeeCode']"
                :isRequired="true"
                :isUnique="true"
                :isSubmitting="isSubmitting"
                inputId="input-code"
                inputName="EmployeeCode"
                inputPlaceholder="NV-1234"
                inputWidth="40%"
                labelName="Mã"
                @onInputTyping="bindingDataToModal"
            />

            <MisaInput
                ref="inputName"
                :inputValue="employee['FullName']"
                :isRequired="true"
                :isSubmitting="isSubmitting"
                inputId="input-name"
                inputName="FullName"
                inputPlaceholder="Nguyễn Quang Minh"
                inputWidth="60%"
                labelName="Tên"
                @onInputTyping="bindingDataToModal"
            />
          </div>
          <MisaCombobox
              :comboboxValue="employee['DepartmentId']"
              :isRequired="true"
              :isSubmitting="isSubmitting"
              comboboxName="DepartmentId"
              comboboxPlaceholder="Chọn đơn vị..."
              comboboxType="Department"
              inputId="input-department"
              inputWidth="100%"
              labelName="Đơn vị"
              @onComboboxChanged="bindingDataToModal"
          />

          <MisaInput
              :inputValue="employee['PositionName']"
              inputId="input-position"
              inputName="PositionName"
              inputPlaceholder="Kỹ sư phần mềm"
              inputWidth="100%"
              labelName="Chức danh"
              @onInputTyping="bindingDataToModal"
          />
        </div>

        <div class="misa-modal__body--half">
          <div class="misa-modal__body-part" style="gap: 16px">
            <MisaDateBox
                :inputValue="employee['DateOfBirth']"
                dateboxId="input-dob"
                dateboxName="DateOfBirth"
                dateboxWidth="40%"
                labelName="Ngày sinh"
                @onDateboxChanged="bindingDataToModal"
            />
            <MisaRadioGroup
                :inputValue="employee['Gender']"
                :radioItems="genderData"
                groupWidth="60%"
                labelName="Giới tính"
                radioType="Gender"
                @onRadioChanged="bindingDataToModal"
            />
          </div>

          <div class="misa-modal__body-part">
            <MisaInput
                :inputValue="employee['IdentityNumber']"
                inputId="input-identity-num"
                inputName="IdentityNumber"
                inputPlaceholder="01320008866"
                inputWidth="60%"
                labelName="Số CMND"
                @onInputTyping="bindingDataToModal"
            />
            <MisaDateBox
                :inputValue="employee['IdentityDate']"
                dateboxId="input-identity-date"
                dateboxName="IdentityDate"
                dateboxWidth="40%"
                labelName="Ngày cấp"
                @onDateboxChanged="bindingDataToModal"
            />
          </div>

          <MisaInput
              :inputValue="employee['IdentityPlace']"
              inputId="input-identity-place"
              inputName="IdentityPlace"
              inputPlaceholder="Bộ Công an Hà Nội"
              inputWidth="100%"
              labelName="Nơi cấp"
              @onInputTyping="bindingDataToModal"
          />
        </div>
      </div>

      <div class="misa-modal__body--bottom">
        <MisaInput
            :inputValue="employee['Address']"
            inputId="input-address"
            inputName="Address"
            inputPlaceholder="146 Phạm Văn Chiêu"
            inputWidth="100%"
            labelName="Địa chỉ"
            @onInputTyping="bindingDataToModal"
        />

        <div class="misa-modal__body-part">
          <MisaInput
              :inputValue="employee['MobilePhoneNumber']"
              inputId="input-mobile-phone"
              inputName="MobilePhoneNumber"
              inputPlaceholder="0963579744"
              inputType="tel"
              inputWidth="24%"
              labelName="ĐT di động"
              @onInputTyping="bindingDataToModal"
          />

          <MisaInput
              :inputValue="employee['TelephoneNumber']"
              inputId="input-telephone"
              inputName="TelephoneNumber"
              inputPlaceholder="(764) 749-6748"
              inputType="tel"
              inputWidth="24%"
              labelName="ĐT cố định"
              @onInputTyping="bindingDataToModal"
          />

          <MisaInput
              :inputValue="employee['Email']"
              inputId="input-email"
              inputName="Email"
              inputPlaceholder="procuon856@example.com"
              inputType="email"
              inputWidth="24%"
              labelName="Email"
              @onInputTyping="bindingDataToModal"
          />
        </div>

        <div class="misa-modal__body-part">
          <MisaInput
              :inputValue="employee['BankAccount']"
              inputId="input-bank-account"
              inputName="BankAccount"
              inputPlaceholder="944147"
              inputWidth="24%"
              labelName="Tài khoản ngân hàng"
              @onInputTyping="bindingDataToModal"
          />

          <MisaInput
              :inputValue="employee['BankName']"
              inputId="input-bank-name"
              inputName="BankName"
              inputPlaceholder="Ngân hàng Vietcombank"
              inputWidth="24%"
              labelName="Tên ngân hàng"
              @onInputTyping="bindingDataToModal"
          />

          <MisaInput
              :inputValue="employee['BankBranch']"
              inputId="input-bank-branch"
              inputName="BankBranch"
              inputPlaceholder="Chi nhánh 6"
              inputWidth="24%"
              labelName="Chi nhánh"
              @onInputTyping="bindingDataToModal"
          />
        </div>
      </div>
    </div>

    <div class="misa-modal__divider"></div>

    <div class="misa-modal__footer">
      <MisaButton
          buttonId="button-cancel"
          buttonText="Hủy"
          buttonType="secondary"
          @click.native="hideModal"
      />

      <div class="misa-button__group">
        <MisaButton
            buttonId="button-save"
            buttonText="Cất"
            buttonType="secondary"
            @click.native="submitDataAndClose"
        />

        <MisaButton
            buttonId="button-save-add"
            buttonText="Cất và thêm"
            @click.native="submitDataAndAdd"
        />
      </div>
    </div>

    <MisaPopup
        :isPopupVisible="isInsidePopupVisible"
        :popupContent="popupContent"
        @hidePopup="hidePopup"
    >
      <MisaMessage
          slot="popup-content-message"
          :popupMessageName="popupMessageName"
          :popupMessageText="validationInfo"
          @onMessageCancel="hidePopup"
          @onMessageDestroyed="hideAll"
          @onMessageSubmit="submitData"
      />
    </MisaPopup>

    <MisaToast
      :showToast="showToast"
      :toastMessage="toastMessage"
      :toastType="toastType"
      @onToastHidden="showToast = false"
    />
  </div>
</template>

<script>
import MisaRadioGroup from "@/components/base/MisaRadioGroup";
import EmployeesAPI from "@/api/components/EmployeesAPI";
import EmployeeModel from "@/models/EmployeeModel";
import GenderModel from "@/models/GenderModel";

export default {
  name: "EmployeeDetail",

  created() {
    this.employee = JSON.parse(JSON.stringify(this.employeeData));
    //Autofocus vào mã nhân viên khi vừa khởi tạo form
    setTimeout(() => {
      this.$refs.inputCode.$el.lastElementChild.focus();
    }, 600);

    // EmployeesAPI.getAllCode().then(res => {
    //   this.codeList = res.data;
    // }).catch(error => {
    //   console.log(error);
    // })
  },

  data() {
    return {
      employee: {},

      isInsidePopupVisible: false,

      popupContent: 'content-message',

      validationInfo: '',

      genderData: GenderModel.initData(),

      popupMessageName: '',

      isSubmitting: false,

      showToast: false,

      toastMessage: '',

      toastType: 'default'
    }
  },

  props: {
    employeeData: {
      type: Object
    },

    isPopupVisible: {
      type: Boolean
    },

    wantToCreateNewEmployee: {
      type: Boolean,
      required: true
    }
  },

  components: {
    MisaRadioGroup
  },

  watch: {
    /**
     * Phương thức kiểm tra trạng thái mở của modal để autofocus vào trường mã nhân viên
     * Author: NQMinh (30/08/2021)
     */
    isPopupVisible: function () {
      this.employee = JSON.parse(JSON.stringify(this.employeeData));
      if (this.isPopupVisible === true) {
        setTimeout(() => {
          this.$refs.inputCode.$el.lastElementChild.focus();
        }, 600);
      } else {
        this.employee = EmployeeModel.initData();
      }
    }
  },

  emits: ['dataChangedAndClose', 'dataChangedAndAdd', 'onHidingModal'],

  methods: {
    submitDataAndClose() {
      this.submitData(false);
    },

    submitDataAndAdd() {
      this.submitData(true);
    },

    /**
     * Phương thức xử lý sự kiện khi nhấn submit button
     * Author: NQMinh (31/08/2021)
     * Modified: NQMinh (31/08/2021)
     */
    submitData(wantToAddMore) {
      this.isSubmitting = true;
      let soFarSoGood = true;

      //TODO: Validate dữ liệu
      //Kiểm tra mã nv có trống hay không
      if (soFarSoGood) {
        soFarSoGood = this.validateRequired(this.employee['EmployeeCode'], 'Mã');
      }

      //Kiểm tra mã nv có trùng hay không
      if (this.wantToCreateNewEmployee && soFarSoGood) {
        soFarSoGood = this.validateDuplicatedCode();
      }

      //Kiểm tra tên nv có trống hay không
      if (soFarSoGood) {
        soFarSoGood = this.validateRequired(this.employee['FullName'], 'Tên');
      }

      //Kiểm tra đơn vị có trống hay không
      if (soFarSoGood) {
        soFarSoGood = this.validateRequired(this.employee['DepartmentId'], 'Đơn vị');
      }

      if (soFarSoGood) {
        switch (this.wantToCreateNewEmployee) {
          case true: {
            this.addEmployeeToDatabase(wantToAddMore);
            break;
          }
          case false: {
            this.updateEmployeeInformation(wantToAddMore);
            break;
          }
        }
        this.isInsidePopupVisible = false;
      }
    },

    /**
     * Phương thức kiểm tra dữ liệu bắt buộc nhập
     * Author: NQMinh (01/09/2021)
     */
    validateRequired(inputFieldValue, inputFieldName) {
      let isValid = true;
      if (inputFieldValue === '' || inputFieldValue === null) {
        this.popupMessageName = 'error';
        this.validationInfo = `${inputFieldName} không được để trống.`
        this.isInsidePopupVisible = true;
        isValid = false;
      }
      return isValid;
    },

    /**
     * Phương thức kiểm tra mã trùng
     * Author: NQMinh (02/09/2021)
     */
    // validateDuplicateCode() {
    //   for (let i = 0; i < this.codeList.length; i++) {
    //     if (this.codeList[i] === this.employee['EmployeeCode']) {
    //       this.popupMessageName = 'error';
    //       this.validationInfo = `Nhân viên <${this.employee['EmployeeCode']}> đã tồn tại.`;
    //       this.isInsidePopupVisible = true;
    //       return false;
    //     }
    //   }
    //   return true;
    // },

    /**
     * Phương thức kiểm tra mã trùng
     * Author: NQMinh (03/09/2021)
     */
    async validateDuplicatedCode() {
      try {
        const response = await EmployeesAPI.checkDuplicatedCode(`"${this.employee['EmployeeCode']}"`);
        if (response.data === true) {
          this.popupMessageName = 'error';
          this.validationInfo = `Nhân viên <${this.employee['EmployeeCode']}> đã tồn tại.`;
          this.isInsidePopupVisible = true;
          return response.data;
        }
        return response.data;
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * Phương thức call API thêm nhân viên vào database
     * Author: NQMinh (31/08/2021)
     */
    addEmployeeToDatabase(wantToAddMore) {
      EmployeesAPI.add(this.employee).then(res => {
        console.log(res);
        if (wantToAddMore) {
          this.$emit('dataChangedAndAdd');
        } else {
          this.$emit('dataChangedAndClose');
        }
        this.toastMessage = 'Cất thông tin nhân viên thành công.';
        this.toastType = 'success';
        this.showToast = true;
      }).catch(error => {
        console.log(error);
        this.toastMessage = 'Cất thông tin nhân viên thất bại.';
        this.toastType = 'error';
        this.showToast = true;
      })
    },

    /**
     * Phương thức call API chỉnh sửa thông tin nhân viên
     * Author: NQMinh (31/08/2021)
     */
    updateEmployeeInformation(wantToAddMore) {
      EmployeesAPI.update(this.employee['EmployeeId'], this.employee).then(res => {
        console.log(res);
        if (wantToAddMore) {
          this.$emit('dataChangedAndAdd');
        } else {
          this.$emit('dataChangedAndClose');
        }
        this.toastMessage = 'Cất thông tin nhân viên thành công.';
        this.toastType = 'success';
        this.showToast = true;
      }).catch(error => {
        console.log(error);
        this.toastMessage = 'Cất thông tin nhân viên thất bại.';
        this.toastType = 'error';
        this.showToast = true;
      })
    },

    /**
     * Phương thức kiểm tra dữ liệu có bị thay đổi so với ban đầu không
     * Author: NQMinh (02/09/2021)
     */
    isDataChanged() {
      for (let prop in this.employee) {
        if (this.employee[prop] != null) {
          if (this.employee[prop].toString().length === 0) {
            if (this.employeeData[prop]) {
              return true;
            }
          } else if (this.employee[prop] !== this.employeeData[prop]) {
            return true;
          }
        }
      }
      return false;
    },

    /**
     * Phương thức binding dữ liệu lên modal
     * @param inputType
     * @param inputData
     * Author: NQMinh (01/09/2021)
     */
    bindingDataToModal(inputType, inputData) {
      this.employee[inputType] = inputData;
    },

    /**
     * Phương thức thay đổi trạng thái của popup thông báo thành đóng (không phải popup modal)
     * Author: NQMinh (01/09/2021)
     */
    hidePopup() {
      this.isInsidePopupVisible = false;
    },

    /**
     * Phương thức thay đổi trạng thái của modal thành đóng
     * Author: NQMinh (01/09/2021)
     */
    hideModal() {
      if (this.isDataChanged()) {
        this.popupMessageName = 'verify';
        this.validationInfo = 'Dữ liệu đã bị thay đổi. Bạn có muốn cất không?';
        this.isInsidePopupVisible = true;
      } else {
        this.$emit('onHidingModal');
      }
    },

    /**
     * Phương thức thay đổi trạng thái của cả popup trong modal và modal thành đóng
     * Author: NQMinh (01/09/2021)
     */
    hideAll() {
      this.isInsidePopupVisible = false;
      this.$emit('onHidingModal');
    }
  }
}
</script>

<style lang="scss">
.misa-modal {
  width: 900px !important;
  min-width: 900px;
  padding: 20px 32px;

  .misa-input,
  .misa-datebox {
    margin-bottom: 12px;

    input::placeholder {
      font-style: normal !important;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    position: relative;
  }

  &__widget-buttons {
    position: absolute;
    top: -8px;
    right: -20px;
    display: flex;
    gap: 6px;
  }

  &__ask,
  &__close {
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    cursor: pointer;
  }

  &__ask {
    background-image: url('../../assets/icon/misa-ask.svg');
  }

  &__close {
    background-image: url('../../assets/icon/misa-close.svg');
  }

  &__checkbox {
    margin: 0 19.5px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__body {
    &-part {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    &--top {
      display: flex;
      align-items: flex-start;
      gap: 26px;
      margin-bottom: 12px;
    }

    &--half {
      width: 50%;
    }
  }

  &__divider {
    width: 100%;
    margin: 32px 0 20px;
    border-top: 1px solid #E0E0E0;
  }

  &__footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>