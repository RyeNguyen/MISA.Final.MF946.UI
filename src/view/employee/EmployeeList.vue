<template>
  <div class="misa-content">
    <MisaContentHeader
        @onInsertMode="showPopupToInsert"
    />

    <div class="misa-content__main">
      <MisaContentSearch
          @onSearched="searchEmployee"
          @onReload="loadData"
      />

      <MisaLoader
          v-if="isLoading"
      />

      <MisaTable
          :dataSource="formatedEmployees"
          :pageSize="pageSize"
          :tableColumns="columns"
          @onDeleteMode="showPopupToDelete"
          @onEditMode="showPopupToEdit"
          @onCloneMode="showPopupToClone"
      />

      <MisaContentFooter
          :totalPages="totalPages"
          :totalRecords="totalRecords"
          @onPageChanged="changePageData"
      />

      <MisaPopup
          :isPopupVisible="isPopupVisible"
          :popupContent="popupContent"
      >
        <EmployeeDetail
            slot="popup-content-modal"
            :employeeData="employeeData"
            :isPopupVisible="isPopupVisible"
            :wantToCreateNewEmployee="wantToCreateNewEmployee"
            @dataChanged="reloadData"
            @onHidingModal="hidePopup"
        />
        <MisaMessage
            slot="popup-content-message"
            popupMessageName="warning"
            :employeesToDelete="employeesToDelete"
            @onMessageCancel="hidePopup"
            @onMessageSubmit="reloadData"
        />
      </MisaPopup>
    </div>
  </div>
</template>

<script>
import EmployeeColsModel from "@/models/EmployeeColsModel";
import EmployeeModel from "@/models/EmployeeModel";
import DateFormatter from "@/utils/DateFormatter";

import EmployeeDetail from "@/view/employee/EmployeeDetail";
import MisaContentHeader from '@/components/layout/content/MisaContentHeader';
import MisaContentSearch from "@/components/layout/content/MisaContentSearchSection";
import MisaContentFooter from "@/components/layout/content/MisaContentFooter";
import MisaLoader from "@/components/base/MisaLoader";
import EmployeesAPI from "@/api/components/EmployeesAPI";

export default {
  name: "EmployeeList",

  data() {
    return {
      //Danh sách nhân viên trả về từ server
      employees: [],

      //Danh sách nhân viên đã được định dạng giới tính và ngày tháng để render trên table
      formatedEmployees: [],

      //Định nghĩa các cột để render table
      columns: EmployeeColsModel.initData(),

      //Biến kiểm tra trạng thái đóng mở popup
      isPopupVisible: false,

      //Biến chứa dữ liệu cá nhân nhân viên cần sửa
      employeeData: EmployeeModel.initData(),

      //Biến kiểm tra người dùng muốn sửa hay thêm thông tin nhân viên
      wantToCreateNewEmployee: false,

      //Từ khóa tìm kiếm nv của người dùng
      searchKeyword: "",

      //Trang hiện tại
      currentPage: 1,

      //Số bản ghi/trang
      pageSize: 30,

      //Tổng số bản ghi
      totalRecords: 0,

      //Tổng số trang
      totalPages: 0,

      //Nội dung popup cần hiển thị
      popupContent: 'content-modal',

      //Mảng chứa danh sách các nhân viên cần xóa
      employeesToDelete: [],

      //Biến lưu trạng thái của loader, hiện ra khi dữ liệu chưa được load xong
      isLoading: true
    };
  },

  components: {
    EmployeeDetail,
    MisaContentHeader,
    MisaContentSearch,
    MisaContentFooter,
    MisaLoader
  },

  methods: {
    /**
     * Phương thức call API lấy dữ liệu nhân viên từ server
     * Author: NQMinh (28/08/2021)
     */
    loadData() {
      this.isLoading = true;
      EmployeesAPI.paging(this.searchKeyword, this.currentPage, this.pageSize).then(res => {
        this.totalRecords = res.data['totalRecords'];
        this.totalPages = res.data['totalPages'];

        //Dữ liệu dùng để render lên modal
        this.employees = res.data['data'];

        //Dữ liệu dùng để render lên table
        this.formatedEmployees = JSON.parse(JSON.stringify(res.data['data']));

        for (let i = 0; i < this.formatedEmployees.length; i++) {
          this.identifyGender(this.formatedEmployees[i]);
          this.formatDate(this.formatedEmployees[i], false);
        }

        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }).catch(error => {
        console.log(error)
      })
    },

    /**
     * Phương thức định dạng lại dữ liệu giới tính nhân viên trước khi render table
     * @param employee
     * Author: NQMinh (28/08/2021)
     */
    identifyGender(employee) {
      if (employee['Gender'] !== null) {
        for (let i = 0; i < this.$genderData.length; i++) {
          if (this.$genderData[i][`GenderId`] === employee['Gender']) {
            employee['Gender'] = this.$genderData[i][`GenderName`];
            break;
          }
        }
      }
    },

    /**
     * Phương thức định dạng lại dữ liệu ngày tháng trước khi render table
     * @param employee
     * @param onModal
     * Author: NQMinh (28/08/2021)
     */
    formatDate(employee, onModal) {
      employee['DateOfBirth'] = DateFormatter.format(employee['DateOfBirth'], onModal);
      employee['IdentityDate'] = DateFormatter.format(employee['IdentityDate'], onModal);
      employee['CreatedDate'] = DateFormatter.format(employee['CreatedDate'], onModal);
      employee['ModifiedDate'] = DateFormatter.format(employee['ModifiedDate'], onModal);
    },

    /**
     * Phương thức thay đổi trạng thái popup thành mở khi thêm thông tin nhân viên
     * Author: NQMinh (30/08/2021)
     */
    showPopupToInsert(newCode) {
      this.popupContent = 'content-modal';
      this.wantToCreateNewEmployee = true;
      this.employeeData = EmployeeModel.initData();
      this.employeeData['EmployeeCode'] = newCode;
      this.isPopupVisible = true;
    },

    /**
     * Phương thức thay đổi trạng thái popup thành mở khi sửa thông tin nhân viên
     * Author: NQMinh (29/08/2021)
     * Modified: NQMinh (30/08/2021)
     */
    showPopupToEdit(employeeIndex) {
      this.popupContent = 'content-modal';
      this.wantToCreateNewEmployee = false;
      this.employeeData = this.employees[employeeIndex];
      this.isPopupVisible = true;
    },

    /**
     * Phương thức thay đổi trạng thái popup thành mở khi nhân bản thông tin nhân viên
     * Author: NQMinh (02/09/2021)
     */
    showPopupToClone(employeeData) {
      this.popupContent = 'content-modal';
      this.wantToCreateNewEmployee = true;

      //Vì hiện tại employeeData đang là dữ liệu đã được render cho table nên sẽ không tương thích để áp lên modal
      //Cần tìm trong dữ liệu gốc nhân viên giống với employeeData
      for (let i = 0; i < this.employees.length; i++) {
        if (this.employees[i]['EmployeeId'] === employeeData['EmployeeId']) {
          this.employeeData = this.employees[i];
          break;
        }
      }

      //Sinh mã mới
      EmployeesAPI.getNewCode().then(res => {
        this.employeeData['EmployeeCode'] = res.data;
        this.isPopupVisible = true;
      }).catch(error => {
        console.log(error);
        this.employeeData['EmployeeCode'] = null;
        this.isPopupVisible = true;
      })
    },

    /**
     * Phương thức thay đổi trạng thái popup thành mở khi muốn xóa nhân viên
     * Author: NQMinh (01/09/2021)
     */
    showPopupToDelete(employeeData) {
      this.popupContent = 'content-message';
      this.isPopupVisible = true;
      this.employeesToDelete.push(employeeData);
    },

    /**
     * Phương thức thay đổi trạng thái popup thành đóng
     * Author: NQMinh (29/08/2021)
     */
    hidePopup() {
      this.isPopupVisible = false;
      this.employeeData = EmployeeModel.initData();
      this.employeesToDelete = [];
    },

    /**
     * Phương thức xử lý các sự kiện sau khi thêm mới thông tin nhân viên thành công
     * Author: NQMinh (31/08/2021)
     */
    reloadData() {
      this.hidePopup();
      this.loadData();
    },

    /**
     * Phương thức xử lý sự kiện khi có hành động phân trang
     * @param pageIndex
     * @param pageSize
     * Author: NQMinh (31/08/2021)
     */
    changePageData(pageIndex, pageSize) {
      this.currentPage = pageIndex;
      this.pageSize = pageSize;
      this.loadData();
    },

    /**
     * Phương thức xử lý sự kiện khi có hành động thay đổi số bản ghi/trang
     * @param pageSize
     * Author: NQMinh (01/09/2021)
     */
    // changePageSize(pageSize) {
    //   this.pageSize = pageSize;
    //   this.loadData();
    // },

    /**
     * Phương thức tìm kiếm thông tin nhân viên
     * @param keyword
     * Author: NQMinh (31/08/2021)
     */
    searchEmployee(keyword) {
      this.searchKeyword = keyword;
      this.loadData();
    }
  }
}
</script>

<style scoped>

</style>