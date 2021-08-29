<template>
  <div class="misa-content">
    <MisaContentHeader></MisaContentHeader>
    <div class="misa-content__main">
      <MisaContentSearch></MisaContentSearch>
      <MisaTable
          :dataSource="employees"
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

      //Định nghĩa các cột để render table
      columns: EmployeeColsModel.initData(),

      //Biến kiểm tra trạng thái đóng mở popup
      isPopupVisible: false,

      //Biến chứa dữ liệu cá nhân nhân viên cần sửa
      employeeData: null
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
        for(let i = 0; i < this.employees.length; i++) {
          this.identifyGender(this.employees[i]);
          this.formatDate(this.employees[i]);
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
    showPopup(employeeData) {
      this.employeeData = employeeData;
      this.isPopupVisible = true;
    },

    /**
     * Phương thức thay đổi trạng thái popup thành đóng
     * Author: NQMinh (29/08/2021)
     */
    hidePopup() {
      this.isPopupVisible = false;
    }
  }
}
</script>

<style scoped>

</style>