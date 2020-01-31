import Vue from 'vue';
import Router from 'vue-router';

// Views
import MainWindow from '../views/pages/MainWindowPage';
import SearchResult from '../views/pages/SearchResultPage';

Vue.use(Router);

export const constantRouterMap = [
    { path: '/main-window', component: MainWindow, hidden: true },
    { path: '/grid-window/:searchId', component: SearchResult, hidden: true, props: true },
    { path: '*', redirect: '/main-window', hidden: true }
];

export default new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'open active',
    routes: constantRouterMap
});
