<template>
  <div
      class="misa-tooltip__container"
      :id="itemId"
  >
    <slot></slot>
    <DxTooltip
        :target='tooltipTarget'
        show-event="dxhoverstart"
        hide-event="dxhoverend">
      <template>
        <p>Tooltip content</p>
      </template>
    </DxTooltip>
  </div>
</template>

<script>
import { DxTooltip } from 'devextreme-vue/tooltip';

export default {
  name: "MisaTooltip",

  components: {
    DxTooltip
  },

  props: {
    itemId: {
      type: String,
      required: true
    }
  },

  computed: {
    tooltipTarget: function() {
      return `#${this.itemId}`;
    }
  }
}
</script>

<style scoped>

</style>