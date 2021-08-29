<template>
  <div
      :tabindex="tabIndex"
      :class=
      "[
          'misa-button',
          'misa-button--' + buttonType
      ]"
      :id="buttonId"
  >
    <div class="misa-button__text">{{ buttonText }}</div>
  </div>
</template>

<script>
export default {
  name: "MisaButton",

  props: {
    buttonId: {
      type: String,
      required: true
    },

    buttonText: {
      type: String
    },

    buttonType: {
      type: String,
      default: 'primary'
    },

    tabIndex: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.misa-button {
  width: auto;
  border-radius: 3px;
  padding: 8px 20px;
  cursor: pointer;
  transition: var(--transition-value);

  &__group {
    display: flex;
    gap: 10px;
  }

  &--primary {
    color: var(--color-white);
    background-color: var(--color-primary);

    &:hover {
      background-color: var(--color-primary-hover);
    }
  }

  &--secondary {
    background-color: transparent;
    border: 1px solid var(--color-hightlight);
  }

  &__text {
    font-family: 'NotoSans-Semibold', sans-serif;
  }
}
</style>