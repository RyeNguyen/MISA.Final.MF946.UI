<template>
  <div>
    <DxDataGrid
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        :data-source="dataSource"
        :show-borders="false"
        :show-column-lines="true"
        :show-row-lines="true"
        :hover-state-enabled="true"
        class="misa-table"
        column-resizing-mode="widget"
        key-expr="EmployeeId"
    >
      <DxSorting mode="none"/>
      <DxColumnFixing :enabled="true"/>
      <DxPaging :page-size="20"/>
      <DxPager
          :visible="false"
      />
      <DxColumn
          caption=""
          :fixed="true"
          width="40"
          alignment="center"
          cell-template="checkboxCell"
      ></DxColumn>
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
          cell-template="functionCell"
      ></DxColumn>
      <template #functionCell="{data}">
        <div class="misa-table__functional-cell">
          <div
              class="misa-table__functional-cell--text"
              @click="editData(data)"
          >Sửa</div>
          <MisaTableDropdown id="table-dropdown"/>
        </div>
      </template>
      <template #checkboxCell>
        <MisaCheckbox/>
      </template>
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
  DxSorting
} from 'devextreme-vue/data-grid';

import MisaTableDropdown from "@/components/base/table/MisaTableDropdown";

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
    DxColumnFixing,
    DxPager,
    DxPaging,
    DxSorting,
    MisaTableDropdown
  },

  emits: ['onEditMode'],

  methods: {
    /**
     * Phương thức truyền data lên cha khi người dùng click nút sửa
     * @param data
     * Author: NQMinh (29/08/2021)
     */
    editData(data) {
      this.$emit('onEditMode', data.rowIndex);
    }
  }
}
</script>

<style lang="scss">
.misa-table {
  font-family: "NotoSans-Regular", sans-serif !important;
  font-size: 13px !important;
  height: calc(100vh - 240px);

  .dx-datagrid-table {
    border: none;
  }

  .dx-datagrid-headers {
    border-bottom: none;

    .dx-datagrid-content {
      margin-bottom: 0;
    }

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

  .dx-datagrid-rowsview .dx-row {
    border-top: none;
    border-bottom: none;

    &.dx-data-row.dx-row-lines.dx-column-lines.dx-state-hover {
      background-color: var(--color-table-hover) !important;
    }
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
    border-bottom: 0.5px solid var(--color-table-border);
  }

  .dx-pointer-events-none {
    border-left: none !important;
    border-right: none !important;
  }

  &__functional-cell {
    width: auto;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;

    &--text {
      color: var(--color-secondary);
      font-family: "NotoSans-Semibold", sans-serif !important;
      cursor: pointer;
    }
  }
}
</style>