<template>
  <div class="misa-modal">
    <div class="misa-modal__header">
      <h1>Thông tin nhân viên</h1>
      <div class="misa-modal__checkbox">
        <input type="checkbox">
        <div>Là khách hàng</div>
      </div>
      <div class="misa-modal__checkbox">
        <input type="checkbox">
        <div>Là nhà cung cấp</div>
      </div>
    </div>

    <div class="misa-modal__body">
      <div class="misa-modal__body--top">
        <div class="misa-modal__body--half">
          <div class="misa-modal__body-part">
            <MisaInput
                inputId="input-code"
                labelName="Mã"
                inputWidth="40%"
                inputPlaceholder="NV-1234"
                :inputValue="employeeData['EmployeeCode']"
            />

            <MisaInput
                inputId="input-name"
                labelName="Tên"
                inputWidth="60%"
                inputPlaceholder="Nguyễn Quang Minh"
                :inputValue="employeeData['FullName']"
            />
          </div>

          <MisaInput
              inputId="input-department"
              labelName="Đơn vị"
              inputWidth="100%"
              :inputValue="employeeData['DepartmentName']"
          />

          <MisaInput
              inputId="input-position"
              labelName="Chức danh"
              inputWidth="100%"
              inputPlaceholder="Kỹ sư phần mềm"
              :inputValue="employeeData['PositionName']"
          />
        </div>

        <div class="misa-modal__body--half">
<!--          <MisaInput-->
<!--              inputId="input-dob"-->
<!--              labelName="Ngày sinh"-->
<!--              inputWidth="40%"-->
<!--              inputType="date"-->
<!--          />-->
          <div class="misa-modal__body-part" style="gap: 16px">
            <MisaDateBox
                dateboxId="input-dob"
                labelName="Ngày sinh"
                dateboxWidth="40%"
                :inputValue="employeeData['DateOfBirth']"
            />
            <MisaRadioGroup
              :radioItems="['Nam', 'Nữ', 'Khác']"
              groupWidth="60%"
              labelName="Giới tính"
            />
          </div>

          <div class="misa-modal__body-part">
            <MisaInput
                inputId="input-identity-num"
                labelName="Số CMND"
                inputWidth="60%"
                inputPlaceholder="01320008866"
                :inputValue="employeeData['IdentityNumber']"
            />

<!--            <MisaInput-->
<!--                inputId="input-identity-date"-->
<!--                labelName="Ngày cấp"-->
<!--                inputWidth="40%"-->
<!--                inputType="date"-->
<!--            />-->

            <MisaDateBox
                dateboxId="input-identity-date"
                labelName="Ngày cấp"
                dateboxWidth="40%"
                :inputValue="employeeData['IdentityDate']"
            />
          </div>

          <MisaInput
              inputId="input-identity-place"
              labelName="Nơi cấp"
              inputWidth="100%"
              inputPlaceholder="Bộ Công an Hà Nội"
              :inputValue="employeeData['IdentityPlace']"
          />
        </div>
      </div>

      <div class="misa-modal__body--bottom">
        <MisaInput
            inputId="input-address"
            labelName="Địa chỉ"
            inputWidth="100%"
            inputPlaceholder="146 Phạm Văn Chiêu"
            :inputValue="employeeData['Address']"
        />

        <div class="misa-modal__body-part">
          <MisaInput
              inputId="input-mobile-phone"
              labelName="ĐT di động"
              inputWidth="24%"
              inputType="tel"
              inputPlaceholder="0963579744"
              :inputValue="employeeData['MobilePhoneNumber']"
          />

          <MisaInput
              inputId="input-telephone"
              labelName="ĐT cố định"
              inputWidth="24%"
              inputType="tel"
              inputPlaceholder="(764) 749-6748"
              :inputValue="employeeData['TelephoneNumber']"
          />

          <MisaInput
              inputId="input-email"
              labelName="Email"
              inputWidth="24%"
              inputType="email"
              inputPlaceholder="procuon856@example.com"
              :inputValue="employeeData['Email']"
          />
        </div>

        <div class="misa-modal__body-part">
          <MisaInput
              inputId="input-bank-account"
              labelName="Tài khoản ngân hàng"
              inputWidth="24%"
              inputPlaceholder="944147"
              :inputValue="employeeData['BankAccount']"
          />

          <MisaInput
              inputId="input-bank-name"
              labelName="Tên ngân hàng"
              inputWidth="24%"
              inputPlaceholder="Ngân hàng Vietcombank"
              :inputValue="employeeData['BankName']"
          />

          <MisaInput
              inputId="input-bank-branch"
              labelName="Chi nhánh"
              inputWidth="24%"
              inputPlaceholder="Chi nhánh 6"
              :inputValue="employeeData['BankBranch']"
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
        tabIndex="1"
      />

      <div class="misa-button__group">
        <MisaButton
            buttonId="button-save"
            buttonText="Cất"
            buttonType="secondary"
            tabIndex="2"
        />

        <MisaButton
            buttonId="button-save-add"
            buttonText="Cất và thêm"
            tabIndex="3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MisaRadioGroup from "@/components/base/MisaRadioGroup";

export default {
  name: "EmployeeDetail",

  data() {
    return {
      employee: this.employeeData
    }
  },

  props: {
    employeeData: {
      type: Object
    }
  },

  components: {
    MisaRadioGroup
  }
}
</script>

<style lang="scss">
.misa-modal {
  width: 900px;
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