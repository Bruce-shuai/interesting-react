/* 此钩子用于将各模块中一些特定数据方便放入LocalStorage里 */ 
import {useEffect, useState} from 'react';

const PREFIX = 'Interesting-';   // 有了前缀，方便各大模块存入数据里

export default function useLocalStorage(key, initialValue) {
  const prefixdKey = PREFIX + key;
  // 注意一个问题： useState() 这括号里面的回调函数只会执行一次(除非页面刷新)，用在JSON.parse以及从localStorage里获取数据这种比较耗时的地方起到好处
  const [value, setValue] = useState(() => {   // 这里的value 第一次使用是解析json字符串后的数据。后面是普通的数据。但会将普通的数据上传到localStorage里面。而省略了从localStorate获取数据这种相对耗时的操作
    const jsonValue = localStorage.getItem(prefixdKey)
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === 'function') {  // json数据似乎不能放函数？！
      return initialValue();
    } else {
      return initialValue;
    } 
  }) 

  // 将数据存放在localStorage里面
  useEffect(() => {
    localStorage.setItem(prefixdKey, JSON.stringify(value))
  }, [prefixdKey, value])  // 这里的prefixdKey 其实是有点迷惑性的...
  return [value, setValue]
}