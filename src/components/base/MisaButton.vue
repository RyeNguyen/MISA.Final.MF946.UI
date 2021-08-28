<template>
  <div
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
    },

    buttonText: {
      type: String
    },

    buttonType: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style lang="scss">
.misa-button {
  border-radius: 3px;
  padding: 8px 20px;
  cursor: pointer;
  transition: var(--transition-value);

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
}
</style>