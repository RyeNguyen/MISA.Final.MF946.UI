<template>
  <div class="misa-content__search">
    <MisaInput
        ref="inputSearch"
        :isSearchable="true"
        inputId="input-search"
        inputName="SearchAndFilter"
        inputPlaceholder="Tìm theo mã, tên nhân viên"
        @onInputTyping="changeKeyword"
    />
    <div class="misa-content__reload"
      @click="reloadTable"
    />
    <div class="misa-content__export"
      @click="exportData"
    />
  </div>
</template>

<script>
export default {
  name: "MisaContentSearchSection",

  created() {
    this.$nextTick(() => {
      this.$refs.inputSearch.$el.children[1].focus();
    })
  },

  data() {
    return {
      searchKeyword: "",
      timeoutValue: null
    }
  },

  watch: {
    /**
     * Phương thức theo dõi sự thay đổi của từ khóa tìm kiếm để thông báo lên component cha
     * Author: NQMinh (31/08/2021)
     */
    searchKeyword: function () {
      clearTimeout(this.timeoutValue);
      this.timeoutValue = setTimeout(() => {
        this.$emit('onSearched', this.searchKeyword);
      }, 300);
    }
  },

  emits: ['onSearched', 'onReload', 'onExport'],

  methods: {
    /**
     * Phương thức thay đổi giá trị tìm kiếm khi nhập trong ô tìm kiếm
     * @param inputName
     * @param inputValue
     * Author: NQMinh (31/08/2021)
     */
    changeKeyword: function (inputName, inputValue) {
      this.searchKeyword = inputValue;
    },

    /**
     * Phương thức xử lý sự kiện khi nhấn nút reload
     * Author: NQMinh (01/09/2021)
     */
    reloadTable() {
      this.$emit('onReload');
    },

    exportData() {
      this.$emit('onExport');
    }
  }
}
</script>

<style lang="scss">
.misa-content {
  &__search {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  &__reload,
  &__export {
    width: 24px;
    height: 24px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin-left: 16px;
    cursor: pointer;
    transition: var(--transition-value);
  }

  &__reload {
    background-image: url('../../../assets/icon/misa-reload.svg');

    &:hover {
      background-image: url('../../../assets/icon/misa-reload-hover.svg');
    }
  }

  &__export {
    background-image: url('../../../assets/icon/misa-export.svg');

    &:hover {
      background-image: url('../../../assets/icon/misa-export-hover.svg');
    }
  }
}
</style>