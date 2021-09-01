<template>
  <div
      :style="{width: this.inputWidth}"
      class="misa-input"
  >
    <div :class="{'misa-input__label': labelName !== null}">
      <label :for="inputId">
        {{ labelName }} <span v-if="isRequired" class="misa-asterisk">*</span>
      </label>
    </div>
    <input
        ref="modalInput"
        :id="inputId"
        v-model="inputData"
        :class="[
            {'misa-input-icon': isSearchable === true},
            {'misa-input--error': isValid !== true}
            ]"
        :placeholder="inputPlaceholder"
        :type="inputType"
        @blur="validateInput"
        @input="removeError"
    >
    <span v-if="this.isSearchable === true" class="misa-input__icon"/>
  </div>
</template>

<script>
export default {
  name: "MisaInput",

  mounted() {
    this.inputData = this.inputValue;
  },

  data() {
    return {
      inputData: this.inputValue,

      isValid: true
    }
  },

  props: {
    //Tên của trường
    inputName: {
      type: String,
      required: true
    },

    //ID của trường
    inputId: {
      type: String,
      required: true
    },

    //Tên label
    labelName: {
      type: String,
      default: null
    },

    //Độ rộng của trường
    inputWidth: {
      type: String,
      default: '240px'
    },

    //Placholder của trường
    inputPlaceholder: {
      type: String
    },

    //Kiểu của trường (text/email/tel/date)
    inputType: {
      type: String,
      default: "text"
    },

    //Biến kiểm tra đây có phải là trường tìm kiếm nhân viên không
    isSearchable: {
      type: Boolean
    },

    //Dữ liệu mặc định truyền vào
    inputValue: {
      default: null
    },

    //Biến kiểm tra trường có bắt buộc nhập hay không
    isRequired: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    inputData: function () {
      this.$emit('onInputTyping', this.inputName, this.inputData);
    }
  },

  methods: {
    /**
     * Phương thức kiểm tra tổng thể các trường
     * Author: NQMinh (01/09/2021)
     */
    validateInput() {
      if (this.isRequired) {
        this.validateRequired();
      }
    },

    /**
     * Phương thức kiểm tra các trường bắt buộc
     * Author: NQMinh (01/09/2021)
     */
    validateRequired() {
      if (this.inputData === '' || this.inputData === null) {
        this.isValid = false;
        this.$refs.modalInput.setAttribute('title', `${this.labelName} không được để trống.`);
      } else {
        this.isValid = true;
        this.$refs.modalInput.setAttribute('title', '');
      }
    },

    removeError() {
      if (this.isRequired) this.isValid = true;
    }
  }
}
</script>

<style lang="scss">
.misa-asterisk {
  color: var(--color-red);
}

.misa-input {
  position: relative;
  font-family: 'NotoSans-Semibold', sans-serif !important;

  &__label {
    height: 20px;
  }

  input {
    height: 32px;
    width: 100%;
    padding: 6px 10px;
    border-radius: 2px;
    border: 1px solid var(--color-hightlight);
    display: inline-block;
    font-family: 'NotoSans-Regular', sans-serif !important;

    &:hover {
      outline: 1px solid var(--color-hightlight-hover);
    }

    &:focus {
      border-color: var(--color-primary);
    }

    &::placeholder {
      font-size: 12px;
      font-style: italic;
    }
  }

  &-icon {
    padding: 6px 28px 6px 10px !important;
  }

  &--error {
    border-color: var(--color-red) !important;
  }

  &__icon {
    width: 16px;
    height: 16px;
    background-image: url('../../assets/icon/misa-search.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>