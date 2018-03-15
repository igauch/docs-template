/*
* 描述：sidenav
* 作者：twj94
* 创建时间：2017/10/9
* 版权：Copyright 2017 Howso Tech. Co. Ltd. All Rights Reserved.
* Company:南京华苏科技有限公司
*/

<template>
  <div class="sidenav"><!--:default-active="activeMenu"-->
    <ul class="el-menu">
      <sidenav-for-tpl
        v-for="(route, index) in $router.options.routes[$router.options.routes.length - 2].children" :route="route" :key="index">
      </sidenav-for-tpl>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue'

  //
  Vue.component('sidenavForTpl',{
    name:'sidenavForTpl',
    template: `<component v-bind:is="currentView" :route="route"></component>`,
    components: {
      submenu: {
        template: `
                    <el-submenu :index="route.meta.title" :trigger="route.meta.trigger" :position-class="route.meta.positionClass">
                        <template slot="title"><i v-show="route.meta.iconClass" class="sidenav-icon" :class="route.meta.iconClass"></i>{{route.meta.title}}</template>
                        <sidenav-for-tpl v-for="(route, index) in route.children" :route="route" :key="index"></sidenav-for-tpl>
                    </el-submenu>`,
        props: ['route']
      },
      menuItems: {
        template: `
  <li class="el-menu-item"
    :style="paddingStyle"
    @click="handleClick"
    :class="{
      'is-active': active,
      'is-disabled': disabled
    }">
      <div slot="content"><slot name="title"></slot></div>
      <div style="position: absolute;left: 0;top: 0;height: 100%;width: 100%;display: inline-block;box-sizing: border-box;padding: 0 20px;">
        <slot></slot>
      </div>
    </el-tooltip>
    <template v-else>
      <slot></slot>
      <slot name="title"></slot>
    </template>
  </li>
                    <el-menu-item :index="route.meta.title" :route="route"><i v-show="route.meta.iconClass" class="sidenav-icon" :class="route.meta.iconClass"></i>{{route.meta.title}}</el-menu-item>`,
        props: ['route'],
        methods: {
//                    rout: function (route) {
//                        router.push(route);
//                    }
        }
      }
    },
    props: ['route'],
    data() {
      return {
        currentView: this.route.meta.title && !this.route.children ? 'menuItems' : 'submenu'
      }
    }
  });


  export default {
    name: 'sidenav',
    data(){
      return{

      }
    },
    mounted(){

    }
  }
</script>
