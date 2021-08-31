<template>
  <div class="misa-content__footer">
    <div class="misa-content__footer--left">
      <span class="misa-content__footer-text">
        Tổng số:
        <b>{{ customData.totalRecords }}</b>
        bản ghi
      </span>
    </div>
    <div class="misa-content__footer--right">
<!--      <Dropdown :customData="pagingDropdown" :model="clonePageSize" @valueChanged="changePageSize"/>-->
      <div class="misa-content__footer-paginator">
        <div
            class="misa-content__footer-paginator-item paging-previous"
            :class="{
            'misa-content__footer-paginator-item--disabled': currentPageNum === 1,
          }"
            @click="clickPreviousPage"
        >
          Trước
        </div>
        <div
            class="misa-content__footer-paginator-item paging-number"
            :class="{ 'misa-content__footer-paginator-item--selected': currentPageNum === 1 }"
            @click="clickFirstPage"
        >
          <span>1</span>
        </div>
        <div class="misa-content__footer-paginator-expand" v-show="expandLeft">...</div>
        <div
            class="misa-content__footer-paginator-item paging-number"
            v-for="(item, index) in pageNumbers"
            :key="index"
            :class="{ 'paging-num-selected': currentPageNum === item }"
            @click="clickPageNum(item)"
        >
          <span>{{ item }}</span>
        </div>
        <div class="misa-content__footer-paginator-expand" v-show="expandRight">...</div>
        <div
            v-show="customData.totalPages >= 2"
            class="misa-content__footer-paginator-item paging-number"
            :class="{
            'paging-num-selected':
              currentPageNum === customData.totalPages,
          }"
            @click="clickLastPage"
        >
          <span>{{ customData.totalPages }}</span>
        </div>
        <div
            class="paging__direction-item paging-next"
            :class="{
            'paging-text-disable':
              currentPageNum === customData.totalPages,
          }"
            @click="clickNextPage"
        >
          Sau
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MisaContentFooter",

  created() {
    this.clonePageSize = this.customData.pageSize;
    this.currentPageNum = this.customData.currentPageNum;
  },

  data() {
    return {
      currentPageNum: 1,
      currentHoverPageNum: null,
      expandLeft: false,
      expandRight: false,
      arrPageNumDisplay: [],
      clonePageSize: 0,
      timeOut: null,
      pagingDropdown: {
        inputFieldName: "departmentId",
        labelText: "Đơn vị",
        defaultValue: "",
        displayValues: [
          "10 bản ghi trên 1 trang",
          "20 bản ghi trên 1 trang",
          "30 bản ghi trên 1 trang",
          "50 bản ghi trên 1 trang",
          "100 bản ghi trên 1 trang",
        ],
        keys: [10, 20, 30, 50, 100],
        width: "calc(var(--column-width) * 2)",
        height: "32px",
      }
    }
  },

  props: {
    customData: {
      type: Object,
      required: true,
    },
  },

  methods: {
    /**
     * Hàm khi hover và pageNum
     * NVTOAN 06/07/2021
     */
    hoverPageNum(pageIndex) {
      this.currentHoverPageNum = pageIndex;
    },
    /**
     * Hàm khi hover và pageNum
     * NVTOAN 06/07/2021
     */
    unhoverPageNum() {
      this.currentHoverPageNum = null;
    },
    /**
     * Hàm lấy ra mảng phần tử hiển thị ở giữa của page-num
     * NVTOAN 09/07/2021
     */
    getArrPageNumDisplay() {
      //Nếu tổng số trang > số trang hiển thị thì tạo mảng ở giữa
      if (this.customData.totalPages > this.customData.maxPageNumDisplay) {
        //Tạo mảng hiển thị page-num trong trường hợp tổng số trang > 5
        this.getArrPageNumDisplayMultiple();
      }
      //Không thì tạo mảng từ 1-max
      else {
        //Nếu tổng page >= 3 thì mới cần list ở giữa
        if(this.customData.totalPages >= 3) {
          //Tạo mảng ở giữa
          this.arrPageNumDisplay = Array.from(
              { length: this.customData.totalPages - 2 },
              (_, i) => i + 2
          );
        }
        else {
          this.arrPageNumDisplay = [];
        }
      }
      //Hiển thị dấu '...' tương ứng
      this.displayExtant();
    },
    /**
     * Hàm tạo mảng hiển thị page-num trong trường hợp tổng số trang > 5
     * NVTOAN 09/07/2021
     */
    getArrPageNumDisplayMultiple() {
      //Nếu hiện tại đang chọn page 1
      if (this.currentPageNum === 1) {
        this.arrPageNumDisplay = [2, 3];
      }
      //Nếu hiện tại đang chọn page cuối
      else if (this.currentPageNum === this.customData.totalPage) {
        this.arrPageNumDisplay = [
          this.customData.totalPages - 2,
          this.customData.totalPages - 1,
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
      if (this.currentPageNum === 2) {
        this.arrPageNumDisplay = [2, 3];
      }
      //Nếu đang là trang gần cuối thì chỉ hiển thị 3 trang cuối
      else if (this.currentPageNum === this.customData.totalPage - 1) {
        this.arrPageNumDisplay = [
          this.customData.totalPages - 2,
          this.customData.totalPages - 1,
        ];
      }
      //Nếu đang là trang ở giữa
      else {
        this.arrPageNumDisplay = [
          this.currentPageNum - 1,
          this.currentPageNum,
          this.currentPageNum + 1,
        ];
      }
    },
    /**
     * Hàm hiển thị dấu còn nữa '...'
     * NVTOAN 09/07/2021
     */
    displayExtant() {
      //Dấu còn nữa bên trái
      this.arrPageNumDisplay[0] - 1 > 1
          ? (this.extantLeft = true)
          : (this.extantLeft = false);
      //Dấu còn nữa bên phải
      this.arrPageNumDisplay[this.arrPageNumDisplay.length - 1] + 1 <
      this.customData.totalPages
          ? (this.extantRight = true)
          : (this.extantRight = false);
    },
    /**
     * Hàm khi click page num
     * NVTOAN 06/07/2021
     */
    clickPageNum(pageIndex) {
      this.currentPageNum = pageIndex;
      this.getArrPageNumDisplay();
      this.$emit("clickPageNum", pageIndex);
    },
    /**
     * Hàm xử lý khi ấn first page
     * NVTOAN 06/07/2021
     */
    clickFirstPage() {
      if (this.currentPageNum !== 1) {
        this.currentPageNum = 1;
        this.getArrPageNumDisplay();
        this.$emit("clickPageNum", 1);
      }
    },
    /**
     * Hàm xử lý khi ấn previous page
     * NVTOAN 06/07/2021
     */
    clickPreviousPage() {
      if (this.currentPageNum > 1) {
        this.currentPageNum--;
        this.getArrPageNumDisplay();
        this.$emit("clickPageNum", this.currentPageNum);
      }
    },
    /**
     * Hàm xử lý khi ấn next page
     * NVTOAN 06/07/2021
     */
    clickNextPage() {
      if (this.currentPageNum < this.customData.totalPages) {
        this.currentPageNum++;
        this.getArrPageNumDisplay();
        this.$emit("clickPageNum", this.currentPageNum);
      }
    },
    /**
     * Hàm xử lý khi ấn last page
     * NVTOAN 06/07/2021
     */
    clickLastPage() {
      if (this.currentPageNum !== this.customData.totalPages) {
        this.currentPageNum = this.customData.totalPages;
        this.getArrPageNumDisplay();
        this.$emit("clickPageNum", this.currentPageNum);
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
  background-color: tomato;
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>