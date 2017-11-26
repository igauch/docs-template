/**
 * Created by gauch on 2017/11/25.
 */

var fs = require('fs');

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
 * 文件路径下的所有文件（包括子文件夹）
 * @param path 文件路径
 * @param options
 * @returns {Array}
 */
exports.allFile = function allFile(path, options) {
  path = path || './';
  options = options || {};
  var
    files,
    list = [],
    state,
    p,
    item,
    ignore = paramToArray(options.ignore),
    suffix = paramToArray(options.suffix);
  try {
    files = fs.readdirSync(path)
  } catch (e) {
    files = [];
    console.log('#----------------------------------------------------#\n');
    console.error('=====error path:=====> ' + path + '\n');
    console.log('#----------------------------------------------------#\n');
  }
  files.forEach(function (i) {
    p = path + (/\/$/.test(path) ? '' : '/') + i;
    state = fs.statSync(p);
    fs.readFile(p,'utf8',(err,data)=>{
      if (err) throw err;
      var data=data.replace('variables','../../src/styles/scss/customBasicStyle');
      fs.writeFile(path.resolve(__dirname,'../template/frameworks/basicStyle/bootstrap.scss'),data,(err)=>{
        if (err) throw err;
        console.log('应用自定义样式变量成功');
      })
    });
    if (ignore.indexOf(i) === -1 && (!suffix.length || state.isDirectory() || (/\./.test(i) && suffix.indexOf(i.replace(/.*\.(.*)$/,'$1')) >= 0))) {
      item = {
        name: i,
        directory: state.isDirectory()
      };
      if (item.state.isFile()) {
        list.push(item);
      } else if (item.directory) {
        list = list.concat(allFile(p,{ignore:ignore,suffix:suffix}));
      }
    }
  });
  return list;
};


/**
 * 文件路径下的所有文件树
 * @param path 文件路径
 * @param options
 * @returns {Array}
 */
exports.tree = function tree(path, options) {
  path = path || './';
  options = options || {};
  var files,
    list = [],
    state,
    p,
    item,
    ignore = paramToArray(options.ignore),
    suffix = paramToArray(options.suffix),
    md5 = options.md5;
  try {
    files = fs.readdirSync(path)
  } catch (e) {
    files = [];
    console.log('#----------------------------------------------------#\n');
    console.error('=====error path:=====> ' + path + '\n');
    console.log('#----------------------------------------------------#\n');
  }
  files.forEach(function (i) {
    p = path + (/\/$/.test(path) ? '' : '/') + i;
    state = fs.statSync(p);
    if (ignore.indexOf(i) === -1 && (!suffix.length || state.isDirectory() || (/\./.test(i) && suffix.indexOf(i.replace(/.*\.(.*)$/,'$1')) >= 0))) {
      item = {
        path: p,
        name: i,
        size: state.size,
        directory: state.isDirectory(),
        file: state.isFile()
      };
      list.push(item);
      if (item.directory) {
        item.list = tree(p,{ignore:ignore,suffix:suffix});
      }
    }
  });
  return list;
};


/**
 * 文件路径下的文件队列
 * @param path
 * @param options
 * @returns {Array}
 */
exports.list = function (path, options) {
  path = path || '';
  options = options || {};
  var
    files,
    list = [],
    state,
    item,
    p,
    ignore = paramToArray(options.ignore),
    suffix = paramToArray(options.suffix),
    md5 = options.md5;
  try {
    files = fs.readdirSync(path)
  } catch (e) {
    files = [];
    console.log('#----------------------------------------------------#\n');
    console.error('=====error path:=====> ' + path + '\n');
    console.log('#----------------------------------------------------#\n');
  }
  files.forEach(function (i) {
    p = path + (/\/$/.test(path) ? '' : '/') + i;
    state = fs.statSync(p);
    if (ignore.indexOf(i) === -1 && (!suffix.length || state.isDirectory() || (/\./.test(i) && suffix.indexOf(i.replace(/.*\.(.*)$/,'$1')) >= 0))) {
      item = {
        path: p,
        name: i,
        size: state.size,
        directory: state.isDirectory(),
        file: state.isFile()
      };
      list.push(item);
    }
  });
  return list;
};
