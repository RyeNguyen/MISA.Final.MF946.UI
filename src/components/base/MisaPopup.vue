<template>
<!--  :close-on-outside-click="true"-->
<DxPopup
    content-template="popup-content"
    width="auto"
    height="auto"
    shading-color="rgba(0, 0, 0, 0.4)"
    :drag-enabled="true"
    :focusStateEnabled="true"
    :show-title="true"
    :visible="popupVisible"
    :deferRendering="true"
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

  data () {
    return {
      popupVisible: false
    }
  },

  components: {
    DxPopup
  },

  props: {
    isPopupVisible: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    isPopupVisible: function() {
      this.popupVisible = this.isPopupVisible === true;
    }
  },

  emits: ['hidePopup'],

  methods: {
    /**
     * Phương thức thay đổi trạng thái của popup thành đóng
     * Author: NQMinh (29/08/2021)
     */
    hidePopup: function () {
      this.popupVisible = false;
      this.$emit('hidePopup');
    },

    /**
     * Phương thức thông báo component cha là popup đã mở
     * Author: NQMinh (30/08/2021)
     */
    // showPopup() {
    //   this.$emit('onPopupShown');
    // }
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
  //height: 100%;
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