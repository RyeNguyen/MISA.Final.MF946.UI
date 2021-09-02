<template>
  <DxToast
      :visible="showToast"
      message="Đây là toast"
      type="success"
      :close-on-swipe="true"
      @onHidden="hideToast"
  />
</template>

<script>
import { DxToast } from 'devextreme-vue/toast';

export default {
  name: "MisaToast",

  components: {
    DxToast
  },

  props: {
    showToast: {
      type: Boolean
    }
  },

  emits: ['onToastHidden'],

  methods: {
    hideToast() {
      this.$emit('onToastHidden');
    }
  }
}
</script>

<style scoped>

</style>