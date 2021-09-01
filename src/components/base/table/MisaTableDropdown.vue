<template>
  <DxSelectBox
      class="misa-table__dropdown"
      item-template="comboboxItem"
      :items="comboboxItems"
      @value-changed="onValueChanged"
  >
    <template #comboboxItem="{ data: comboboxItems }">
      <div class="misa-table__dropdown-item">{{ comboboxItems['itemName'] }}</div>
    </template>
  </DxSelectBox>
</template>

<script>
import { DxSelectBox } from 'devextreme-vue/select-box';
import TableFunctionModel from '@/models/TableFunctionModel';

export default {
  name: "MisaTableDropdown",

  data() {
    return {
      comboboxItems: TableFunctionModel.initData()
    }
  },

  components: {
    DxSelectBox
  },

  props: {
    rowData: {
      type: Object,
      required: true
    }
  },

  emits: ['onRowTweaked'],

  methods: {
    /**
     * Phương thức xử lý sự kiện khi người dùng muốn nhân bản hoặc xóa bản ghi
     * @param e
     * Author: NQMinh (01/09/2021)
     */
    onValueChanged(e) {
      this.$emit('onRowTweaked', e.value['itemId'], this.rowData['data']);
    }
  }
}
</script>

<style lang="scss">
.misa-table {
  .dx-texteditor-input-container {
    display: none;
  }

  .dx-texteditor-buttons-container {
    width: 26px;
    height: 16px;
    background-image: url('../../../assets/icon/misa-arrow-blue-down.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .dx-dropdowneditor-button .dx-button-content {
    display: none;
  }

  .dx-texteditor.dx-editor-outlined {
    background: transparent;
    border: 1px solid transparent;
    border-radius: 0;

    &:focus,
    &:active,
    &:visited {
      border: 1px solid var(--color-secondary);
    }
  }

  .dx-dropdowneditor-button {
    width: 26px;
    min-width: 26px;
  }
}

.dx-dropdownlist-popup-wrapper.dx-popup-wrapper .dx-overlay-content {
  width: auto !important;
}

.misa-table__dropdown-item {
  width: 120px !important;
}
</style>