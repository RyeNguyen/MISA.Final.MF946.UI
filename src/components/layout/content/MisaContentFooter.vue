<template>
  <div class="misa-content__footer">
    <div class="misa-content__footer--left">
      <span class="misa-content__footer-text">
        Tổng số:
        <b>{{ totalRecords }}</b>
        bản ghi
      </span>
    </div>
    <div class="misa-content__footer--right">
      <div class="misa-content__pagination-container">
        <MisaDropdown
            :dataSource="pagingData"
            :defaultValue="pageSize"
            dataType="Paging"
            @onValueChanged="changePageSize"
        />
        <div class="misa-content__pagination">
          <button
              :disabled="isInFirstPage"
              class="misa-content__pagination-button paging-previous"
              @click="onClickPreviousPage"
          >
            Trước
          </button>

          <button
              :class="{ 'misa-content__pagination-button--active': currentPage === 1 }"
              :disabled="isInFirstPage"
              class="misa-content__pagination-button paging-number"
              @click="onClickFirstPage"
          >
            1
          </button>

          <span v-show="expandLeft" class="misa-content__pagination-expand">...</span>

          <button
              v-for="(page, index) in footerPageNumbers"
              :key="index"
              :class="{ 'misa-content__pagination-button--active': currentPage === page }"
              class="misa-content__pagination-button paging-number"
              @click="onClickPage(page)"
          >
            {{ page }}
          </button>

          <span v-show="expandRight" class="misa-content__pagination-expand">...</span>

          <button
              v-show="totalPages >= 2"
              :class="{ 'misa-content__pagination-button--active': currentPage === totalPages }"
              :disabled="isInLastPage"
              class="misa-content__pagination-button paging-number"
              @click="onClickLastPage"
          >
            {{ totalPages }}
          </button>

          <button
              :disabled="isInLastPage"
              class="misa-content__pagination-button paging-next"
              @click="onClickNextPage"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PagingModel from "@/models/PagingModel";

export default {
  name: "MisaContentFooter",

  created() {
    if (localStorage.getItem('pageSize') !== null) {
      this.firstLoad = true;
      this.pageSize = parseInt(localStorage.getItem('pageSize'));
      this.$emit('onPageChanged', this.currentPage, this.pageSize);
      this.calculateFooterPages();
      setTimeout(() => {
        this.firstLoad = false;
      }, 1000)
    } else {
      this.$emit('onPageChanged', this.currentPage, this.pageSize);
      this.calculateFooterPages();
    }
  },

  data() {
    return {
      currentPage: 1,

      pageSize: 20,

      maxVisibleButtons: 5,

      expandLeft: false,

      expandRight: false,

      footerPageNumbers: [],

      pagingData: PagingModel.initData(),

      firstLoad: false
    }
  },

  props: {
    totalPages: {
      type: Number,
      required: true
    },

    totalRecords: {
      type: Number,
      required: true
    }
  },

  watch: {
    pageSize: function() {
      localStorage.setItem('pageSize', this.pageSize);
    },

    totalPages: function () {
      this.currentPage = 1;
      this.calculateFooterPages();
    }
  },

  computed: {
    /**
     * Phương thức chuyển trang hiện tại về trang đầu
     * Author: NQMinh (31/08/2021)
     */
    isInFirstPage: function () {
      return this.currentPage === 1;
    },

    /**
     * Phương thức chuyển trang hiện tại về trang cuối
     * Author: NQMinh (31/08/2021)
     */
    isInLastPage: function () {
      return this.currentPage === this.totalPages;
    }
  },

  emits: ['onPageChanged', 'onPageSizeChanged'],

  methods: {
    /**
     * Phương thức tính số lượng các trang ở giữa trang đầu và trang cuối
     * Author: NQMinh (31/08/2021)
     */
    calculateFooterPages() {
      //Tổng số trang lớn hơn số nút hiển thị thì tạo mảng nằm giữa
      if (this.totalPages > this.maxVisibleButtons) {
        this.calculateFooterMiddlePages();
      }

      //Tổng số trang nhỏ hơn hoặc bằng số nút hiển thị thì tạo mảng 1 -> cuối
      else {
        //Tổng trang >= 3 => tạo list giữa
        if (this.totalPages >= 3) {
          this.footerPageNumbers = Array.from({length: this.totalPages - 2}, (_, i) => i + 2);
        } else {
          this.footerPageNumbers = [];
        }
      }
      //Hiển thị 3 chấm
      this.displayExpandDots();
    },

    /**
     * Phương thức tính toán số lượng trang cần hiển thị ngoại trừ đầu và cuối
     * Author: NQMinh (31/08/2021)
     */
    calculateFooterMiddlePages() {
      if (this.currentPage === 1) {
        this.footerPageNumbers = [2, 3];
      } else if (this.currentPage === this.totalPages) {
        this.footerPageNumbers = [
          this.totalPages - 2,
          this.totalPages - 1,
        ];
      } else {
        this.getMiddleNumbers();
      }
    },

    /**
     * Phương thức tính toán số lượng trang nằm giữa trong trường hợp tổng số trang lớn hơn số nút hiển thị
     * Author: NQMinh (31/08/2021)
     */
    getMiddleNumbers() {
      if (this.currentPage === 2) {
        this.footerPageNumbers = [2, 3];
      } else if (this.currentPage === this.totalPages - 1) {
        this.footerPageNumbers = [
          this.totalPages - 2,
          this.totalPages - 1,
        ];
      } else {
        this.footerPageNumbers = [
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
        ];
      }
    },

    /**
     * Phương thức hiển thị dấu 3 chấm
     * Author: NQMinh (31/08/2021)
     */
    displayExpandDots() {
      this.footerPageNumbers[0] - 1 > 1 ? this.expandLeft = true : this.expandLeft = false;
      this.footerPageNumbers[this.footerPageNumbers.length - 1] + 1 < this.totalPages ? (this.expandRight = true) : (this.expandRight = false);
    },

    /**
     * Phương thức xử lý sự kiện khi click các nút số phân trang
     * Author: NQMinh (31/08/2021)
     */
    onClickPage(pageIndex) {
      this.currentPage = pageIndex;
      this.calculateFooterPages();
      this.$emit("onPageChanged", pageIndex, this.pageSize);
    },

    /**
     * Phương thức xử lý sự kiện khi click trang đầu tiên
     * Author: NQMinh (31/08/2021)
     */
    onClickFirstPage() {
      if (this.currentPage !== 1) {
        this.currentPage = 1;
        this.calculateFooterPages();
        this.$emit("onPageChanged", 1, this.pageSize);
      }
    },

    /**
     * Phương thức xử lý sự kiện khi click nút trở về trước
     * Author: NQMinh (31/08/2021)
     */
    onClickPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.calculateFooterPages();
        this.$emit("onPageChanged", this.currentPage, this.pageSize);
      }
    },

    /**
     * Phương thức xử lý sự kiện khi click nút tiếp theo
     * Author: NQMinh (31/08/2021)
     */
    onClickNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.calculateFooterPages();
        this.$emit("onPageChanged", this.currentPage, this.pageSize);
      }
    },

    /**
     * Phương thức xử lý sự kiện khi click trang cuối cùng
     * Author: NQMinh (31/08/2021)
     */
    onClickLastPage() {
      if (this.currentPage !== this.totalPages) {
        this.currentPage = this.totalPages;
        this.calculateFooterPages();
        this.$emit("onPageChanged", this.currentPage, this.pageSize);
      }
    },

    /**
     * Phương thức xử lý sự kiện khi số bản ghi/trang thay đổi
     * Author: NQMinh (31/08/2021)
     */
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.$emit('onPageChanged', 1, pageSize);
    }
  }
}
</script>

<style lang="scss">
.misa-content__footer {
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.misa-content__pagination {
  &-container {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &-button {
    cursor: pointer;
    font-family: 'NotoSans-Regular', sans-serif;
    color: var(--color-content-text);
    font-size: 13px;

    &:disabled {
      color: #9E9E9E;
    }

    &.paging {
      &-previous,
      &-next,
      &-number {
        outline: none;
        border: none;
        background-color: transparent;
      }
    }

    &.paging-previous {
      margin-right: 13px;
    }

    &.paging-next {
      margin-left: 13px;
    }

    &.paging-number {
      height: 20px;
      padding: 0 6.5px;
    }

    &--active {
      border: 1px solid #E0E0E0 !important;
      font-weight: bold;
    }
  }
}



.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}
</style>