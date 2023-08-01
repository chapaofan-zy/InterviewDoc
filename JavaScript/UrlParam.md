### 获取 url 参数

```js
const getUrlParam = (url) => {
  const params = url.split("?")[1].split("&");
  const res = {};
  params.forEach((e) => {
    const [k, v] = e.split("=");
    res[k] = v;
  });
  return res;
};

const url =
  "https://www.baidu.com/s?wd=js%E6%8E%92%E5%BA%8F&rsv_spt=1&rsv_iqid=0xf45848450001c07b&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_dl=tb&rsv_sug3=10&rsv_sug1=2&rsv_sug7=100&rsv_sug2=0&rsv_btype=i&prefixsug=js%25E6%258E%2592%25E5%25BA%258F&rsp=8&inputT=1692&rsv_sug4=2367";

console.log(getUrlParam(url));

/* 
{
  wd: 'js%E6%8E%92%E5%BA%8F',
  rsv_spt: '1',
  rsv_iqid: '0xf45848450001c07b',
  issp: '1',
  f: '8',
  rsv_bp: '1',
  rsv_idx: '2',
  ie: 'utf-8',
  tn: 'baiduhome_pg',
  rsv_dl: 'tb',
  rsv_sug3: '10',
  rsv_sug1: '2',
  rsv_sug7: '100',
  rsv_sug2: '0',
  rsv_btype: 'i',
  prefixsug: 'js%25E6%258E%2592%25E5%25BA%258F',
  rsp: '8',
  inputT: '1692',
  rsv_sug4: '2367'
}
*/
```
