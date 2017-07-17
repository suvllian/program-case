## 抢答器(PHP)  
* 技术：react + antd + php
* 原理：用户登录后信息存储在localStorage或者Cookie中，点击抢答之后，发送请求到数据库中，按点击先后数据进行排序，进入reset页面可以清除数据。  
* 缺点：抢答按钮不能自动重置，需要手动清除数据。

## 使用步骤
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run start
```