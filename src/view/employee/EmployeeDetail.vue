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
            />

            <MisaInput
                inputId="input-name"
                labelName="Tên"
                inputWidth="60%"
                inputPlaceholder="Nguyễn Quang Minh"
            />
          </div>

          <MisaInput
              inputId="input-department"
              labelName="Đơn vị"
              inputWidth="100%"
          />

          <MisaInput
              inputId="input-position"
              labelName="Chức danh"
              inputWidth="100%"
              inputPlaceholder="Kỹ sư phần mềm"
          />
        </div>

        <div class="misa-modal__body--half">
<!--          <MisaInput-->
<!--              inputId="input-dob"-->
<!--              labelName="Ngày sinh"-->
<!--              inputWidth="40%"-->
<!--              inputType="date"-->
<!--          />-->
          <MisaDateBox
            dateboxId="input-dob"
            labelName="Ngày sinh"
          />

          <div class="misa-modal__body-part">
            <MisaInput
                inputId="input-identity-num"
                labelName="Số CMND"
                inputWidth="60%"
                inputPlaceholder="01320008866"
            />

            <MisaInput
                inputId="input-identity-date"
                labelName="Ngày cấp"
                inputWidth="40%"
                inputType="date"
            />
          </div>

          <MisaInput
              inputId="input-identity-place"
              labelName="Nơi cấp"
              inputWidth="100%"
              inputPlaceholder="Bộ Công an Hà Nội"
          />
        </div>
      </div>

      <div class="misa-modal__body--bottom">
        <MisaInput
            inputId="input-address"
            labelName="Địa chỉ"
            inputWidth="100%"
            inputPlaceholder="146 Phạm Văn Chiêu"
        />

        <div class="misa-modal__body-part">
          <MisaInput
              inputId="input-mobile-phone"
              labelName="ĐT di động"
              inputWidth="24%"
              inputType="tel"
              inputPlaceholder="0963579744"
          />

          <MisaInput
              inputId="input-telephone"
              labelName="ĐT cố định"
              inputWidth="24%"
              inputType="tel"
              inputPlaceholder="(764) 749-6748"
          />

          <MisaInput
              inputId="input-email"
              labelName="Email"
              inputWidth="24%"
              inputType="email"
              inputPlaceholder="procuon856@example.com"
          />
        </div>

        <div class="misa-modal__body-part">
          <MisaInput
              inputId="input-bank-account"
              labelName="Tài khoản ngân hàng"
              inputWidth="24%"
              inputPlaceholder="944147"
          />

          <MisaInput
              inputId="input-bank-name"
              labelName="Tên ngân hàng"
              inputWidth="24%"
              inputPlaceholder="Ngân hàng Vietcombank"
          />

          <MisaInput
              inputId="input-bank-branch"
              labelName="Chi nhánh"
              inputWidth="24%"
              inputPlaceholder="Chi nhánh 6"
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
export default {
  name: "EmployeeDetail",

  props: {
    employeeData: {
      type: Object
    }
  }
}
</script>

<style lang="scss">
.misa-modal {
  width: 900px;
  min-width: 900px;
  padding: 20px 32px;

  .misa-input {
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