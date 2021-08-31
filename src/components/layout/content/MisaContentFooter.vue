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
      <div class="misa-content__pagination">
        <button
            class="misa-content__pagination-button paging-previous"
            :disabled="isInFirstPage"
            @click="onClickPreviousPage"
        >
          Trước
        </button>

        <button
            class="misa-content__pagination-button paging-number"
            :class="{ 'misa-content__pagination-button--active': currentPage === 1 }"
            :disabled="isInFirstPage"
            @click="onClickFirstPage"
        >
          1
        </button>

        <span class="misa-content__pagination-expand" v-show="expandLeft">...</span>

        <button
            v-for="(page, index) in arrPageNumDisplay"
            :key="index"
            class="misa-content__pagination-button paging-number"
            :class="{ 'misa-content__pagination-button--active': currentPage === page }"
            @click="onClickPage(page)"
        >
          {{ page }}
        </button>

        <span class="misa-content__pagination-expand" v-show="expandRight">...</span>

        <button
            v-show="totalPages >= 2"
            class="misa-content__pagination-button paging-number"
            :class="{ 'misa-content__pagination-button--active': currentPage === totalPages }"
            :disabled="isInLastPage"
            @click="onClickLastPage"
        >
          {{ totalPages }}
        </button>

        <button
            class="misa-content__pagination-button paging-next"
            :disabled="isInLastPage"
            @click="onClickNextPage"
        >
          Sau
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MisaContentFooter",

  data() {
    return {
      currentPage: 1,
      pageSize: 0,
      totalPages: 10,
      totalRecords: 500,
      maxVisibleButtons: 4,
      expandLeft: false,
      expandRight: false,
      arrPageNumDisplay: []
    }
  },

  props: {
    // totalPages: {
    //   type: Number,
    //   required: true
    // },
    //
    // totalRecords: {
    //   type: Number,
    //   required: true
    // }
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
    },

    /**
     * Phương thức tính trang đầu tiên trên tổng số trang
     * Author: NQMinh (31/08/2021)
     */
    startPage: function () {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        if (this.maxVisibleButtons <= this.totalPages) {
          return this.totalPages - this.maxVisibleButtons + 1;
        } else {
          return this.totalPages + 1;
        }
      }

      return this.currentPage - 1;
    },

    /**
     * Phương thức tính trang cuối cùng trên tổng số trang
     * Author: NQMinh (31/08/2021)
     */
    endPage: function () {
      return Math.min(
          this.startPage + this.maxVisibleButtons - 1,
          this.totalPages
      )
    },

    /**
     * Phương thức tính các trang để hiển thị lên button footer
     * Author: NQMinh (31/08/2021)
     */
    footerPages: function () {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        })
      }
      return range;
    },

    pageInformation: function() {
      if (this.currentPage < this.totalPages) {
        return `${(this.currentPage - 1) * this.pageSize + 1}-${this
            .currentPage * this.pageSize}`;
      }
      return `${this.totalRecords}`;
    }
  },

  methods: {
    /**
     * Hàm lấy ra mảng phần tử hiển thị ở giữa của page-num
     * NVTOAN 09/07/2021
     */
    getArrPageNumDisplay() {
      //Nếu tổng số trang > số trang hiển thị thì tạo mảng ở giữa
      if (this.totalPages > this.maxVisibleButtons) {
        //Tạo mảng hiển thị page-num trong trường hợp tổng số trang > 5
        this.getArrPageNumDisplayMultiple();
      }
      //Không thì tạo mảng từ 1-max
      else {
        //Nếu tổng page >= 3 thì mới cần list ở giữa
        if(this.totalPages >= 3) {
          //Tạo mảng ở giữa
          this.arrPageNumDisplay = Array.from(
              { length: this.totalPages - 2 },
              (_, i) => i + 2
          );
        }
        else {
          this.arrPageNumDisplay = [];
        }
      }
      //Hiển thị dấu '...' tương ứng
      this.displayExpand();
    },

    /**
     * Hàm tạo mảng hiển thị page-num trong trường hợp tổng số trang > 5
     * NVTOAN 09/07/2021
     */
    getArrPageNumDisplayMultiple() {
      //Nếu hiện tại đang chọn page 1
      if (this.currentPage === 1) {
        this.arrPageNumDisplay = [2, 3];
      }
      //Nếu hiện tại đang chọn page cuối
      else if (this.currentPage === this.totalPages) {
        this.arrPageNumDisplay = [
          this.totalPages - 2,
          this.totalPages - 1,
        ];
      }
      //Nếu đang chọn page ở giữa
      else {
        this.getArrPageNumMiddle();
      }
    },

    /**
     * Hàm lấy page num ở giữa
     * NVTOAN 09/07/2021
     */
    getArrPageNumMiddle() {
      //Nếu đang là trang 2 thì chỉ hiển thị 2,3
      if (this.currentPage === 2) {
        this.arrPageNumDisplay = [2, 3];
      }
      //Nếu đang là trang gần cuối thì chỉ hiển thị 3 trang cuối
      else if (this.currentPage === this.totalPages - 1) {
        this.arrPageNumDisplay = [
          this.totalPages - 2,
          this.totalPages - 1,
        ];
      }
      //Nếu đang là trang ở giữa
      else {
        this.arrPageNumDisplay = [
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
        ];
      }
    },

    /**
     * Hàm hiển thị dấu còn nữa '...'
     * NVTOAN 09/07/2021
     */
    displayExpand() {
      //Dấu còn nữa bên trái
      this.arrPageNumDisplay[0] - 1 > 1 ? this.expandLeft = true : this.expandLeft = false;
      //Dấu còn nữa bên phải
      this.arrPageNumDisplay[this.arrPageNumDisplay.length - 1] + 1 < this.totalPages ? (this.expandRight = true) : (this.expandRight = false);
    },

    /**
     * Hàm khi click page num
     * NVTOAN 06/07/2021
     */
    onClickPage(pageIndex) {
      this.currentPage = pageIndex;
      this.getArrPageNumDisplay();
      this.$emit("clickPageNum", pageIndex);
    },

    /**
     * Hàm xử lý khi ấn first page
     * NVTOAN 06/07/2021
     */
    onClickFirstPage() {
      if (this.currentPage !== 1) {
        this.currentPage = 1;
        this.getArrPageNumDisplay();
        this.$emit("clickPageNum", 1);
      }
    },

    /**
     * Hàm xử lý khi ấn previous page
     * NVTOAN 06/07/2021
     */
    onClickPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getArrPageNumDisplay();
        this.$emit("clickPageNum", this.currentPage);
      }
    },

    /**
     * Hàm xử lý khi ấn next page
     * NVTOAN 06/07/2021
     */
    onClickNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getArrPageNumDisplay();
        this.$emit("clickPageNum", this.currentPage);
      }
    },

    /**
     * Hàm xử lý khi ấn last page
     * NVTOAN 06/07/2021
     */
    onClickLastPage() {
      if (this.currentPage !== this.totalPages) {
        this.currentPage = this.totalPages;
        this.getArrPageNumDisplay();
        this.$emit("clickPageNum", this.currentPage);
      }
    },

    /**
     * Hàm thay đổi page size
     * NVTOAN 09/07/2021
     */
    changePageSize(pageSize) {
      this.$emit('changePageSize', pageSize);
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

.misa-content__pagination-button {
  cursor: pointer;
  font-family: 'NotoSans-Regular', sans-serif;
  color: var(--color-content-text);
  font-size: 13px;

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
</style>