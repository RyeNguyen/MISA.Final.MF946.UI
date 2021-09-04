<template>
  <div
      :style="{width: inputWidth}"
      class="misa-input"
  >
    <div :class="{'misa-input__label': labelName !== null}">
      <label>
        {{ labelName }} <span v-if="isRequired" class="misa-asterisk">*</span>
      </label>
    </div>

    <MisaMultiSelect
        v-model="comboboxItem"
        ref="modalInput"
        class="misa-combobox"
        :allowEmpty="false"
        :class="isInvalid ? 'misa-combobox--error' : ''"
        :close-on-select="true"
        :track-by="itemId"
        :label="itemName"
        :multiple="false"
        :options="comboboxGroup"
        :searchable="true"
        :show-labels="false"
        :title="isInvalid ? 'Đơn vị không được để trống' : ''"
        :placeholder="comboboxPlaceholder"
        @select="onComboboxChanged"
        @search-change="onComboboxTyping"
    >
      <div
          slot="beforeList"
          class="misa-combobox__header"
      >
        <div class="misa-combobox__header--left">Mã đơn vị</div>
        <div class="misa-combobox__header--right">Tên đơn vị</div>
      </div>

      <div
          class="misa-combobox__no-content"
          slot="noResult">
        Dữ liệu không có trong danh sách
      </div>

      <template slot="singleLabel" slot-scope="props">
        <div>{{ props.option[itemName] }}</div>
      </template>

      <template slot="option" slot-scope="props">
        <div class="misa-combobox__option">
          <span class="misa-combobox__option--left">{{ props.option[itemCode] }}</span>
          <span class="misa-combobox__option--right">{{ props.option[itemName] }}</span>
        </div>
      </template>

    </MisaMultiSelect>
  </div>
</template>

<script>
export default {
  name: "MisaCombobox",

  created() {
    this.comboboxItem = this.defaultValue;
    if (this.comboboxType === 'Department') {
      this.comboboxGroup = this.$departmentData;
    }
  },

  data() {
    return {
      comboboxItem: this.defaultValue,

      comboboxGroup: null,

      isInvalid: false
    }
  },

  props: {
    inputWidth: {
      type: String
    },

    labelName: {
      type: String
    },

    comboboxType: {
      type: String,
      required: true
    },

    comboboxName: {
      type: String,
      required: true
    },

    comboboxPlaceholder: {
      type: String
    },

    comboboxValue: {
      type: String,
      default: null
    },

    isRequired: {
      type: Boolean,
      default: false
    },

    isSubmitting: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    itemId: function() {
      return `${this.comboboxType}Id`;
    },

    itemCode: function() {
      return `${this.comboboxType}Code`;
    },

    itemName: function() {
      return `${this.comboboxType}Name`;
    },

    defaultValue: function() {
      if (this.comboboxValue !== null) {
        for (let i = 0; i < this.$departmentData.length; i++) {
          if (this.$departmentData[i]['DepartmentId'] === this.comboboxValue) {
            return this.$departmentData[i];
          }
        }
      }
      return null;
    }
  },

  watch: {
    isSubmitting: function () {
      if (this.isSubmitting === true) {
        this.onComboboxTyping('');
      }
    }
  },

  emits: ['onComboboxChanged'],

  methods: {
    /**
     * Phương thức xử lý sự kiện khi lựa chọn combobox thay đổi
     * @param selectedOption
     * Author: NQMinh (03/09/2021)
     */
    onComboboxChanged(selectedOption) {
      this.isInvalid = false;
      this.$emit('onComboboxChanged', this.comboboxName, selectedOption[this.itemId]);
    },

    /**
     * Phương thức kiểm tra trường bắt buộc khi combobox được nhập
     * @param searchQuery
     * Author: NQMinh (03/09/2021)
     */
    onComboboxTyping(searchQuery) {
      if (this.isRequired) {
        if ((searchQuery === '' || searchQuery === null) &&
            (this.comboboxItem === '' || this.comboboxItem === null)) {
          this.isInvalid = true;
          this.$refs.modalInput.$refs.search.setAttribute('title', `${this.labelName}` + this.$responseData.MsgErrorRequired);
        } else {
          this.isInvalid = false;
          this.$refs.modalInput.$refs.search.setAttribute('title', '');
        }
      }
    },

    /**
     * Phương thức trả về tên hiển thị cho các lựa chọn combobox
     * @param DepartmentName
     * @returns {string}
     * Author: NQMinh (03/09/2021)
     */
    displayName({ DepartmentName }) {
      return `${DepartmentName}`;
    },

    /**
     * Phương thức kiểm tra tổng thể các trường
     * Author: NQMinh (01/09/2021)
     */
    validateInput() {
      this.onComboboxTyping();
      this.$emit('onValidated');
    }
  }
}
</script>

<style lang="scss">
.misa-combobox {
  width: 100%;
  height: 32px;
  border-radius: 2px;
  border: 1px solid var(--color-hightlight);
  font-family: "NotoSans-Regular", sans-serif;
  position: relative;

  &--error {
    border: 1px solid var(--color-red) !important;
  }

  &__no-content {
    height: 32px;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  &:hover {
    outline: 1px solid var(--color-hightlight-hover);
  }

  input {
    border: none;
    height: 30px;
    position: absolute;
    left: 0;
    top: 0;

    &:hover {
      outline: none;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 0 10px;
    font-family: "NotoSans-Semibold", sans-serif;
    background-color: var(--color-background);

    &--left {
      width: 30%;
    }

    &--right {
      width: 70%;
    }
  }

  &__option {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;

    &--left {
      width: 30%;
    }

    &--right {
      width: 70%;
    }
  }
}

.multiselect__content-wrapper {
  background-color: var(--color-white);
  z-index: 25;
  width: 100%;
  position: absolute;
  top: 33px;
  border-radius: 2px;
  border: 1px solid var(--color-hightlight)
}

.multiselect--active {
  border: 1px solid var(--color-primary);
}

.multiselect__content {
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.multiselect__select {
  height: 30px;
  width: 32px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 30;
  background-image: url('../../assets/icon/misa-arrow-dark-bottom.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  transition: var(--transition-value);

  &:hover {
    background-color: #E0E0E0;
  }
}

.multiselect__element {
  height: 32px;
  padding: 0 10px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-border);
    color: var(--color-primary);
  }
}

.multiselect__tags {
  height: 100%;
  padding: 7.5px 10px;
  font-size: 13px;
}

.multiselect__option {
  &--hightlight {
    background-color: var(--color-border);
    color: var(--color-primary);
  }

  &--selected {
    font-family: "NotoSans-Semibold", sans-serif;
  }
}
</style>