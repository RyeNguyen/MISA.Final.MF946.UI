<template>
<!--  :close-on-outside-click="true"-->
<DxPopup
    content-template="popup-content"
    width="auto"
    height="auto"
    shading-color="rgba(0, 0, 0, 0.4)"
    :drag-enabled="true"
    :show-title="true"
    :visible="isPopupVisible"
    @hidden="hidePopup"
>
  <template #popup-content>
    <slot name="popup-content"></slot>
  </template>
</DxPopup>
</template>

<script>
import { DxPopup } from 'devextreme-vue/popup';

export default {
  name: "MisaPopup",

  components: {
    DxPopup
  },

  props: {
    isPopupVisible: {
      type: Boolean,
      default: false
    }
  },

  emits: ['hidePopup'],

  methods: {
    /**
     * Phương thức thay đổi trạng thái của popup thành đóng
     * Author: NQMinh (29/08/2021)
     */
    hidePopup: function () {
      this.isPopupVisible = false;
      this.$emit('hidePopup');
    }
  }
}
</script>

<style lang="scss">
.dx-popup-wrapper > .dx-overlay-content {
  border: none !important;
  border-radius: 0 !important;
  box-shadow: var(--box-shadow-default) !important;
}

.dx-popup-content {
  padding: 0 !important;
  margin: 0 !important;
  font-family: "NotoSans-Regular", sans-serif;
  font-size: 13px;
  color: var(--color-content-text);
}

.dx-popup-draggable .dx-popup-title {
  cursor: grab !important;
}

.dx-popup-title {
  border-bottom: none !important;

  &.dx-toolbar {
    padding: 0 !important;
    position: absolute !important;
    top: 0 !important;
  }
}
</style>