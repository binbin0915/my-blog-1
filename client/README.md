## next-app
# 无人货柜pc官网
 

### 上线方式一
 ```
 适用于不修改server或者pm2配置的情况

 第一次上线需要把全部代码上线到服务器；
 npm i

 启动
 npm run pm2:prod

 之后每次只上线dist即可
  pm2 restart next-app

 ```

### 上线方式二
 ```
每次全部上线
在服务器上打包
 
rm -rf node_modules
npm cache clean  -f
npm i
npm run build
# npm run pm2:prod  只在首次启动pm2
pm2 restart next-app
 ```

### UI
```
http://lanhu.hengchang6.com/url/neuDy-r4u1l
```