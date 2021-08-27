import Vue from 'vue'
import App from './App.vue'

import MisaInput from "@/components/base/MisaInput";

Vue.component('MisaInput', MisaInput);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
