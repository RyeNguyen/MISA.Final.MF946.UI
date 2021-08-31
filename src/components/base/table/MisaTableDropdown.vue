<template>
  <DxSelectBox
      class="misa-table__dropdown"
      item-template="comboboxItem"
      :items="comboboxItems"
  >
    <template #comboboxItem="{ data: comboboxItems }">
      <div class="misa-table__dropdown-item">{{ comboboxItems['itemName'] }}</div>
    </template>
  </DxSelectBox>
</template>

<script>
import { DxSelectBox } from 'devextreme-vue/select-box';

export default {
  name: "MisaTableDropdown",

  data() {
    return {
      comboboxItems: [
        {
          'itemId': 1,
          'itemName': 'Nhân bản'
        },
        {
          'itemId': 2,
          'itemName': 'Xóa'
        },
        {
          'itemId': 3,
          'itemName': 'Ngừng sử dụng'
        }
      ]
    }
  },

  components: {
    DxSelectBox
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