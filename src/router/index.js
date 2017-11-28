import Vue from 'vue'
import Router from 'vue-router'
import fileTree from '../../build/filesTree.js'

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

Vue.use(Router)

// const fileTree=require('../../build/filesTree');
const routerConfigTreeData=fileTree.tree('../../docs');
// console.log(JSON.stringify(routerConfigTreeData));
export default new Router({
  routes: routerConfigTreeData
})

