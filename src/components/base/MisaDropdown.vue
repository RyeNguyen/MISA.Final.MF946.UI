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

  &:hover {

  }
}
</style>