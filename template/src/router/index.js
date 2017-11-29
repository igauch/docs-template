import Vue from 'vue'
import Router from 'vue-router'
import routerConfigTreeData from './config.json'

// let requireComponents = path => {
//   return r => require.ensure([], () =>
//       r(require(path)),
//     'docs');
// };
const root = {
  'root': {
    template: '<router-view></router-view>'
  }
};

let treeFor=function (data) {
  data.forEach(val=>{
    if(!val.children){
      val.components=78
    }else {
      treeFor(val.children);
    }
  })
};
treeFor(routerConfigTreeData.config)
console.log(routerConfigTreeData.config);
Vue.use(Router)

export default new Router({
  routes: routerConfigTreeData.config
})

