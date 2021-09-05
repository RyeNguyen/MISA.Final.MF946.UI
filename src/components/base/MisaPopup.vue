<template>
  <DxPopup
      :content-template="popupContent"
      :deferRendering="true"
      :drag-enabled="true"
      :focusStateEnabled="true"
      :show-title="true"
      :showCloseButton="false"
      :visible="isPopupVisible"
      height="auto"
      shading-color="rgba(0, 0, 0, 0.4)"
      width="auto"
  >
    <template #content-modal>
      <slot name="popup-content-modal"></slot>
    </template>
    <template #content-message>
      <slot name="popup-content-message"></slot>
    </template>
  </DxPopup>
</template>

<script>
import {DxPopup} from 'devextreme-vue/popup';

export default {
  name: "MisaPopup",

  components: {
    DxPopup
  },

  props: {
    isPopupVisible: {
      type: Boolean,
      default: false
    },

    popupContent: {
      type: String
    }
  },

  emits: ['hidePopup'],

  methods: {
    /**
     * Phương thức thay đổi trạng thái của popup thành đóng
     * Author: NQMinh (29/08/2021)
     */
    hidePopup: function () {
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
  height: 60%;
}

.dx-popup-title {
  border-bottom: none !important;

  &.dx-toolbar {
    padding: 0 !important;
    position: absolute !important;
    top: 0 !important;

    & .dx-toolbar-items-container {
      height: 48px !important;
    }
  }

  & .dx-closebutton {
    width: 24px;
    height: 24px;
    background-image: url('../../assets/icon/misa-close.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    left: -12px !important;
    border: none !important;

    & .dx-icon {
      display: none;
    }
  }
}

.dx-closebutton.dx-button.dx-button-normal.dx-button-mode-text.dx-widget.dx-button-has-icon.dx-state-hover {
  background-color: transparent !important;
  border-radius: 0 !important;
}
</style>