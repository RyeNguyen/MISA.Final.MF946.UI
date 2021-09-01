<template>
  <div class="misa-modal" v-if="isPopupVisible">
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
    </div>

    <div class="misa-modal__body">
      <div class="misa-modal__body--top">
        <div class="misa-modal__body--half">
          <div class="misa-modal__body-part">
            <MisaInput
                ref="inputCode"
                inputId="input-code"
                labelName="Mã"
                inputName="EmployeeCode"
                inputWidth="40%"
                inputPlaceholder="NV-1234"
                :isRequired="true"
                :inputValue="employee['EmployeeCode']"
                @onInputTyping="bindingDataToModal"
            />

            <MisaInput
                inputId="input-name"
                labelName="Tên"
                inputName="FullName"
                inputWidth="60%"
                inputPlaceholder="Nguyễn Quang Minh"
                :isRequired="true"
                :inputValue="employee['FullName']"
                @onInputTyping="bindingDataToModal"
            />
          </div>
          <MisaCombobox
              inputId="input-department"
              labelName="Đơn vị"
              inputWidth="100%"
              :comboboxValue="employee['DepartmentId']"
              :isRequired="true"
              comboboxType="Department"
              comboboxName="DepartmentId"
              comboboxPlaceholder="Chọn đơn vị..."
              @onComboboxChanged="bindingDataToModal"
          />

          <MisaInput
              inputId="input-position"
              labelName="Chức danh"
              inputName="PositionName"
              inputWidth="100%"
              inputPlaceholder="Kỹ sư phần mềm"
              :inputValue="employee['PositionName']"
              @onInputTyping="bindingDataToModal"
          />
        </div>

        <div class="misa-modal__body--half">
          <div class="misa-modal__body-part" style="gap: 16px">
            <MisaDateBox
                dateboxId="input-dob"
                labelName="Ngày sinh"
                dateboxWidth="40%"
                :inputValue="employee['DateOfBirth']"
            />
            <MisaRadioGroup
              :radioItems="genderData"
              radioType="Gender"
              groupWidth="60%"
              labelName="Giới tính"
              :inputValue="employee['Gender']"
              @onRadioChanged="bindingDataToModal"
            />
          </div>

          <div class="misa-modal__body-part">
            <MisaInput
                inputId="input-identity-num"
                labelName="Số CMND"
                inputName="IdentityNumber"
                inputWidth="60%"
                inputPlaceholder="01320008866"
                :inputValue="employee['IdentityNumber']"
                @onInputTyping="bindingDataToModal"
            />
            <MisaDateBox
                dateboxId="input-identity-date"
                labelName="Ngày cấp"
                dateboxWidth="40%"
                :inputValue="employee['IdentityDate']"
            />
          </div>

          <MisaInput
              inputId="input-identity-place"
              labelName="Nơi cấp"
              inputName="IdentityPlace"
              inputWidth="100%"
              inputPlaceholder="Bộ Công an Hà Nội"
              :inputValue="employee['IdentityPlace']"
              @onInputTyping="bindingDataToModal"
          />
        </div>
      </div>

      <div class="misa-modal__body--bottom">
        <MisaInput
            inputId="input-address"
            labelName="Địa chỉ"
            inputName="Address"
            inputWidth="100%"
            inputPlaceholder="146 Phạm Văn Chiêu"
            :inputValue="employee['Address']"
            @onInputTyping="bindingDataToModal"
        />

        <div class="misa-modal__body-part">
          <MisaInput
              inputId="input-mobile-phone"
              labelName="ĐT di động"
              inputName="MobilePhoneNumber"
              inputWidth="24%"
              inputType="tel"
              inputPlaceholder="0963579744"
              :inputValue="employee['MobilePhoneNumber']"
              @onInputTyping="bindingDataToModal"
          />

          <MisaInput
              inputId="input-telephone"
              labelName="ĐT cố định"
              inputName="TelephoneNumber"
              inputWidth="24%"
              inputType="tel"
              inputPlaceholder="(764) 749-6748"
              :inputValue="employee['TelephoneNumber']"
              @onInputTyping="bindingDataToModal"
          />

          <MisaInput
              inputId="input-email"
              labelName="Email"
              inputName="Email"
              inputWidth="24%"
              inputType="email"
              inputPlaceholder="procuon856@example.com"
              :inputValue="employee['Email']"
              @onInputTyping="bindingDataToModal"
          />
        </div>

        <div class="misa-modal__body-part">
          <MisaInput
              inputId="input-bank-account"
              labelName="Tài khoản ngân hàng"
              inputName="BankAccount"
              inputWidth="24%"
              inputPlaceholder="944147"
              :inputValue="employee['BankAccount']"
              @onInputTyping="bindingDataToModal"
          />

          <MisaInput
              inputId="input-bank-name"
              labelName="Tên ngân hàng"
              inputName="BankName"
              inputWidth="24%"
              inputPlaceholder="Ngân hàng Vietcombank"
              :inputValue="employee['BankName']"
              @onInputTyping="bindingDataToModal"
          />

          <MisaInput
              inputId="input-bank-branch"
              labelName="Chi nhánh"
              inputName="BankBranch"
              inputWidth="24%"
              inputPlaceholder="Chi nhánh 6"
              :inputValue="employee['BankBranch']"
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
            @click.native="submitData"
        />

        <MisaButton
            buttonId="button-save-add"
            buttonText="Cất và thêm"
        />
      </div>
    </div>

    <MisaPopup
        :isPopupVisible="isInsidePopupVisible"
        :popupContent="popupContent"
        @hidePopup="hidePopup"
    >
      <MisaMessage
          popupMessageName="info"
          :popupMessageText="validationInfo"
          slot="popup-content-message"
          popupIcon="misa-error.svg"
          @onMessageCancel="hidePopup"
      />
    </MisaPopup>
  </div>
</template>

<script>
import MisaRadioGroup from "@/components/base/MisaRadioGroup";
import EmployeesAPI from "@/api/components/EmployeesAPI";
import EmployeeModel from "@/models/EmployeeModel";
import GenderModel from "@/models/GenderModel";

export default {
  name: "EmployeeDetail",

  mounted() {
    this.employee = this.employeeData;
    this.$nextTick(() => {
      this.$refs.inputCode.$el.lastElementChild.focus();
    })
  },

  data() {
    return {
      employee: this.employeeData,

      isInsidePopupVisible: false,

      popupContent: 'content-message',

      validationInfo: '',

      genderData: GenderModel.initData()
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
    isPopupVisible: function() {
      this.employee = this.employeeData;
      if(this.isPopupVisible === true) {
        setTimeout(() => {
          this.$refs.inputCode.$el.lastElementChild.focus();
        }, 600);
      } else {
        this.employee = EmployeeModel.initData();
      }
    }
  },

  emits: ['dataChanged', 'onHidingModal'],

  methods: {
    /**
     * Phương thức xử lý sự kiện khi nhấn submit button
     * Author: NQMinh (31/08/2021)
     * Modified: NQMinh (31/08/2021)
     */
    submitData() {
      let soFarSoGood = true;

      //TODO: Validate dữ liệu
      //Kiểm tra mã nv có trống hay không
      if (soFarSoGood) {
        soFarSoGood = this.validateRequired(this.employee['EmployeeCode'], 'Mã');
      }

      //TODO: Check trùng mã

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
            this.addEmployeeToDatabase();
            break;
          }
          case false: {
            this.updateEmployeeInformation();
            break;
          }
        }
      }
    },

    /**
     * Phương thức kiểm tra dữ liệu bắt buộc nhập
     * Author: NQMinh (01/09/2021)
     */
    validateRequired(inputFieldValue, inputFieldName) {
      let isValid = true;
      if (inputFieldValue === '' || inputFieldValue === null) {
        this.validationInfo = `${inputFieldName} không được để trống.`
        this.isInsidePopupVisible = true;
        isValid = false;
      }
      return isValid;
    },

    /**
     * Phương thức call API thêm nhân viên vào database
     * Author: NQMinh (31/08/2021)
     */
    addEmployeeToDatabase() {
      EmployeesAPI.add(this.employee).then(res => {
        console.log(res);
        this.$emit('dataChanged');
      }).catch(error => {
        console.log(error);
      })
    },

    /**
     * Phương thức call API chỉnh sửa thông tin nhân viên
     * Author: NQMinh (31/08/2021)
     */
    updateEmployeeInformation() {
      EmployeesAPI.update(this.employee['EmployeeId'], this.employee).then(res => {
        console.log(res);
        this.$emit('dataChanged');
      }).catch(error => {
        console.log(error);
      })
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