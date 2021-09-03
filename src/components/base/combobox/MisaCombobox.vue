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
    <DxSelectBox
        ref="modalCombobox"
        :search-enabled="true"
        :data-source="comboboxGroup"

        :search-timeout="0"
        search-mode="contains"
        height="32px"
        :placeholder="comboboxPlaceholder"
        :value="defaultValue"
        :openOnFieldClick="false"
        noDataText="Dữ liệu không có trong danh mục"
        item-template="comboboxItem"
        :display-expr="`${comboboxType}Name`"
        :value-expr="`${comboboxType}Id`"
        @value-changed="onValueChanged"
        @onFocusOut="validateInput"
        @input="removeError"
    >
      <template #group="{}">
        <MisaComboboxGroup/>
      </template>
      <template #comboboxItem="{ data: comboboxGroup }">
        <div class="misa-combobox__item">
          <div class="misa-combobox__item-code">
            {{ comboboxGroup['DepartmentCode'] }}
          </div>
          <div class="misa-combobox__item-name">
            {{ comboboxGroup['DepartmentName'] }}
          </div>
        </div>
      </template>
    </DxSelectBox>
  </div>
</template>

<script>
import { DxSelectBox } from 'devextreme-vue/select-box';
//import DataSource from 'devextreme/data/data_source';
import MisaComboboxGroup from "@/components/base/combobox/MisaComboboxGroup";

export default {
  name: "MisaCombobox",

  created () {
    console.log(this.$refs.modalCombobox)

    if (this.comboboxType === 'Department') {
      // this.comboboxOptions = [{
      //   'Group': 'Đơn vị',
      //   'Items': this.$departmentData
      // }];
      this.comboboxGroup = this.$departmentData;

      // this.comboboxGroup = new DataSource({
      //   store: this.comboboxOptions,
      //   map: function(option) {
      //     option.key = option.Group;
      //     option.items = option.Items;
      //     return option;
      //   }
      // })
    }
  },

  data() {
    return {
      comboboxOptions: [],

      comboboxGroup: null,

      defaultValue: this.comboboxValue,

      locale: null
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
    }
  },

  components: {
    DxSelectBox,
    MisaComboboxGroup
  },

  methods: {
    /**
     * Truyền lên component cha có sự thay đổi giá trị combobox
     * @param e
     * Author: NQMinh (31/08/2021)
     */
    onValueChanged(e) {
      this.$emit('onComboboxChanged', this.comboboxName, e.value);
    },

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
.misa-input {
  .dx-texteditor.dx-editor-outlined {
    border: none !important;
    border-radius: 2px !important;
  }

  .dx-texteditor-buttons-container {
    position: absolute !important;
    right: 2px !important;
    height: 32px !important;
    width: 32px !important;
  }

  .dx-dropdowneditor-icon {
    border-radius: 0;
  }
}

.dx-dropdowneditor-button.dx-state-active .dx-dropdowneditor-icon, .dx-dropdowneditor.dx-dropdowneditor-active .dx-dropdowneditor-icon {
  background-color: transparent !important;
}

.dx-dropdowneditor.dx-dropdowneditor-field-clickable, .dx-dropdowneditor.dx-dropdowneditor-field-clickable .dx-texteditor-input {
  cursor: auto;
}

.misa-combobox__item {
  font-family: 'NotoSans-Regular', sans-serif !important;
  display: flex;

  &-code {
    width: 30%;
  }

  &-name {
    width: 70%;
  }
}

.dx-list:not(.dx-list-select-decorator-enabled) .dx-list-item {
  &.dx-list-item-selected {
    background-color: var(--color-white);
    color: var(--color-content-text);
  }

  &.dx-state-hover {
    background-color: var(--color-border) !important;
    color: var(--color-primary) !important;

    &:not(.dx-state-focused) {
      background-color: var(--color-border);
      color: var(--color-primary);
    }
  }

  &.dx-state-focused {
    background-color: var(--color-border);
    color: var(--color-primary);

    &.dx-list-item-selected {
      background-color: var(--color-border);
      color: var(--color-primary);
    }
  }
}

.dx-selectbox .dx-texteditor-input {
  &::placeholder {
    font-size: 12px;
    font-family: "NotoSans-Regular", sans-serif;
    color: #A9A9A9 !important;
  }
}

.dx-item.dx-list-item.dx-state-active {
  background-color: var(--color-border) !important;
  color: var(--color-primary) !important;
}

.dx-dropdownlist-popup-wrapper.dx-popup-wrapper .dx-overlay-content {
  top: 5px !important;
  border-radius: 2px !important;
  border: 1px solid var(--color-hightlight) !important;
  box-shadow: var(--box-shadow-default) !important;

  & .dx-popup-content {
    height: 158px;
  }
}

.dx-list-group-header {
  height: 32px;
  padding: 0 10px;
  background-color: var(--color-background);
  border-bottom: none;
  font-family: 'NotoSans-Semibold', sans-serif;
  color: var(--color-content-text);
}

.dx-list-group-body {
  padding: 2px 1px;
}

.dx-dropdownlist-popup-wrapper .dx-empty-message, .dx-dropdownlist-popup-wrapper .dx-list-item {
  height: 32px;
}
</style>