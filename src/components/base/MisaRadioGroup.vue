<template>
  <div
      :style="{width: groupWidth}"
      class="misa-input"
  >
    <div :class="{'misa-input__label': labelName !== null}">
      <label>
        {{ labelName }}
      </label>
    </div>
    <DxRadioGroup
        :items="radioItems"
        :value="selectedItem"
        layout="horizontal"
        @valueChanged="changeItem"
    />
  </div>
</template>

<script>
import DxRadioGroup from 'devextreme-vue/radio-group';

export default {
  name: "MisaRadioGroup",

  data() {
    return {
      selectedItem: null
    }
  },

  props: {
    radioItems: {
      type: Array,
      required: true
    },

    groupWidth: {
      type: String,
      default: '100%'
    },

    labelName: {
      type: String
    }
  },

  components: {
    DxRadioGroup
  },

  methods: {
    /**
     * Phương thức xử lý sự kiện khi radio option thay đổi
     * @param e
     * Author: NQMinh (30/08/2021)
     */
    changeItem(e) {
      this.selectedItem = e.value;
    }
  }
}
</script>

<style lang="scss">
.dx-radiobutton-checked .dx-radiobutton-icon {
  &::before {
    border: 1px solid var(--color-primary);
  }

  & .dx-radiobutton-icon-dot {
    background-color: var(--color-primary);
    margin-top: -17px;
    margin-left: 5px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
}
</style>