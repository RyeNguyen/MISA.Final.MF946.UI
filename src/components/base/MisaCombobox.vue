<template>
  <div
      :style="{width: inputWidth}"
      class="misa-input"
  >
    <div :class="{'misa-input__label': labelName !== null}">
      <label>
        {{ labelName }}
      </label>
    </div>
    <DxSelectBox
        :search-enabled="true"
        :data-source="comboboxOptions"
        :search-timeout="300"
        search-mode="contains"
        :placeholder="comboboxPlaceholder"
        :spellcheck="true"
        :value="defaultValue"
        item-template="comboboxItem"
        :display-expr="`${comboboxType}Name`"
        :value-expr="`${comboboxType}Id`"
        @value-changed="onValueChanged"
    >
      <template #comboboxItem="{ data: comboboxData }">
        <div class="misa-combobox__item">
          <div class="misa-combobox__item-code">
            {{ comboboxData['DepartmentCode'] }}
          </div>
          <div class="misa-combobox__item-name">
            {{ comboboxData['DepartmentName'] }}
          </div>
        </div>
      </template>
    </DxSelectBox>
  </div>
</template>

<script>
import DepartmentAPI from "@/api/components/DepartmentAPI";

import { DxSelectBox } from 'devextreme-vue/select-box';
import { locale } from 'devextreme/localization';

export default {
  name: "MisaCombobox",

  created () {
    locale("vi-VN");

    DepartmentAPI.getAll().then(res => {
      this.comboboxOptions = res.data;
    }).catch(error => {
      console.log(error)
    })
  },

  data() {
    return {
      comboboxOptions: [],

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
    }
  },

  components: {
    DxSelectBox
  },

  methods: {
    /**
     * Truyền lên component cha có sự thay đổi giá trị combobox
     * @param e
     * Author: NQMinh (31/08/2021)
     */
    onValueChanged(e) {
      this.$emit('onComboboxChanged', this.comboboxName, e.value);
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
    height: 34px !important;
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
</style>