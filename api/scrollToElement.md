#### scrollToElement

滚动到指定DOM。
注意：只能传入通过this.$refs获取的节点，不支持window或document获取到的节点

##### 返回值说明

<table>
<tr>
    <th>参数</th>
    <th>类型</th>
    <th>说明</th>
</tr>
<tr>
    <td>code</td>
    <td>Number</td>
    <td>0=>到达指定DOM位置 || -1=>失败(原因：一屏或其它)</td>
</tr>
<tr>
    <td>message</td>
    <td>String</td>
    <td>success || fail</td>
</tr>
</table>

#### 示例代码
```
scrollToElement(){
  cml.scrollToElement(this.$refs.dom).then(res=>{
      console.log(res);
  }).catch(err=>{
      console.log(err);
  })
}
```