<template>
  <EmployeeList></EmployeeList>
</template>

<script>
import EmployeeList from "@/view/employee/EmployeeList";

export default {
  name: "TheContent",

  components: {
    EmployeeList
  }
}
</script>

<style lang="scss">
.misa-content {
  padding: 24px 30px 0 20px;
  position: relative;

  &__main {
    background-color: var(--color-white);
    padding: 16px 30px 0 20px;
  }
}
</style>