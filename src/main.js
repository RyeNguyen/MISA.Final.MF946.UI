import Vue from 'vue'
import App from './App.vue'

import 'devextreme/dist/css/dx.light.css';

import GenderModel from "@/models/GenderModel";

import MisaButton from "@/components/base/MisaButton";
import MisaInput from "@/components/base/MisaInput";
import MisaDateBox from "@/components/base/MisaDateBox";
import MisaTable from "@/components/base/MisaTable";

Vue.component('MisaButton', MisaButton);
Vue.component('MisaInput', MisaInput);
Vue.component('MisaDateBox', MisaDateBox);
Vue.component('MisaTable', MisaTable);

Vue.prototype.$genderData = GenderModel.initData();

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
