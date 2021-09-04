import Vue from 'vue'
import App from './App.vue'

import 'devextreme/dist/css/dx.light.css';

import GenderModel from "@/models/GenderModel";
import Multiselect from "vue-multiselect";
import ResponseModel from "@/models/ResponseModel";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import VTooltip from "v-tooltip";

import MisaPopup from "@/components/base/MisaPopup";
import MisaCheckbox from "@/components/base/MisaCheckbox";
import MisaButton from "@/components/base/MisaButton";
import MisaInput from "@/components/base/MisaInput";
import MisaDateBox from "@/components/base/MisaDateBox";
import MisaCombobox from "@/components/base/MisaCombobox";
import MisaDropdown from "@/components/base/MisaDropdown";
import MisaToast from "@/components/base/MisaToast";
import MisaMessage from "@/components/base/MisaMessage";
import MisaTable from "@/components/base/table/MisaTable";
import DepartmentAPI from "@/api/components/DepartmentAPI";

Vue.component('MisaMultiSelect', Multiselect);
Vue.component('MisaPopup', MisaPopup);
Vue.component('MisaCheckbox', MisaCheckbox);
Vue.component('MisaButton', MisaButton);
Vue.component('MisaInput', MisaInput);
Vue.component('MisaDateBox', MisaDateBox);
Vue.component('MisaCombobox', MisaCombobox);
Vue.component('MisaDropdown', MisaDropdown);
Vue.component('MisaToast', MisaToast);
Vue.component('MisaMessage', MisaMessage);
Vue.component('MisaTable', MisaTable);

Vue.prototype.$genderData = GenderModel.initData();

Vue.prototype.$responseData = ResponseModel.initData();

DepartmentAPI.getAll().then(res => {
  Vue.prototype.$departmentData = res.data;
}).catch(error => {
  console.log(error);
})

Vue.config.productionTip = false

Vue.use(VueToast);
Vue.use(VTooltip);

new Vue({
  render: h => h(App),
}).$mount('#app')
