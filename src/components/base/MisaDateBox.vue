<template>
  <div
      class="misa-datebox"
  >
    <div>
      <label :for="dateboxId">
        {{ labelName }}
      </label>
    </div>
    <DxDateBox
        :max="currentDate"
    />
  </div>
</template>

<script>
import DxDateBox from 'devextreme-vue/date-box';

import { locale } from 'devextreme/localization'

export default {
  name: "MisaDateBox",

  created() {
    this.locale = this.getLocale();
    locale(this.locale);
  },

  data() {
    return {
      currentDate: Date(),

      locale: null,
    }
  },

  components: {
    DxDateBox
  },

  props: {
    dateboxId: {
      type: String,
      required: true
    },

    labelName: {
      type: String
    }
  },

  methods: {
    getLocale() {
      const locale = sessionStorage.getItem('locale');
      return locale != null ? locale : 'en';
    }
  }
}
</script>

<style scoped>

</style>