<template>
  <div
      :style="{width: inputWidth}"
      class="misa-input"
  >
    <div :class="{'misa-input__label': labelName !== null}">
      <label :for="inputId">
        {{ labelName }}
      </label>
    </div>
    <input
        :id="inputId"
        :class="{'misa-input-icon': isSearchable === true}"
        :placeholder="inputPlaceholder"
        :type="inputType"
        :max="currentDate"
        v-model="inputValue"
    >
    <span v-if="this.isSearchable === true" class="misa-input__icon"/>
  </div>
</template>

<script>
export default {
  name: "MisaInput",

  data () {
    return {
      currentDate: Date.now()
    }
  },

  props: {
    inputId: {
      type: String,
      required: true
    },

    labelName: {
      type: String,
      default: null
    },

    inputWidth: {
      type: String,
      default: '240px'
    },

    inputPlaceholder: {
      type: String
    },

    inputType: {
      type: String,
      default: "text"
    },

    isSearchable: {
      type: Boolean
    },

    inputValue: {
      default: null
    }
  }
}
</script>

<style lang="scss">
.misa-input {
  position: relative;
  font-family: 'NotoSans-Semibold', sans-serif !important;

  &__label {
    height: 20px;
  }

  input {
    height: 32px;
    width: 100%;
    padding: 6px 10px;
    border-radius: 2px;
    border: 1px solid var(--color-hightlight);
    display: inline-block;
    font-family: 'NotoSans-Regular', sans-serif !important;

    &:hover {
      outline: 1px solid var(--color-hightlight-hover);
    }

    &:focus {
      border-color: var(--color-primary);
    }

    &::placeholder {
      font-style: italic;
    }
  }

  &-icon {
    padding: 6px 28px 6px 10px !important;
  }

  &__icon {
    width: 16px;
    height: 16px;
    background-image: url('../../assets/icon/misa-search.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>