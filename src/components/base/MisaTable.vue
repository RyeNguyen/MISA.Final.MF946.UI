<template>
  <DxDataGrid
      class="misa-table"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :show-column-lines="true"
      :show-row-lines="true"
      :show-borders="false"
      :data-source="dataSource"
      key-expr="EmployeeId"
  >
    <DxSorting mode="none"/>
    <DxColumnFixing :enabled="true"/>
    <DxPaging :page-size="30"/>
    <DxPager
        :visible="true"
    />
    <DxSelection
        show-check-boxes-mode="always"
        mode="multiple"
    />
    <DxColumn
      v-for="column in tableColumns"
      :key="column['ColId']"
      :width="column['ColWidth']"
      :fixed="column['ColFixed']"
      :data-field="column['ColField']"
      :caption="column['ColName']"
    />
    <DxScrolling column-rendering-mode="virtual"/>
  </DxDataGrid>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxColumnFixing,
  DxPager,
  DxPaging,
    DxSelection,
    DxSorting
} from 'devextreme-vue/data-grid';

export default {
  name: "MisaTable",

  props: {
    dataSource: {
      type: Array
    },

    tableColumns: {
      type: Array,
      required: true
    }
  },

  components: {
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxColumnFixing,
    DxPager,
    DxPaging,
    DxSelection,
    DxSorting
  }
}
</script>

<style lang="scss">
.misa-table {
  font-family: "NotoSans-Regular", sans-serif !important;
  height: calc(100vh - 187px);

  .dx-datagrid-headers {
    .dx-header-row {
      height: 34px !important;
      background-color: var(--color-table);

      td {
        padding: 0 10px;
        text-transform: uppercase;
        font-family: "NotoSans-Bold", sans-serif;
        color: var(--color-content-text);
        font-size: 12px;

        .dx-datagrid-text-content {
          margin-top: 9px;
        }
      }
    }

    .dx-command-select {
      width: 40px !important;
      max-width: 40px !important;
    }
  }

  .dx-datagrid-content {
    table {
      background: transparent;
    }

  }
}
</style>