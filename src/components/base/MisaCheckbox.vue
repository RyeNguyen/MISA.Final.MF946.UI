<template>
  <div
      class="misa-checkbox"
      :class="{'misa-checkbox--active': isActive}"
  >
    <input
        ref="checkboxInput"
        type="checkbox"
        @click="activateCheckbox"
    >
    <span class="misa-checkbox__mark"></span>
  </div>
</template>

<script>
export default {
  name: "MisaCheckbox",

  data() {
    return {
      isActive: false
    }
  },

  methods: {
    activateCheckbox() {
      this.$refs.checkboxInput.defaultChecked = !this.$refs.checkboxInput.defaultChecked;

      this.isActive = this.$refs.checkboxInput.defaultChecked;
    }
  }
}
</script>

<style lang="scss" scoped>
.misa-checkbox {
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 2px;
  overflow: hidden;
  border: 0.1px solid #AFAFAF;
  transform: rotate(-90deg);
  cursor: pointer;
  transition: var(--transition-value);

  &--active {
    transform: rotate(0);
    border: 0.1px solid var(--color-primary);
  }

  & input {
    position: absolute;
    opacity: 0;
    width: 17px;
    height: 17px;
    margin: 0;
    top: 0;
    left: 0;
    z-index: 3;
    cursor: pointer;

    &:checked ~ .misa-checkbox__mark {
      &:after {
        display: block;
      }
    }
  }

  &__mark {
    position: absolute;
    top: 0;
    left: 0;
    height: 17px;
    width: 17px;

    &:after {
      content: "";
      position: absolute;
      display: none;
      left: 5px;
      top: 1px;
      width: 6px;
      height: 12px;
      border: solid var(--color-primary);
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}
</style>