/*
Copyright 2020. Huawei Technologies Co., Ltd. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import echarts from 'echarts'
import 'vant/lib/index.css';
import { NavBar } from 'vant'
Vue.use(NavBar);
import NoSleep from "nosleep.js/dist/NoSleep.min.js";
Vue.prototype.$NoSleep = NoSleep;

import Vconsole from 'vconsole'
const vConsole = new Vconsole()
Vue.use(vConsole)

Vue.prototype.echarts = echarts

// i-18n

new Vue({
        router,
        store,
        render: function (h) {
            return h(App)
        }
    })
    .$mount('#app')
