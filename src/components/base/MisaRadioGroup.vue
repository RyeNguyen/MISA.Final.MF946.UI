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
        :value="inputValue"
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
      selectedItem: this.inputValue ? this.inputValue.toString() : null
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
    },

    inputValue: {
      type: Number
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
    margin-top: -14px;
    margin-left: 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
}

.dx-item.dx-radiobutton.dx-state-hover {
  & .dx-radiobutton-icon::before {
    border: 1px solid var(--color-primary) !important;
  }
}

.dx-radiobutton-icon {
  transition: var(--transition-value);

  &::before {
    border: 1px solid var(--color-hightlight) !important;
    border-radius: 50% !important;
    transition: var(--transition-value);
  }
}

.dx-radiobutton.dx-state-focused:not(.dx-state-active) .dx-radiobutton-icon::before {
  border: 1px solid var(--color-primary) !important;
}

.dx-radiobutton-icon {
  width: 16px !important;
  height: 16px !important;

  &::before {
    width: 16px !important;
    height: 16px !important;
  }
}
</style>