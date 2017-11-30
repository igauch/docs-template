import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import routerConfigTreeData from './config.json'

const root = Vue.component('root', {
  template: '<router-view></router-view>'
});

let treeFor=function (data) {
  data.forEach(val=>{
    if(!val.children){
      val.component=function(r) {
        return require.ensure([], function() {
          return r(require('../../docs/'+val.meta.resourcePath));
        }, 'docs');
      };
    }else {
      val.component=root;
      treeFor(val.children);
    }
  })
};
treeFor(routerConfigTreeData);

export default new Router({
  base: __dirname,
  routes: [{
    path: '/',
    name: 'home',
    meta: {title: 'home'},
    component: root,
    redirect: 'index',
    children: routerConfigTreeData
  },{
    path: '/*',
    redirect: '/'
  }]
})

