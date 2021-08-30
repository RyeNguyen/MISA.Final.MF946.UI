<template>
  <div
      v-click-outside="hideDropdownOptions"
      class="misa-dropdown"
  >
    <button
        class="dropdown__button"
        @click="showDropdownOptions"
    >
      <span class="misa-dropdown__icon"></span>
    </button>

    <MisaDropdownOptions
        :dropdownItems="dropdownItems"
        :contentHidden="contentHidden"
        @dropdown-item-active="assignDropdown"
    />
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import MisaDropdownOptions from '@/components/base/dropdown/MisaDropdownOptions';

export default {
  name: "MisaDropdown",

  data() {
    return {
      contentHidden: true,
      value: ''
    }
  },

  props: {
    dropdownItems: {
      type: Array
    }
  },

  components: {
    MisaDropdownOptions
  },

  directives: {
    ClickOutside
  },

  emits: ['dropdown-chosen'],

  methods: {
    //Hàm xổ dropdown content khi click (click lần 2 để đóng)
    //Author: NQMinh(29/07/2021)
    showDropdownOptions() {
      this.contentHidden = !this.contentHidden;
      this.iconRotate = !this.iconRotate;
    },

    //Hàm ẩn dropdown content khi click ra ngoài
    //Author: NQMinh(09/08/2021)
    hideDropdownOptions() {
      this.contentHidden = true;
      this.iconRotate = false;
    },

    //Hàm chuyển title của button dropdown
    //@params dropdown item
    //Author: NQMinh(29/07/2021)
    //Modified: NQMinh (08/08/2021)
    assignDropdown(item) {
      //nếu có chọn item thì chuyển title thành tên item
      if (item) {
        this.value = item[`${this.type}Id`];
      } else {
        this.value = '';
      }
      this.$emit('dropdown-chosen', this.value);
      //ẩn dropdown content vaf xoay mũi tên
      this.hideDropdownOptions();
    }
  }
}
</script>

<style lang="scss">
.misa-dropdown {
  position: relative;
  background-color: var(--color-white);
  border-radius: 4px;

  &__icon {
    width: 26px;
    height: 16px;
    background-image: url('../../../assets/icon/misa-arrow-blue-down.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  & .dropdown__button {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-black);
    background-color: transparent;
    padding: 0 12px 0 16px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid var(--color-hightlight);
    cursor: pointer;
  }
}
</style>