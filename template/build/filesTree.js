/**
 * Created by gauch on 2017/11/25.
 */

var fs = require('fs');
var nodePath = require('path');
var matter = require('gray-matter');

function paramToArray(param) {
  if (Array.isArray(param)) {
    return param
  } else if (typeof param === 'string') {
    return [param]
  } else {
    return [];
  }
}


/**
 * 文件路径下的所有文件树
 * @param path 文件路径
 * @param options
 * @returns {Array}
 */
let tree = function tree(path, options) {
  path = path || './';
  options = options || {};
  let files,
    children = [],
    state,
    item,
    ignore = paramToArray(options.ignore),
    suffix = paramToArray(options.suffix);
  try {
    files = fs.readdirSync(nodePath.resolve(__dirname,path))
  } catch (e) {
    files = [];
    console.log('#----------------------------------------------------#\n');
    console.error('=====error path:=====> ' + path + '\n');
    console.log('#----------------------------------------------------#\n');
  }
  files.forEach(function (i) {
    let p = path + (/\/$/.test(path) ? '' : '/') + i,
      meta = {};
    state = fs.statSync(nodePath.resolve(__dirname,p));
    if (ignore.indexOf(i) === -1 && (!suffix.length || state.isDirectory() || (/\./.test(i) && suffix.indexOf(i.replace(/.*\.(.*)$/, '$1')) >= 0))) {
      if (!state.isDirectory()) {
        if (nodePath.extname(p).toLowerCase() !== '.md') return;
        let data = fs.readFileSync(nodePath.resolve(__dirname,p), 'utf8');
        if (data) {
          let metaData = data.match(/^::: mate\s*\n[\s\S]*?\n:::/);
          if (metaData) {
            metaData = metaData[0].replace(/^::: mate\s*(\n[\s\S]*?\n):::/,'---$1---');
            console.log(metaData);
            meta = matter(metaData).data;
          }
        }
        meta.resourcePath = p.split('docs/')[1];
      }
      const name=p.split('/docs/')[1].replace(/\/(\w)/g, function ($0, $1) {
        return $1.toUpperCase();
      }).split('.')[0];
      item = {
        name: name,
        path: i.split('.')[0],
        meta: meta
      };
      children.push(item);
      if (state.isDirectory()) {
        item.children = tree(p, {ignore: ignore, suffix: suffix});
      }
    }
  });
  return children;
};

const navConfigData=JSON.stringify(tree('../docs'));
fs.writeFile(nodePath.resolve(__dirname,'../src/router/config.json'),navConfigData,(err)=>{
  if (err) throw err;
  console.log('创建导航配置信息成功');
});
