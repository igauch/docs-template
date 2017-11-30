<style>
.btn {
  background-color: red;
}
</style>

<script>
  let clickFn=()=>{
    alert('Hello docs-template');
  }
</script>

# 介绍  
## WHAT 
基于`vue`的,用来快速构建文档的,以`markdown`为文档编写格式的框架,省心省力的文档框架  

## HOW  
我期望你只关心文档本身,这也是这个框架的用意,所以我只需要说明以下几点 
* 你要熟悉[Markdown语法](https://daringfireball.net/projects/markdown/syntax),这个连接是`markdown`创始人的语法说明链接,如果感觉羞涩,请自行百度  
* 你要熟悉[yaml语法](http://www.ruanyifeng.com/blog/2016/07/yaml.html),阮大神的文章,这篇足够  
* 所有的文档必须放在docs目录下,必须是md文件
* 路由信息根据docs目录结构生成,大致如下 
  ```
  [
    {
      "name": "group",
      "meta": {},
      "children": [
        {},...
      ]
    },
    ...
  ]
  ```
* 如果需要配置路由的元信息,请在md文件的顶部使用`yaml`语法配置,如下 
  ``` 
  
  ---
  title: 徽章
  group:
    name: docs
    test:
      - first
      - second
  ---
  ``` 
 * 在md文件里编写`html`,我认为这是最酷的东西,也是为什么我要做这个框架的原因,你只要像这样编写 
  ```
      :::demo 一些说明
      ```html
      <style>
      .btn {
        background-color: red;
      }
      </style>
      
      <script>
        let clickFn=()=>{
          alert('Hello docs-template');
        }
      </script> 
      
      <button class="btn" onclick="clickFn">点我</button>
      ```
      :::
  ```  
  就可以生成如同html一样的效果 
   :::demo 一些说明
   ```html
   
      <style>
      .btn {
        background-color: red;
      }
      </style>
      
      <script>
        let clickFn=()=>{
          alert('Hello docs-template');
        }
      </script> 
      
      <button class="btn" onclick="clickFn">点我</button>
   ```
   :::

* 

## 注意事项
* 所有文件必须是md的扩展名，不能是MD/mD或其他任何形式
* 
