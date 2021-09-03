<template>
  <div/>
</template>

<script>
export default {
  name: "MisaToast",

  props: {
    showToast: {
      type: Boolean
    },

    toastMessage: {
      type: String,
      required: true
    },

    toastType: {
      type: String,
      default: "info"
    }
  },

  emits: ['onToastHidden'],

  watch: {
    showToast: function() {
      if (this.showToast === true)  {
        this.openToast();
      }
    }
  },

  methods: {
    openToast() {
      const vm = this;
      vm.$toast.open({
        message: this.toastMessage,
        position: "top-right",
        pauseOnHover: true,
        type: this.toastType,
        duration: 3000,
        dismissible: true,
        onDismiss: function() {
          vm.$emit('onToastHidden');
        }
      })
    }
  }
}
</script>

<style lang="scss">
.v-toast {
  z-index: 120000000;

  &__item {
    padding: 12px;
    border-radius: 8px;
    min-width: 400px;
    color: var(--color-content-text);
    opacity: 1;
    box-shadow: var(--box-shadow-default);

    &--info {
      border: 1px solid var(--color-secondary);
      background-color: #e0f3fa;

      & .v-toast__icon {
        background-image: url('../../assets/icon/misa-info.svg');
      }
    }

    &--error {
      border: 1px solid var(--color-red);
      background-color: #fbf0f0;

      & .v-toast__icon {
        background-image: url('../../assets/icon/misa-error.svg');
      }
    }

    &--success {
      border: 1px solid var(--color-primary);
      background-color: #edffea;

      & .v-toast__icon {
        background-image: url('../../assets/icon/misa-success.svg');
      }
    }

    &--warning {
      border: 1px solid #fff707;
      background-color: #fffeda;

      & .v-toast__icon {
        background-image: url('../../assets/icon/misa-warning.svg');
      }
    }
  }

  &__icon {
    width: 48px;
    height: 48px;
    display: block;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>