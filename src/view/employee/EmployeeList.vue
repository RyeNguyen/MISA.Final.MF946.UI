<template>
  <div class="misa-content">
    <MisaContentHeader></MisaContentHeader>
    <div class="misa-content__main">
      <MisaContentSearch></MisaContentSearch>
      <MisaTable
          :dataSource="formatedEmployees"
          :tableColumns="columns"
          @onEditMode="showPopup"
      />
      <MisaContentFooter></MisaContentFooter>

      <MisaPopup
          :isPopupVisible="isPopupVisible"
          @hidePopup="hidePopup"
      >
        <EmployeeDetail
            slot="popup-content"
            :employeeData="employeeData"
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
      employeeData: EmployeeModel.initData()
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
        this.employees = res.data;
        this.formatedEmployees = this.employees.slice();
        for(let i = 0; i < this.formatedEmployees.length; i++) {
          this.identifyGender(this.formatedEmployees[i]);
          // this.formatDate(this.formatedEmployees[i]);
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
     * Author: NQMinh (28/08/2021)
     */
    formatDate(employee) {
      employee['DateOfBirth'] = DateFormatter.format(employee['DateOfBirth'], false);
      employee['IdentityDate'] = DateFormatter.format(employee['IdentityDate'], false);
      employee['CreatedDate'] = DateFormatter.format(employee['CreatedDate'], false);
      employee['ModifiedDate'] = DateFormatter.format(employee['ModifiedDate'], false);
    },

    /**
     * Phương thức thay đổi trạng thái popup thành mở
     * Author: NQMinh (29/08/2021)
     */
    showPopup(employeeIndex) {
      this.employeeData = this.employees[employeeIndex];
      this.isPopupVisible = true;
    },

    /**
     * Phương thức thay đổi trạng thái popup thành đóng
     * Author: NQMinh (29/08/2021)
     */
    hidePopup() {
      this.employeeData = EmployeeModel.initData();
      this.isPopupVisible = false;
    }
  }
}
</script>

<style scoped>

</style>