import Vue from 'vue';

import i18n from '../i18n';

Vue.filter('datetime', function (value, key) {
    return i18n.d(new Date(value), `${key}`);
});
