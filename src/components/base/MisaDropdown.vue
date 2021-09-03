<template>
<DxSelectBox
    height="32px"
    :data-source="dataSource"
    :value-expr="optionValue"
    :display-expr="optionDisplayName"
    :value="defaultValue"
    item-template="dropdownItem"
    @value-changed="onValueChanged"
>
  <template #dropdownItem="{data: dataSource}">
    <div class="misa-dropdown__item">
      {{ dataSource[`PagingName`] }}
    </div>
  </template>
</DxSelectBox>
</template>

<script>
import { DxSelectBox } from 'devextreme-vue/select-box';

export default {
  name: "MisaDropdown",

  data() {
    return {

    }
  },
  
  props: {
    dataType: {
      type: String
    },

    dataSource: {
      type: Array
    },

    defaultValue: {

    }
  },

  components: {
    DxSelectBox
  },

  computed: {
    /**
     * Phương thức trả về ID của item
     * @returns {`${String}Id`}
     * Author: NQMinh (01/09/2021)
     */
    optionValue: function() {
      return `${this.dataType}Id`;
    },

    /**
     * Phương thức trả về tên của item
     * @returns {`${String}Name`}
     * Author: NQMinh (01/09/2021)
     */
    optionDisplayName: function() {
      return `${this.dataType}Name`;
    }
  },

  emits: ['onValueChanged'],

  methods: {
    /**
     * Phương thức xử lý sự kiện khi lựa chọn thay đổi
     * @param e
     * Author: NQMinh (01/09/2021)
     */
    onValueChanged(e) {
      this.$emit('onValueChanged', e.value);
    }
  }
}
</script>

<style lang="scss">
.dx-texteditor {
  font-family: "NotoSans-Regular", sans-serif !important;
  font-size: 13px !important;
  color: var(--color-content-text);

  &.dx-editor-outlined {
    border: 1px solid var(--color-hightlight);
    border-radius: 2px;
  }

  &.dx-state-focused.dx-editor-outlined {
    border: 1px solid var(--color-primary);
  }

  &.dx-state-active.dx-editor-outlined {
    border: 1px solid var(--color-primary);
  }
}

.dx-item.dx-list-item.dx-state-hover {
  background-color: var(--color-primary) !important;
  color: var(--color-white) !important;
}

.dx-overlay-content {
  & .dx-item-content.dx-list-item-content {
    font-family: "NotoSans-Regular", sans-serif;
    font-size: 13px;
  }
}

.dx-list:not(.dx-list-select-decorator-enabled) .dx-list-item {
  &.dx-list-item-selected {
    & .misa-dropdown__item {
      background-color: var(--color-primary);
      color: var(--color-white);
    }


    &.dx-state-hover:not(.dx-state-focus) {
      & .misa-dropdown__item {
        background-color: var(--color-primary) !important;
        color: var(--color-white) !important;
      }
    }
  }

  &.dx-state-focused.dx-list-item-selected {
    & .misa-dropdown__item {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
  }
}

.misa-dropdown__item {
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 14px 0 10px !important;
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