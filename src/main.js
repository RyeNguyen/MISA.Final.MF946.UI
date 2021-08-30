import Vue from 'vue'
import App from './App.vue'

import 'devextreme/dist/css/dx.light.css';

import GenderModel from "@/models/GenderModel";

import MisaCheckbox from "@/components/base/MisaCheckbox";
import MisaButton from "@/components/base/MisaButton";
import MisaInput from "@/components/base/MisaInput";
import MisaDateBox from "@/components/base/MisaDateBox";
import MisaCombobox from "@/components/base/MisaCombobox";
import MisaDropdown from "@/components/base/dropdown/MisaDropdown";
import MisaTable from "@/components/base/table/MisaTable";

Vue.component('MisaCheckbox', MisaCheckbox);
Vue.component('MisaButton', MisaButton);
Vue.component('MisaInput', MisaInput);
Vue.component('MisaDateBox', MisaDateBox);
Vue.component('MisaCombobox', MisaCombobox);
Vue.component('MisaDropdown', MisaDropdown);
Vue.component('MisaTable', MisaTable);

Vue.prototype.$genderData = GenderModel.initData();

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
