/*
 * 描述：filesWatch
 * 作者：twj94
 * 创建时间：2017/11/29
 * 版权：Copyright 2017 Howso Tech. Co. Ltd. All Rights Reserved.
 * Company:南京华苏科技有限公司
 */

var path = require('path');
var chokidar = require('chokidar');
var exec = require('child_process').exec;

var watcher = chokidar.watch(path.resolve(__dirname,'../docs'),{ignoreInitial:true});
var callback=function() {
  console.log(56);
  exec('cd '+path.resolve(__dirname,'./')+' && node filesTree.js',(err,stdout)=>{
    if(err) throw err;
    console.log(stdout);
  });
};
watcher
  .on('add', callback)
  .on('change',()=>{console.log(89);})
  .on('unlink', callback);
