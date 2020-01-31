import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Notifications from 'vue-notification';
import Loading from 'vue-loading-overlay';

import App from './App';
import router from './router';
import i18n from './i18n';
import './filters';

import ErrorHandlerPlugin from './plugins/ErrorHandlerPlugin';
import LoadingHandlerPlugin from './plugins/LoadingHandlerPlugin';
import LiquorTree from 'liquor-tree';

Vue.use(BootstrapVue);
Vue.use(Notifications);
Vue.use(Loading);

Vue.use(ErrorHandlerPlugin);
Vue.use(LoadingHandlerPlugin);
Vue.use(LiquorTree);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    template: '<App/>',
    components: {
        App
    },
    mounted () {
        this.setupUserInteraction();
    },
    methods: {
        setupUserInteraction () {
            // notifica a janela pai para não bloquear a sessão
            if (window.parent && window.parent.onReceiveUserInteraction) {
                const notify = () => {
                    window.parent.onReceiveUserInteraction();
                };
                window.addEventListener('mousemove', notify);
                window.addEventListener('click', notify);
                window.addEventListener('keypress', notify);
            }
        }
    }
});
