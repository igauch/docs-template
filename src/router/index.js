import Vue from 'vue'
import Router from 'vue-router'
import routerConfigTreeData from './config.json'

let requireComponents = path => {
  return r => require.ensure([], () =>
      r(require(path)),
    'docs');
};
const root = {
  'root': {
    template: '<router-view></router-view>'
  }
};

routerConfigTreeData

Vue.use(Router)

export default new Router({
  routes: routerConfigTreeData.config
})

