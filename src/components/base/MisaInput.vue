<template>
  <div class="misa-input">
    <input
      :placeholder="inputPlaceholder"
    >
    <span v-if="this.isSearchable === true" class="misa-input__icon"/>
  </div>
</template>

<script>
export default {
  name: "MisaInput",

  props: {
    inputPlaceholder: {
      type: String
    },

    isSearchable: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.misa-input {
  position: relative;

  input {
    width: 200px;
    height: 32px;
    padding: 6px 28px 6px 10px;
    border-radius: 2px;
    border: 1px solid var(--color-hightlight);
    display: inline-block;
    transition: var(--transition-value);

    &:focus {
      border-color: var(--color-primary);
    }

    &::placeholder {
      font-style: italic;
    }
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