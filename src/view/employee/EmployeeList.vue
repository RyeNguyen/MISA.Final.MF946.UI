<template>
  <div class="misa-content">
    <MisaContentHeader
      @onInsertMode="showPopupToInsert"
    />

    <div class="misa-content__main">
      <MisaContentSearch/>

      <MisaTable
          :dataSource="formatedEmployees"
          :tableColumns="columns"
          @onEditMode="showPopupToEdit"
      />

      <MisaContentFooter
        :totalRecords="totalRecords"
        :totalPages="totalPages"
      />

      <MisaPopup
          :isPopupVisible="isPopupVisible"
          @hidePopup="hidePopup"
      >
        <EmployeeDetail
            slot="popup-content"
            :isPopupVisible="isPopupVisible"
            :employeeData="employeeData"
            :wantToCreateNewEmployee="wantToCreateNewEmployee"
            @dataChanged="reloadData"
        />
      </MisaPopup>
    </div>
  </div>
</template>

<script>
import MisaPopup from "@/components/base/MisaPopup";

import EmployeeColsModel from "@/models/EmployeeColsModel";
import EmployeeModel from "@/models/EmployeeModel";
import DateFormatter from "@/utils/DateFormatter";

import EmployeeDetail from "@/view/employee/EmployeeDetail";
import MisaContentHeader from '@/components/layout/content/MisaContentHeader';
import MisaContentSearch from "@/components/layout/content/MisaContentSearchSection";
import MisaContentFooter from "@/components/layout/content/MisaContentFooter";
import EmployeesAPI from "@/api/components/EmployeesAPI";

export default {
  name: "EmployeeList",

  created() {
    this.loadData();
  },

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
      totalPages: 0
    };
  },

  components: {
    EmployeeDetail,
    MisaContentHeader,
    MisaContentSearch,
    MisaContentFooter,
    MisaPopup
  },

  methods: {
    /**
     * Phương thức call API lấy dữ liệu nhân viên từ server
     * Author: NQMinh (28/08/2021)
     */
    loadData() {
      EmployeesAPI.getAll().then(res => {
        // this.totalRecords = res.data['totalRecord'];
        // this.totalPages = res.data['totalPage'];

        //Dữ liệu dùng để render lên modal
        this.employees = res.data;

        //Dữ liệu dùng để render lên table
        this.formatedEmployees = JSON.parse(JSON.stringify(res.data));

        for(let i = 0; i < this.formatedEmployees.length; i++) {
          this.identifyGender(this.formatedEmployees[i]);
          this.formatDate(this.formatedEmployees[i], false);
        }
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
      this.wantToCreateNewEmployee = false;
      this.employeeData = this.employees[employeeIndex];
      //this.formatDate(this.employeeData, true);
      this.isPopupVisible = true;
    },

    /**
     * Phương thức thay đổi trạng thái popup thành đóng
     * Author: NQMinh (29/08/2021)
     */
    hidePopup() {
      this.employeeData = EmployeeModel.initData();
      this.isPopupVisible = false;
    },

    /**
     * Phương thức xử lý các sự kiện sau khi thêm mới thông tin nhân viên thành công
     * Author: NQMinh (31/08/2021)
     */
    reloadData() {
      this.hidePopup();
      this.loadData();
    }
  }
}
</script>

<style scoped>

</style>