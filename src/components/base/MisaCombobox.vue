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
        item-template="comboboxItem"
        :display-expr="`${comboboxType}Name`"
        :value-expr="`${comboboxType}Id`"
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
//import DataSource from "devextreme/data/data_source";

export default {
  name: "MisaCombobox",

  data() {
    return {
      comboboxOptions: []
    }
  },

  created () {
    DepartmentAPI.getAll().then(res => {
      // this.comboboxOptions = new DataSource({
      //   store: res.data,
      //   key: `${this.comboboxType}Code`,
      //   group: `${this.comboboxType}Name`
      // });
      this.comboboxOptions = res.data;
    }).catch(error => {
      console.log(error)
    })
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
    }
  },

  components: {
    DxSelectBox
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