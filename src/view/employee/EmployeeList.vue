<template>
  <div class="misa-content">
    <MisaContentHeader></MisaContentHeader>
    <div class="misa-content__main">
      <MisaContentSearch></MisaContentSearch>
      <MisaTable
          :dataSource="employees"
          :tableColumns="columns"
      />
      <MisaContentFooter></MisaContentFooter>
    </div>
  </div>
</template>

<script>
import EmployeeColsModel from "@/models/EmployeeColsModel";

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
      employees: [],
      columns: EmployeeColsModel.initData()
    };
  },

  components: {
    MisaContentHeader,
    MisaContentSearch,
    MisaContentFooter
  },

  methods: {
    loadData() {
      EmployeesAPI.getAll().then(res => {
        console.table(res.data);
        this.employees = res.data;
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>

<style scoped>

</style>