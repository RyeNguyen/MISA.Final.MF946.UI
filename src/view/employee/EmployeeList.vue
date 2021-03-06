<template>
  <div class="misa-content">
    <MisaContentHeader
        @onInsertMode="showPopupToInsert"
    />

    <div class="misa-content__main">
      <MisaContentSearch
          @onSearched="searchEmployee"
          @onReload="loadData"
          @onExport="exportData"
      />

      <MisaLoader
          v-if="isLoading"
      />

      <MisaTable
          v-if="formatedEmployees.length > 0"
          :dataSource="formatedEmployees"
          :pageSize="pageSize"
          :tableColumns="columns"
          @onDeleteMode="showPopupToDelete"
          @onEditMode="showPopupToEdit"
          @onCloneMode="showPopupToClone"
      />

      <div v-if="formatedEmployees.length === 0" class="misa-table__placeholder">
        <img class="misa-table__placeholder-img" src="../../assets/icon/misa-no-data.svg" alt="no-data">
        <div class="misa-table__placeholder-text">Không có dữ liệu</div>
      </div>

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
            @dataChangedAndClose="reloadData"
            @dataChangedAndAdd="reloadAndInsert"
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

      <MisaToast
          :showToast="showToast"
          :toastMessage="toastMessage"
          :toastType="toastType"
          @onToastHidden="showToast = false"
      />
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
      isLoading: true,

      showToast: false,

      toastMessage: "",

      toastType: "default"
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
          this.formatDate(this.formatedEmployees[i]);
        }

        setTimeout(() => {
          this.isLoading = false;
          const toastMessage = this.$responseData.MsgSuccessLoad;
          this.handleSuccess(toastMessage, 'info');
        }, 1000);
      }).catch(error => {
        this.handleError(error);
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
     * Author: NQMinh (28/08/2021)
     */
    formatDate(employee) {
      employee['DateOfBirth'] = DateFormatter.format(employee['DateOfBirth']);
      employee['IdentityDate'] = DateFormatter.format(employee['IdentityDate']);
      employee['CreatedDate'] = DateFormatter.format(employee['CreatedDate']);
      employee['ModifiedDate'] = DateFormatter.format(employee['ModifiedDate']);
    },

    /**
     * Phương thức xử lý sự kiện khi người dùng nhấn Cất & Thêm
     * Author: NQMinh (02/09/2021)
     */
    reloadAndInsert() {
      this.reloadData();
      this.showPopupToInsert();
    },

    /**
     * Phương thức lấy dữ liệu nhân viên bằng ID
     * @param employeeId
     * Author: NQMinh (02/09/2021)
     */
    async getEmployeeById(employeeId) {
      const employeeData = await EmployeesAPI.getById(employeeId);
      return employeeData['data'];
    },

    /**
     * Phương thức thay đổi trạng thái popup thành mở khi thêm thông tin nhân viên
     * Author: NQMinh (30/08/2021)
     */
    showPopupToInsert() {
      this.popupContent = 'content-modal';
      this.wantToCreateNewEmployee = true;
      this.employeeData = EmployeeModel.initData();

      //Sinh mã mới
      EmployeesAPI.getNewCode().then(res => {
        this.employeeData['EmployeeCode'] = res.data;
        this.isPopupVisible = true;
        const toastMessage = this.$responseData.MsgSuccessNewCode;
        this.handleSuccess(toastMessage, 'info');
      }).catch(error => {
        this.handleError(error);
        this.employeeData['EmployeeCode'] = '';
        this.isPopupVisible = true;
      })
    },

    /**
     * Phương thức thay đổi trạng thái popup thành mở khi sửa thông tin nhân viên
     * Author: NQMinh (29/08/2021)
     * Modified: NQMinh (30/08/2021)
     */
    showPopupToEdit(employeeIndex) {
      this.popupContent = 'content-modal';
      this.wantToCreateNewEmployee = false;

      EmployeesAPI.getById(this.employees[employeeIndex]['EmployeeId']).then(res => {
        if (res.data === '') {
          this.employeesToDelete = [];
          this.popupContent = 'content-message';
          this.isPopupVisible = true;
        } else {
          this.employeeData = res.data;
          this.isPopupVisible = true;
          this.toastMessage = this.$responseData.MsgSuccessGetEmployee;
          this.handleSuccess(this.toastMessage, 'info');
        }
      })
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
        const toastMessage = this.$responseData.MsgSuccessNewCode;
        this.handleSuccess(toastMessage, 'info');
      }).catch(error => {
        this.employeeData['EmployeeCode'] = null;
        this.isPopupVisible = true;
        this.handleError(error);
      })
    },

    /**
     * Phương thức thay đổi trạng thái popup thành mở khi muốn xóa nhân viên
     * Author: NQMinh (01/09/2021)
     */
    showPopupToDelete(employeeData) {
      //Kiểm tra nhân viên có còn tồn tại không
      EmployeesAPI.getById(employeeData['EmployeeId']).then(res => {
        if (res.data === '') {
          this.employeesToDelete = [];
          this.popupContent = 'content-message';
          this.isPopupVisible = true;
        } else {
          this.employeesToDelete.push(employeeData);
          this.popupContent = 'content-message';
          this.isPopupVisible = true;
        }
      })
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
     * Phương thức xử lý phản hồi thành công
     * @param toastMessage
     * @param toastType
     * Author: NQMinh (03/09/2021)
     */
    handleSuccess(toastMessage, toastType) {
      this.toastType = toastType;
      this.toastMessage = toastMessage;
      this.showToast = true;
    },

    /**
     * Phương thức xử lý các phản hồi lỗi
     * @param response
     * Author: NQMinh (03/09/2021)
     */
    handleError(response) {
      const statusCode = response.response.status;
      if (statusCode >= 500) {
        this.toastMessage = this.$responseData.MsgErrorServer;
        this.toastType = 'error';
      } else if (statusCode >= 400 && statusCode < 500) {
        this.toastMessage = response.response.data['userMsg'];
        this.toastType = 'error';
      }
      this.showToast = true;
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
     * Phương thức tìm kiếm thông tin nhân viên
     * @param keyword
     * Author: NQMinh (31/08/2021)
     */
    searchEmployee(keyword) {
      this.searchKeyword = keyword;
      this.loadData();
    },

    /**
     * Phương thức call API xuất khẩu dữ liệu
     * Author: NQMinh (03/09/2021)
     */
    exportData() {
      EmployeesAPI.export(this.searchKeyword, this.currentPage, this.pageSize).then(res => {
        if (res) {
          const blob = new Blob([res.data], {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "Danh sách nhân viên";
          link.click();
          URL.revokeObjectURL(link.href);
        }
        const toastMessage = this.$responseData.MsgSuccessExport;
        this.handleSuccess(toastMessage, 'success');
      }).catch(error => {
        this.handleError(error);
      })
    }
  }
}
</script>

<style lang="scss">
.misa-table__placeholder {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 13px;

  &-img {
    width: 132px;
    height: 74px;
    margin: 50px 50px 30px;
  }
}
</style>