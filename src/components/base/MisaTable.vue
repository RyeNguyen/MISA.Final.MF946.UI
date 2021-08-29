<template>
  <div>
    <DxDataGrid
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        :data-source="dataSource"
        :show-borders="false"
        :show-column-lines="true"
        :show-row-lines="true"
        class="misa-table"
        column-resizing-mode="widget"
        key-expr="EmployeeId"
    >
      <DxSorting mode="none"/>
      <DxColumnFixing :enabled="true"/>
      <DxPaging :page-size="100"/>
      <DxPager
          :visible="true"
      />
      <DxSelection
          mode="multiple"
          show-check-boxes-mode="always"
      />
      <DxColumn
          v-for="column in tableColumns"
          :key="column['ColId']"
          :caption="column['ColName']"
          :data-field="column['ColField']"
          :fixed="column['ColFixed']"
          :width="column['ColWidth']"
          :alignment="column['ColAlignment']"
      />
      <DxColumn
          caption="Chức năng"
          :fixed="true"
          fixedPosition="right"
          width="120"
          alignment="center"
          data-field="EmployeeId"
          cell-template="functionCell"
      ></DxColumn>
      <template #functionCell="{data}">
        <button @click="editData(data)">Sửa</button>
      </template>
      <DxScrolling mode="virtual"/>
    </DxDataGrid>
  </div>
</template>

<script>
import {
  DxColumn,
  DxColumnFixing,
  DxDataGrid,
  DxPager,
  DxPaging,
  DxScrolling,
  DxSelection,
  DxSorting
} from 'devextreme-vue/data-grid';

export default {
  name: "MisaTable",

  data () {
    return {
      isPopupVisible: false
    }
  },

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
    DxSorting,
  },

  emits: ['onEditMode'],

  methods: {
    /**
     * Phương thức truyền data lên cha khi người dùng click nút sửa
     * @param data
     * Author: NQMinh (29/08/2021)
     */
    editData(data) {
      this.$emit('onEditMode', data.data);
    }
  }
}
</script>

<style lang="scss">
.misa-table {
  font-family: "NotoSans-Regular", sans-serif !important;
  height: calc(100vh - 187px);

  .dx-datagrid-table {
    border: none;
  }

  .dx-datagrid-headers {
    border-bottom: none;

    .dx-header-row {
      background-color: var(--color-table);

      td {
        height: 34px !important;
        border-left: none;
        border-right: 1px solid var(--color-table-border) !important;
        border-bottom: 1px solid var(--color-table-border) !important;
        padding: 2px 10px 0 !important;
        text-transform: uppercase;
        font-family: "NotoSans-Bold", sans-serif;
        color: var(--color-content-text);
        font-size: 12px;

        &:last-child {
          border-right: none !important;
          border-left: none !important;
        }

        .dx-datagrid-text-content {
          margin-top: 9px;
        }
      }
    }
  }

  .dx-datagrid-borders .dx-datagrid-rowsview, .dx-datagrid-headers + .dx-datagrid-rowsview {
    border-top: none;
  }

  .dx-datagrid-content {
    table {
      background: transparent;
    }
  }

  .dx-datagrid .dx-column-lines > td {
    border-left: none;
    border-right: 1px dotted var(--color-table-border);

    &:last-child {
      border-right: none;
      border-left: 1px dotted var(--color-table-border);
    }
  }

  .dx-datagrid .dx-row > td {
    padding: 15px 10px 5px;
    height: 47px;
  }

  .dx-datagrid .dx-row-lines > td {
    border-bottom: 1px solid var(--color-table-border);
  }

  .dx-pointer-events-none {
    border-left: none !important;
    border-right: none !important;
  }
}
</style>