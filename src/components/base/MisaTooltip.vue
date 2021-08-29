<template>
  <DxTooltip
      target="#image"
      show-event="dxhoverstart"
      hide-event="dxhoverend">
    <template>
      <p>Tooltip content</p>
    </template>
  </DxTooltip>
</template>

<script>
import { DxTooltip } from 'devextreme-vue/tooltip';

export default {
  name: "MisaTooltip",

  components: {
    DxTooltip
  }
}
</script>

<style scoped>

</style>